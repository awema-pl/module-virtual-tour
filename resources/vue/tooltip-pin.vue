<template>
    <div class="tooltip-pin"
        :class="['is-' + tooltipPosition, {'is-visible': visible}]"
        :style="tooltipStyle"
    >
        <div class="tooltip-pin__inner">
            <button
                type="button"
                class="tooltip-pin__close"
                @click="$emit('close')"
                :aria-label="$lang.TOOLTIP_CLOSE"
            >
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M0 0L16 16 M16 0L0 16" />
                </svg>
            </button>
            <slot>
                {{ message }}
            </slot>
        </div>
    </div>
</template>

<script>
// TODO: move to separate package
import {
    getOffsetTop,
    resolveOnTransitionEnd,
    supportsPassiveListener,
    scrollToPosition
} from '../js/modules/helpers'

export default {

    name: 'tooltip-pin',

    props: {

        message: String,

        visible: {
            type: Boolean,
            default: false
        },

        scrollOffset: {
            type: Number,
            default: 32
        },

        el: [ String, Object ],

        position: {
            type: String,
            default: 'auto'
        }
    },


    data() {
        return {
            element: null,
            isVisible: null,
            scrollHeight: 0,
            tooltipPosition: this.position,
            tooltipStyle: null
        }
    },


    watch: {

        visible(isVisible) {
            resolveOnTransitionEnd(this.$el, () => { this.$emit('toggle', isVisible) })
            this.isVisible = isVisible
        },

        element(newElement, oldElement) {
            if ( oldElement ) {
                oldElement.classList.remove('has-tooltip')
            }
            if ( newElement ) {
                newElement.classList.add('has-tooltip')
            }
        },

        el: {
            handler: async function(el) {
                if ( this.$isServer ) return
                if ( el instanceof HTMLElement ) {
                    this.element = el
                } else if ( typeof el === 'string' && el ) {
                    this.element = document.querySelector(el)
                } else {
                    this.element = null
                    // return
                }
                await this.$nextTick( async () => {
                    if ( this.element ) {
                        await this.setTooltipPosition()
                    } else {
                        this.showTooltipInCenter()
                    }
                    if ( this.isVisible ) this.scrollIntoView()
                })
            },
            immediate: true
        }
    },


    methods: {

        setTooltipPosition() {

            return new Promise( resolve => {

                let elSizes = this.element.getBoundingClientRect(),
                    tooltipSizes = this.$el.getBoundingClientRect(),
                    maxWidth = this.$el.parentElement.clientWidth,
                    elTop = getOffsetTop(this.element),
                    fits,
                    tooltipStyle

                let positions = this.getAvailablePositions(elTop, elSizes, tooltipSizes, maxWidth)

                if ( this.position === 'auto' ) {
                    this.tooltipPosition = positions[0] // first available
                } else {
                    this.tooltipPosition = positions.includes(this.position) ? this.position : positions[0]
                }

                switch (this.tooltipPosition) {
                    case 'top':
                        tooltipStyle = {
                            top: elTop - tooltipSizes.height,
                            left: elSizes.left + (elSizes.width - tooltipSizes.width ) / 2
                        }
                        fits = tooltipSizes.height + elSizes.height < window.innerHeight
                        if ( fits ) {
                            this.scrollHeight = elTop - window.innerHeight / 2
                        } else {
                            this.scrollHeight = elTop - tooltipSizes.height - this.scrollOffset
                        }
                        break;
                    case 'bottom':
                        tooltipStyle = {
                            top: elTop + elSizes.height,
                            left: elSizes.left + (elSizes.width - tooltipSizes.width ) / 2
                        }
                        fits = tooltipSizes.height + elSizes.height < window.innerHeight
                        if ( fits ) {
                            this.scrollHeight = elTop - (window.innerHeight - elSizes.height - tooltipSizes.height) / 2
                        } else {
                            this.scrollHeight = elTop + elSizes.height - tooltipSizes.height + this.scrollOffset
                        }
                        break;
                    default:
                        if ( this.position === 'center' ) break;
                        tooltipStyle = {
                            top: elTop + (elSizes.height - tooltipSizes.height) / 2,
                            left: this.tooltipPosition === 'left' ?
                                  elSizes.left - tooltipSizes.width :
                                  elSizes.right
                        }
                        this.scrollHeight = elTop - Math.max(elSizes.height, tooltipSizes.height) / 2
                        break;
                }
                // fix left hiding
                if ( tooltipStyle.left < 0 ) {
                    // tooltipStyle.maxWidth = tooltipSizes.width + tooltipStyle.left
                    tooltipStyle.left = 0
                }
                // fix right hiding
                if ( tooltipStyle.left + tooltipSizes.width > maxWidth ) {
                    tooltipStyle.left = 'auto'
                    tooltipStyle.right = 0
                }
                for (let key in tooltipStyle) {
                    let current = tooltipStyle[key]
                    tooltipStyle[key] = current + ( isNaN(current) ? '' : 'px' )
                }
                this.tooltipStyle = tooltipStyle

                if ( this.$listeners['calculated-position'] ) {
                    this.$emit('calculated-position', { elTop, elSizes })
                }

                this.$nextTick(resolve)
            })
        },

        getAvailablePositions(elTop, elSizes, tooltipSizes, maxWidth) {

            let available = []

            if ( elTop > tooltipSizes.height ) {
                available.push('top')
            }
            if ( elSizes.left > tooltipSizes.width ) {
                available.push('left')
            }
            if ( maxWidth - elSizes.right > tooltipSizes.width ) {
                available.push('right')
            }
            if ( document.body.scrollHeight - elTop > tooltipSizes.height ) {
                available.push('bottom')
            }

            return available
        },

        showTooltipInCenter() {
            this.tooltipPosition = 'center';
            this.tooltipStyle = null
        },

        onResize() {
            if ( ! this.visible ) return
            clearTimeout( this.__onResize )
            this.__onResize = setTimeout( () => {
                this.setTooltipPosition()
                .then( () => { this.scrollIntoView() })
            }, 200)
        },

        scrollIntoView() {
            this.$nextTick( () => {
                return new Promise( resolve => {
                    scrollToPosition(this.scrollHeight, undefined, resolve)
                })
            })
        }
    },


    beforeMount() {
        this.__supportsPassive = supportsPassiveListener()
    },

    mounted() {
        window.addEventListener('resize', this.onResize, this.__supportsPassive ? {passive: true} : false)
    },

    beforeDestroy() {
        this.element && this.element.classList.remove('has-tooltip')
        window.removeEventListener('resize', this.onResize, this.__supportsPassive ? {passive: true} : false)
    },
}
</script>
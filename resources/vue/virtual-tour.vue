<template>
    <div v-if="steps && steps.length && ! isComplete" class="virtual-tour">

        <!-- backdrop -->
        <div class="virtual-tour__backdrop" :class="{'is-visible': currentStep !== null && showBackdrop }"></div>

        <!-- underlay -->
        <div class="virtual-tour__underlay"
            :class="{'is-visible': showUnderlay && currentStepData.el && showBackdrop}"
            :style="showBackdrop && currentStepData.el ? underlayPosition : null"
            ref="underlay"></div>

        <!-- tooltip -->
        <tooltip-pin class="virtual-tour__tooltip-pin"
            :visible="showTooltip"
            :el="currentStepData.el"
            :position="currentStepData.position"
            @close="finish"
            @calculated-position="setUnderlay"
            ref="tooltip">
            <h3 class="tooltip-pin__title">
                <template v-if="$lang.TOUR_STEP">{{ $lang.TOUR_STEP }} {{ currentStep + 1 }}/{{ steps.length }}</template>
            </h3>
            <p class="tooltip-pin__message" v-if="currentStepData.message">{{ currentStepData.message }}</p>
            <div class="tooltip-pin__buttons">
                <button v-if="! isFirstStep"
                        class="tooltip-pin__button is-prev"
                        @click="prev">{{ $lang.TOUR_PREV }}</button>
                <button v-if="! isLastStep"
                        class="tooltip-pin__button is-next"
                        @click="next">{{ $lang.TOUR_NEXT }}</button>
                <button v-if="! isLastStep"
                        class="tooltip-pin__button is-skip"
                        @click="finish">{{ $lang.TOUR_SKIP }}</button>
                <button v-if="isLastStep"
                    class="tooltip-pin__button is-finish"
                    @click="finish">{{ $lang.TOUR_FINISH }}</button>
            </div>
        </tooltip-pin>

    </div>
</template>

<script>
// TODO: move Cookie to base.js
// TODO: Move common helpers to base.js
// TODO: other start options, except autostart
import Cookie from 'js-cookie'

import {
    getOffsetTop,
    resolveOnTransitionEnd
} from '../js/modules/helpers'

export default {

    name: 'virtual-tour',

    props: {

        steps: Array,

        name: {
            type: String,
            required: true
        },

        expires: {
            type: [Boolean, Number],
            default: false // newer show again
        },

        buttonsText: Object,

        fade: {
            type: Boolean,
            default: true
        },

        fromBeginning: {
            type: [String, Boolean],
            default: false
        },
    },

    data() {
        return {
            currentStep: null,
            isComplete: true,
            showUnderlay: false,
            showTooltip: false,
            underlayPosition: null
        }
    },


    computed: {

        isFirstStep() {
            return this.currentStep !== null && this.currentStep === 0
        },

        isFromBeginning() {
            return this.fromBeginning.toString() !== 'false';
        },

        isLastStep() {
            return this.currentStep !== null && this.currentStep === this.steps.length - 1
        },

        currentStepData() {
            if ( ! this.steps || ! this.steps.length || this.currentStep === null ) {
                return {}
            }
            return this.steps[this.currentStep]
        },

        showBackdrop() {
            return this.currentStepData.hasOwnProperty('fade') ? this.currentStepData.fade : this.fade
        },

        computedButtonsText() {
            return Object.assign({
                next: this.$lang.TOUR_NEXT,
                prev: this.$lang.TOUR_PREV,
                skip: this.$lang.TOUR_SKIP,
                finish: this.$lang.TOUR_FINISH
            }, this.buttonsText)
        },

        cookieDomain() {
            return this.$get(AWEMA_CONFIG, 'virtualTour.cookieDomain')
        }
    },

    watch: {

        isComplete(complete) {
            if ( ! complete ) {
                AWEMA._tours = AWEMA._tours || []
                AWEMA._tours.push(this)
                AWEMA.on('tours:complete', this.checkStart)
                this.checkStart()
            } else if ( complete && ! isNaN(this.currentStep) ) {
                let tour = {}
                if (this.expires) {
                    tour.expires = new Date().getTime() + this.expires * 864e+5
                }
                this.setTourCookie(tour)
                this.$emit('done', this.currentStep === this.steps.length - 1)
                AWEMA._tours.shift()
                AWEMA.off('tours:complete', this.checkStart)
                AWEMA.emit('tours:complete')
            }
        }
    },


    methods: {

        start() {
            this.switchStep(0)
        },

        checkStart() {
            if ( AWEMA._tours[0] === this ) {
                // move el outside
                document.body.appendChild(this.$el)
                this.$nextTick(this.start)
            }
        },

        getTourCookie() {
            let tours = this._getTours(),
                tour = tours[this.name],
                now = new Date().getTime(),
                complete = true

            if ( typeof tour !== 'undefined' ) {

                if ( this.expires && now > tour.expires ) {
                    complete = false
                }

            } else {
                complete = false
            }

            this.isComplete = complete
        },

        fromBeginningTourCookie() {

            if (this.isFromBeginning){
                let options = {
                    path: '/'
                };
                if ( this.cookieDomain ) {
                    options.domain = this.cookieDomain
                }

                Cookie.remove('virtual-tour', options);
                if (AWEMA_CONFIG.dev) console.log('virtual-tour remove cookie');
            }
        },

        setTourCookie(data) {
            let tours = this._getTours(),
                options = { expires: 365 /*days*/}

            if ( this.cookieDomain ) {
                options.domain = this.cookieDomain
            }

            tours[this.name] = data
            Cookie.set('virtual-tour', tours, options)
        },

        _getTours() {
            let tours = {}

            try {
                let _tours = Cookie.get('virtual-tour')
                if ( _tours ) tours = JSON.parse(_tours)
            } catch(e) {
                if (AWEMA_CONFIG.dev) console.log(e);
            }

            return tours
        },

        next() {
            this.switchStep(this.currentStep + 1)
        },

        prev() {
            this.switchStep(this.currentStep - 1)
        },

        async finish() {
            await this.toggleTooltip(false)
            await this.toggleUnderlay(false)
            this.isComplete = true
        },

        async switchStep( index ) {

            if ( this.currentStep !== null ) {
                await this.toggleTooltip(false)
                await this.toggleUnderlay(false)
            }

            this.currentStep = index;

            await this.$nextTick( async () => {
                await this.$refs.tooltip.scrollIntoView()
                await this.toggleUnderlay(true)
                await this.toggleTooltip(true)
            })
        },

        toggleUnderlay( isShown ) {
            return resolveOnTransitionEnd(this.$refs.underlay, () => {
                this.showUnderlay = isShown
            })
        },

        toggleTooltip( isShown ) {
            return new Promise(resolve => {
                this.$refs.tooltip.$once('toggle', resolve)
                this.showTooltip = isShown
            })
        },

        setUnderlay({ elTop, elSizes }) {
            this.underlayPosition = {
                top: elTop + 'px',
                left: elSizes.left + 'px',
                width: elSizes.width + 'px',
                height: elSizes.height + 'px'
            }
        }
    },


    mounted() {
        this.fromBeginningTourCookie();
        this.getTourCookie()
    }
}
</script>

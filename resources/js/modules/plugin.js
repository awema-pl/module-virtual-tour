import virtualTour from '../../vue/virtual-tour.vue'
import tooltipPin from '../../vue/tooltip-pin.vue'

export function install(Vue) {

    if (this.installed) return
    this.installed = true

    Vue.component('virtual-tour', virtualTour)
    Vue.component('tooltip-pin', tooltipPin)
}

export default {
    installed: false,
    install
}
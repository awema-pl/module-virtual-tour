import vuePlugin from './modules/plugin'
import lang from './modules/lang'

const awemaPlugin = {

    install(AWEMA) {
        AWEMA.lang = lang
        Vue.use(vuePlugin)
    }
}

if (window && ('AWEMA' in window)) {
    AWEMA.use(awemaPlugin)
} else {
    window.__awema_plugins_stack__ = window.__awema_plugins_stack__ || []
    window.__awema_plugins_stack__.push(awemaPlugin)
}

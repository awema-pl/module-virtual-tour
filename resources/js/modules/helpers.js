export function onDocumentLoad(fn) {

    if (document.readyState === 'complete') {

    } else {
        let _initFunction = () => {
            if (!document.readyState === 'complete') return
            this.currentStep = 0;
            document.removeEventListener('readystatechange', _initFunction)
        }
        document.addEventListener('readystatechange', _initFunction)
    }
}

export function warn(message) {
    console.warn(message)
}

export function error(message, component = 'AWEMA') {
    console.error(component + ': ', message)
}

export function getOffsetTop(el) {
    let top = 0
    do {
        top += el.offsetTop
        el = el.offsetParent
    } while (el)
    return top
}

export function getOffsetLeft(el) {
    let top = 0
    do {
        top += el.offsetLeft
        el = el.offsetParent
    } while (el)
    return top
}

export function getOffset(el) {
    let top = 0,
        left = 0
    do {
        top += el.offsetTop
        left += el.offsetLeft
        el = el.offsetParent
    } while (el)
    return {left, top}
}

export function easeOutCubic(t) {
    return (--t) * t * t + 1
}

export function scrollToPosition(position, duration = 700, done) {
    let startTime = new Date().getTime()
    let startPos = window.pageYOffset
    let distance = position - startPos

    function scroll() {
        let time = new Date().getTime() - startTime
        if (time < duration) {
            let currentPos = startPos + distance * easeOutCubic(time / duration)
            window.scrollTo(0, currentPos)
            requestAnimationFrame(scroll)
        } else {
            window.scrollTo(0, position)
            if ( typeof done === 'function' ) done()
        }
    }

    requestAnimationFrame(scroll)
}

export function supportsPassiveListener() {
    let supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get() { supportsPassive = true }
        });
        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts);
    } catch (e) { }
    return supportsPassive
}

export function addEventListenerOnce(el, event, callback, safeResolveTimeout) {
    let _timeout
    let _listener = function() {
        clearTimeout(_timeout)
        el.removeEventListener(event, _listener)
        callback()
    }
    el.addEventListener(event, _listener)
    if ( safeResolveTimeout ) {
        _timeout = setTimeout(_listener, safeResolveTimeout)
    }
}

export function resolveOnTransitionEnd(el, fn) {
    return new Promise(resolve => {
        let transitionDuration = getComputedStyle(el)['transition-duration']
        let maxTransition
        if ( transitionDuration !== '0s' ) {
            transitionDuration = transitionDuration.split(',').map( val => parseFloat(val) * 1000)
            maxTransition = Math.max.apply(null, transitionDuration)
        }
        fn()
        if ( maxTransition ) {
            addEventListenerOnce(el, 'transitionend', resolve, maxTransition + 50)
        } else {
            resolve()
        }
    })
}
import observable from 'riot-observable'
import * as compiler from '@riotjs/compiler'

const GLOBAL_REGISTRY = '__riot_registry__'
window[GLOBAL_REGISTRY] = {}

export function fireEvent(el, name) {
  var e = document.createEvent('HTMLEvents')
  e.initEvent(name, false, true)
  el.dispatchEvent(e)
}

export function fireKeyEvent(el, name, keyCode) {
  let eventObj = document.createEvent("Events")
  eventObj.initEvent(name, true, true)
  eventObj.keyCode = keyCode
  el.dispatchEvent(eventObj)
}

export const keys = {
  enter: 13,
  escape: 27,
  upArrow: 38,
  downArrow: 40
}

export function init(riot) {
  const obs = observable()
  riot.install(function (component) {
    component.obs = obs

    component.dispatch = (name, data) => {
      const eventName = `on${name}`
      const callback = component.props[eventName]
      if (callback) callback(data);
    }
    component.suShowModal = (target) => {
      component.obs.trigger(`${target.id}-show`)
    }
    component.suHideModal = target => {
      component.obs.trigger(`${target.id}-hide`)
    }
    component.suAlert = opts => {
      component.obs.trigger(`su-alert-show`, opts)
    }
    component.suConfirm = opts => {
      component.obs.trigger(`su-confirm-show`, opts)
    }
    component.suToast = opts => {
      component.obs.trigger(`su-toast-show`, opts)
    }
    component.suLoading = visible => {
      component.obs.trigger(`su-loading`, visible)
    }
  })

  compiler.registerPostprocessor(function (code) {
    return {
      code: `(function (global){${code}})(this)`.replace('export default', 'return'),
      map: {}
    }
  })
}

export function compile(tag, tagName = 'app') {
  const { code } = compiler.compile(tag)

  globalEval(`window.${GLOBAL_REGISTRY}['${tagName}'] = ${code}`)
  return window[GLOBAL_REGISTRY][tagName]
}

// evaluates a compiled tag within the global context
function globalEval(js) {
  const node = document.createElement('script')
  const root = document.documentElement

  // make the source available in the "(no domain)" tab
  // of Chrome DevTools, with a .js extension
  node.text = js

  root.appendChild(node)
  root.removeChild(node)
}
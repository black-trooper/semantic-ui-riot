import observable from 'riot-observable'

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
  })
}
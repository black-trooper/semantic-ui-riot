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

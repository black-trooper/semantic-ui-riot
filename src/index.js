import '../tags/accordion/su-accordion.tag'
import '../tags/accordion/su-accordionset.tag'
import '../tags/alert/su-alert.tag'
import '../tags/checkbox/su-checkbox.tag'
import '../tags/confirm/su-confirm.tag'
import '../tags/datepicker/su-datepicker.tag'
import '../tags/dropdown/su-dropdown.tag'
import '../tags/dropdown/su-select.tag'
import '../tags/modal/su-modal.tag'
import '../tags/popup/su-popup.tag'
import '../tags/radio/su-radio-group.tag'
import '../tags/radio/su-radio.tag'
import '../tags/tab/su-tab-header.tag'
import '../tags/tab/su-tab-title.tag'
import '../tags/tab/su-tab.tag'
import '../tags/tab/su-tabset.tag'
import Q from 'q'

export default function (_options) {
  options.locale = _options.locale
  options.pattern = _options.pattern
}

const options = {}
const obs = riot.observable()

riot.mixin('semantic-ui', {
  defaultOptions: options,
  observable: obs,
})

riot.mixin({
  alert(param) {
    const option = {
      title: null,
      message: null,
    }
    if (typeof param === 'string') {
      option.message = param
    } else {
      option.title = param.title
      option.message = param.message
    }

    obs.trigger('showAlert', option)
  },

  confirm(param) {
    const option = {
      title: null,
      message: null,
    }
    if (typeof param === 'string') {
      option.message = param
    } else {
      option.title = param.title
      option.message = param.message
    }

    return Q.Promise((resolve, reject) => {
      obs.trigger('showConfirm', option)
      obs.on('callbackConfirm', result => {
        return result ? resolve() : reject()
      })
    })
  },
})
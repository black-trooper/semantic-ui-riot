import '../tags/accordion/su-accordion.tag'
import '../tags/accordion/su-accordionset.tag'
import '../tags/alert/su-alert.tag'
import '../tags/checkbox/su-checkbox.tag'
import '../tags/checkbox/su-checkbox-group.tag'
import '../tags/confirm/su-confirm.tag'
import '../tags/datepicker/su-datepicker.tag'
import '../tags/dropdown/su-dropdown.tag'
import '../tags/dropdown/su-select.tag'
import '../tags/modal/su-modal.tag'
import '../tags/pagination/su-pagination.tag'
import '../tags/popup/su-popup.tag'
import '../tags/progress/su-progress.tag'
import '../tags/radio/su-radio-group.tag'
import '../tags/radio/su-radio.tag'
import '../tags/rating/su-rating.tag'
import '../tags/tab/su-tab-header.tag'
import '../tags/tab/su-tab-title.tag'
import '../tags/tab/su-tab.tag'
import '../tags/tab/su-tabset.tag'
import '../tags/table/su-table.tag'
import '../tags/toast/su-toast.tag'
import '../tags/toast/su-toast-item.tag'
import Q from 'q'

export default function (_options) {
  options.locale = _options.locale
  options.pattern = _options.pattern
  options.alert = _options.alert
  options.confirm = _options.confirm
}

const options = {}
const obs = riot.observable()

riot.mixin('semantic-ui', {
  defaultOptions: options,
  observable: obs,
  Q: {
    Promise: Q.Promise,
  }
})

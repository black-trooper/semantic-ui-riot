import '../tags/accordion/su-accordion.tag'
import '../tags/accordion/su-accordionset.tag'
import '../tags/checkbox/su-checkbox.tag'
import '../tags/datepicker/su-datepicker.tag'
import '../tags/dropdown/su-dropdown.tag'
import '../tags/dropdown/su-select.tag'
import '../tags/modal/su-modal.tag'
import '../tags/popup/su-popup.tag'
import '../tags/radio/su-radio-group.tag'
import '../tags/radio/su-radio.tag'
import '../tags/rating/su-rating.tag'
import '../tags/tab/su-tab-header.tag'
import '../tags/tab/su-tab-title.tag'
import '../tags/tab/su-tab.tag'
import '../tags/tab/su-tabset.tag'

export default function (_options) {
  options.locale = _options.locale
  options.pattern = _options.pattern
}

const options = {}

riot.mixin({
  defaultOptions: options
})
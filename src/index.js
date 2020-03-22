import * as riot from 'riot'
import observable from 'riot-observable'
import Q from 'q'
import SuAccordion from '../tags/accordion/su-accordion.riot'
import SuAccordionset from '../tags/accordion/su-accordionset.riot'
import SuAlert from '../tags/alert/su-alert.riot'
import SuCheckbox from '../tags/checkbox/su-checkbox.riot'
import SuCheckboxGroup from '../tags/checkbox/su-checkbox-group.riot'
import SuConfirm from '../tags/confirm/su-confirm.riot'
import SuDatepicker from '../tags/datepicker/su-datepicker.riot'
import SuDropdown from '../tags/dropdown/su-dropdown.riot'
import SuSelect from '../tags/dropdown/su-select.riot'
import SuLoading from '../tags/loading/su-loading.riot'
import SuModal from '../tags/modal/su-modal.riot'
import SuPagination from '../tags/pagination/su-pagination.riot'
import SuPopup from '../tags/popup/su-popup.riot'
import SuProgress from '../tags/progress/su-progress.riot'
import SuRadioGroup from '../tags/radio/su-radio-group.riot'
import SuRadio from '../tags/radio/su-radio.riot'
import SuRating from '../tags/rating/su-rating.riot'
import SuTabHeader from '../tags/tab/su-tab-header.riot'
import SuTabTitle from '../tags/tab/su-tab-title.riot'
import SuTab from '../tags/tab/su-tab.riot'
import SuTabset from '../tags/tab/su-tabset.riot'
import SuTable from '../tags/table/su-table.riot'
import SuTh from '../tags/table/su-th.riot'
import SuToast from '../tags/toast/su-toast.riot'
import SuToastItem from '../tags/toast/su-toast-item.riot'
import SuValidationError from '../tags/validation-error/su-validation-error.riot'
import uuid from 'uuid/v1'

riot.register('su-accordion', SuAccordion)
riot.register('su-accordionset', SuAccordionset)
riot.register('su-alert', SuAlert)
riot.register('su-checkbox', SuCheckbox)
riot.register('su-checkbox-group', SuCheckboxGroup)
riot.register('su-confirm', SuConfirm)
riot.register('su-datepicker', SuDatepicker)
riot.register('su-dropdown', SuDropdown)
riot.register('su-select', SuSelect)
riot.register('su-loading', SuLoading)
riot.register('su-modal', SuModal)
riot.register('su-pagination', SuPagination)
riot.register('su-popup', SuPopup)
riot.register('su-progress', SuProgress)
riot.register('su-radio-group', SuRadioGroup)
riot.register('su-radio', SuRadio)
riot.register('su-rating', SuRating)
riot.register('su-tab-header', SuTabHeader)
riot.register('su-tab-title', SuTabTitle)
riot.register('su-tab', SuTab)
riot.register('su-tabset', SuTabset)
riot.register('su-table', SuTable)
riot.register('su-th', SuTh)
riot.register('su-toast', SuToast)
riot.register('su-toast-item', SuToastItem)
riot.register('su-validation-error', SuValidationError)

export default function (_options) {
  options.locale = _options.locale
  options.pattern = _options.pattern
  options.alert = _options.alert
  options.confirm = _options.confirm
}

const options = {}

const obs = observable()
riot.install(function (component) {
  component.suUuid = uuid()
  component.obs = obs
  component.defaultOptions = options
  component.Q = {
    Promise: Q.Promise,
  }

  component.dispatch = (name, data) => {
    const eventName = `on${name.replace(/[- ](.)/g, (match, group1) => group1.toUpperCase())}`
    const callback = component.props[eventName]
    if (callback) callback(data)
  }

  component.suAlert = opts => {
    return new Promise(resolve => {
      component.obs.trigger('su-alert-show', opts)
      component.obs.on('su-alert-close', () => {
        return resolve()
      })
    })
  }
  component.suConfirm = opts => {
    return Q.Promise((resolve, reject) => {
      component.obs.trigger('su-confirm-show', opts)
      component.obs.on('su-confirm-close', result => {
        return result ? resolve() : reject()
      })
    })
  }
  component.suToast = opts => {
    component.obs.trigger('su-toast-show', opts)
  }
  component.suLoading = visible => {
    component.obs.trigger('su-loading', visible)
  }
})
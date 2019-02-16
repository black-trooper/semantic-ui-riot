<su-confirm>
  <su-modal class="tiny" ref="modal" modal="{ modal }">
    <div class="ui icon message">
      <i class="question circle outline icon"></i>
      <div class="scrolling content">
        <div class="header" if="{ parent.title }">
          { parent.title }
        </div>
        <p each="{ messsage in parent.messages }">{ messsage }</p>
      </div>
    </div>
  </su-modal>

  <style>
    .ui.dimmer {
      z-index: 1010;
    }

    .ui.modal {
      z-index: 1011;
    }

    .ui.message {
      background: none;
      box-shadow: none;
    }
  </style>

  <script>
    const tag = this
    tag.mixin('semantic-ui')

    tag.modal = {
      closable: false,
      buttons: []
    }
    let reverse = false
    const cancelButton = {
      action: 'negativeAction'
    }
    const okButton = {
      action: 'positiveAction'
    }

    tag.on('mount', () => {
      let defaultOkButton = {}
      let defaultCancelButton = {}
      reverse = false
      if (tag.defaultOptions && tag.defaultOptions.confirm) {
        if (tag.defaultOptions.confirm.reverse) {
          reverse = tag.defaultOptions.confirm.reverse
        }
        if (tag.defaultOptions.confirm.buttons) {
          if (tag.defaultOptions.confirm.buttons.ok) {
            defaultOkButton = tag.defaultOptions.confirm.buttons.ok
          }
          if (tag.defaultOptions.confirm.buttons.cancel) {
            defaultCancelButton = tag.defaultOptions.confirm.buttons.cancel
          }
        }
      }

      okButton.text = defaultOkButton.text || 'OK'
      okButton.type = typeof defaultOkButton.type !== 'undefined' ? defaultOkButton.type : 'primary'
      okButton.icon = typeof defaultOkButton.icon !== 'undefined' ? defaultOkButton.icon : 'check'
      cancelButton.text = defaultCancelButton.text || 'Cancel'
      cancelButton.type = defaultCancelButton.type || ''
      cancelButton.icon = defaultCancelButton.icon || ''

      if (defaultOkButton.default) {
        okButton.default = true
      } else if (defaultCancelButton.default) {
        cancelButton.default = true
      } else if (typeof defaultOkButton.default === 'undefined' && typeof defaultOkButton.default === 'undefined') {
        okButton.default = true
      }

      tag.refs.modal.on('positiveAction', () => {
        tag.observable.trigger('callbackConfirm', true)
      })
      tag.refs.modal.on('negativeAction', () => {
        tag.observable.trigger('callbackConfirm', false)
      })
    })

    const setButtons = option => {
      const cancel = {
        text: option.buttons.cancel.text || cancelButton.text,
        type: option.buttons.cancel.type !== null ? option.buttons.cancel.type : cancelButton.type,
        icon: option.buttons.cancel.icon !== null ? option.buttons.cancel.icon : cancelButton.icon,
        action: cancelButton.action,
      }
      const ok = {
        text: option.buttons.ok.text || okButton.text,
        type: option.buttons.ok.type !== null ? option.buttons.ok.type : okButton.type,
        icon: option.buttons.ok.icon !== null ? option.buttons.ok.icon : okButton.icon,
        action: okButton.action,
      }

      if (option.buttons.ok.default) {
        ok.default = true
      } else if (option.buttons.cancel.default) {
        cancel.default = true
      } else if (option.buttons.ok.default === null && option.buttons.cancel.default === null) {
        ok.default = okButton.default
        cancel.default = cancelButton.default
      }

      tag.modal.buttons.length = 0
      tag.modal.buttons.push((option.reverse || reverse) ? ok : cancel)
      tag.modal.buttons.push((option.reverse || reverse) ? cancel : ok)
    }

    // ===================================================================================
    //                                                                          Observable
    //                                                                          ==========
    tag.observable.on('showConfirm', option => {
      tag.title = option.title
      tag.messages = Array.isArray(option.message) ? option.message : [option.message]
      setButtons(option)
      tag.update()
      tag.refs.modal.show()
    })

    riot.mixin({
      suConfirm: param => {
        const option = {
          title: null,
          message: null,
          reverse: null,
          buttons: {
            ok: {
              text: null,
              default: null,
              type: null,
              icon: null,
            },
            cancel: {
              text: null,
              default: null,
              type: null,
              icon: null,
            },
          },
        }
        if (typeof param === 'string') {
          option.message = param
        } else if (param) {
          if (param.title) {
            option.title = param.title
          }
          if (param.message) {
            option.message = param.message
          }
          if (param.reverse) {
            option.reverse = param.reverse
          }
          if (param.buttons) {
            if (param.buttons.ok) {
              option.buttons.ok = param.buttons.ok
            }
            if (param.buttons.cancel) {
              option.buttons.cancel = param.buttons.cancel
            }
          }
        }

        return tag.Q.Promise((resolve, reject) => {
          tag.observable.trigger('showConfirm', option)
          tag.observable.on('callbackConfirm', result => {
            return result ? resolve() : reject()
          })
        })
      }
    })
  </script>
</su-confirm>
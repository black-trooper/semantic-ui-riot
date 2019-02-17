riot.tag2('su-alert', '<su-modal class="tiny" ref="modal" modal="{modal}"> <div class="ui icon message"> <i class="info circle icon"></i> <div class="scrolling content"> <div class="header" if="{parent.title}"> {parent.title} </div> <p each="{message in parent.messages}">{message}</p> </div> </div> </su-modal>', 'su-alert .ui.dimmer,[data-is="su-alert"] .ui.dimmer{ z-index: 1020; } su-alert .ui.modal,[data-is="su-alert"] .ui.modal{ z-index: 1021; } su-alert .ui.message,[data-is="su-alert"] .ui.message{ background: none; box-shadow: none; } su-alert .ui.message .header+p,[data-is="su-alert"] .ui.message .header+p{ margin-top: 1em; }', '', function(opts) {
    const tag = this
    tag.mixin('semantic-ui')

    tag.modal = {
      closable: false,
      buttons: []
    }

    tag.observable.on('showAlert', showAlert)
    tag.on('mount', onMount)

    const button = {}

    function onMount() {
      let defaultButton = {}
      if (tag.defaultOptions && tag.defaultOptions.alert && tag.defaultOptions.alert.button) {
        defaultButton = tag.defaultOptions.alert.button
      }
      if (defaultButton.default) {
        button.default = true
      }
      button.text = defaultButton.text || 'Close'
      button.type = defaultButton.type || ''
      button.icon = defaultButton.icon || ''

      tag.refs.modal.on('closeAction', () => {
        tag.observable.trigger('callbackConfirm')
      })
    }

    function setButton(option) {
      const btn = {
        text: option.button.text || button.text,
        type: option.button.type || button.type,
        icon: option.button.icon || button.icon,
        action: 'closeAction',
        closable: false,
      }
      if (option.button.default) {
        btn.default = true
      } else if (option.button.default === null) {
        btn.default = button.default
      }

      tag.modal.buttons.length = 0
      tag.modal.buttons.push(btn)
    }

    function showAlert(option) {
      tag.title = option.title
      tag.messages = Array.isArray(option.message) ? option.message : [option.message]
      setButton(option)
      tag.update()
      tag.refs.modal.show()
    }

    riot.mixin({
      suAlert: param => {
        const option = {
          title: null,
          message: null,
          button: {
            text: null,
            default: null,
            type: null,
            icon: null,
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
          if (param.button) {
            option.button = param.button
          }
        }

        return tag.Q.Promise(resolve => {
          tag.observable.trigger('showAlert', option)
          tag.observable.on('callbackConfirm', () => {
            tag.refs.modal.hide()
            return resolve()
          })
        })
      }
    })
});
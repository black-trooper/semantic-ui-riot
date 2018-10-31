riot.tag2('su-alert', '<su-modal class="tiny" ref="modal" modal="{modal}"> <div class="ui icon message"> <i class="info circle icon"></i> <div class="scrolling content"> <div class="header" if="{parent.title}"> {parent.title} </div> <p each="{message in parent.messages}">{message}</p> </div> </div> </su-modal>', 'su-alert .ui.dimmer,[data-is="su-alert"] .ui.dimmer{ z-index: 1020; } su-alert .ui.modal,[data-is="su-alert"] .ui.modal{ z-index: 1021; } su-alert .ui.message,[data-is="su-alert"] .ui.message{ background: none; box-shadow: none; } su-alert .ui.message .header+p,[data-is="su-alert"] .ui.message .header+p{ margin-top: 1em; }', '', function(opts) {
    const self = this
    this.mixin('semantic-ui')

    this.modal = {
      closable: false,
      buttons: []
    }
    const button = {}

    this.on('mount', () => {
      let defaultButton = {}
      if (this.defaultOptions && this.defaultOptions.alert && this.defaultOptions.alert.button) {
        defaultButton = this.defaultOptions.alert.button
      }
      if (defaultButton.default) {
        button.default = true
      }
      button.text = defaultButton.text || 'Close'
      button.type = defaultButton.type || ''
      button.icon = defaultButton.icon || ''
    })

    const setButton = option => {
      const btn = {
        text: option.button.text || button.text,
        type: option.button.type || button.type,
        icon: option.button.icon || button.icon,
      }
      if (option.button.default) {
        btn.default = true
      } else if (option.button.default === null) {
        btn.default = button.default
      }

      this.modal.buttons.length = 0
      this.modal.buttons.push(btn)
    }

    this.observable.on('showAlert', option => {
      this.title = option.title
      this.messages = Array.isArray(option.message) ? option.message : [option.message]
      setButton(option)
      this.update()
      this.refs.modal.show()
    })

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
        self.observable.trigger('showAlert', option)
      }
    })
});
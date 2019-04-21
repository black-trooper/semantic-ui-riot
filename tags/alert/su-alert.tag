<su-alert>
  <su-modal class="tiny" modal="{ modal }" onclose="{ onClose }">
    <div class="ui icon message">
      <i class="info circle icon"></i>
      <div class="scrolling content">
        <div class="header" if="{ title }">
          { title }
        </div>
        <p each="{ message in messages }">{ message }</p>
      </div>
    </div>
  </su-modal>

  <style>
    .ui.dimmer {
      z-index: 1020;
    }

    .ui.modal {
      z-index: 1021;
    }

    .ui.message {
      background: none;
      box-shadow: none;
    }

    .ui.message .header+p {
      margin-top: 1em;
    }
  </style>

  <script>
    export default {
      state: {
      },
      modal: {
        closable: false,
        buttons: []
      },
      button: {},
      onMounted,
      onClose
    }

    // ===================================================================================
    //                                                                           Lifecycle
    //                                                                           =========
    function onMounted(props, state) {
      let defaultButton = {}
      if (this.defaultOptions && this.defaultOptions.alert && this.defaultOptions.alert.button) {
        defaultButton = this.defaultOptions.alert.button
      }
      if (defaultButton.default) {
        this.button.default = true
      }
      this.button.text = defaultButton.text || 'Close'
      this.button.type = defaultButton.type || ''
      this.button.icon = defaultButton.icon || ''

      if (this.obs) {
        this.obs.on('su-alert-show', option => {
          suAlert(this, option)
        })
      }
    }

    // ===================================================================================
    //                                                                              Events
    //                                                                              ======
    function onClose(props, state) {
      this.obs.trigger('callbackConfirm')
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    function setButton(tag, option) {
      const btn = {
        text: option.button.text || tag.button.text,
        type: option.button.type || tag.button.type,
        icon: option.button.icon || tag.button.icon,
        action: 'close',
        closable: false,
      }
      if (option.button.default) {
        btn.default = true
      } else if (option.button.default === null) {
        btn.default = tag.button.default
      }

      tag.modal.buttons.length = 0 // reset
      tag.modal.buttons.push(btn)
    }

    function showAlert(tag, option = {}) {
      tag.title = option.title
      tag.messages = Array.isArray(option.message) ? option.message : [option.message]
      setButton(tag, option)
      tag.update()
      tag.showModal(tag.$('su-modal'))
    }

    function suAlert(tag, param) {
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

      return new Promise(resolve => {
        showAlert(tag, option)
        tag.obs.on('callbackConfirm', () => {
          tag.hideModal(tag.$('su-modal'))
          return resolve()
        })
      })
    }
  </script>
</su-alert>
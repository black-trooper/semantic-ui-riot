<su-alert>
  <su-modal class="tiny" ref="modal" modal="{ modal }" title="{ title }" messages="{ messages }">
    <div class="ui icon message">
      <i class="info circle icon"></i>
      <div class="scrolling content">
        <div class="header" if="{ props.title }">
          { props.title }
        </div>
        <p each="{ message in props.messages }">{ message }</p>
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
      onMounted
    }
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    // tag.mixin('semantic-ui')
    // tag.observable.on('showAlert', showAlert)


    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========
    const button = {}

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
    function onMounted(props, state) {
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

      if (this.obs) {
        this.obs.on('su-alert-show', option => {
          suAlert(this, option)
        })
      }
      // tag.refs.modal.on('closeAction', () => {
      //   tag.observable.trigger('callbackConfirm')
      // })
    }

    function setButton(tag, option) {
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

      showAlert(tag, option)

      // return Q.Promise(resolve => {
      //   tag.observable.trigger('showAlert', option)
      //   tag.observable.on('callbackConfirm', () => {
      //     tag.refs.modal.hide()
      //     return resolve()
      //   })
      // })
    }
  </script>
</su-alert>
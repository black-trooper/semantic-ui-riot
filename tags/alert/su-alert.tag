<su-alert>
  <su-modal class="tiny" ref="modal" modal="{ modal }" title="{ title }" messages="{ messages }">
    <div class="ui icon message">
      <i class="info circle icon"></i>
      <div class="scrolling content">
        <div class="header" if="{ opts.title }">
          { opts.title }
        </div>
        <p each="{ message in opts.messages }">{ message }</p>
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
    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.modal = {
      closable: false,
      buttons: []
    }

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    tag.mixin('semantic-ui')
    tag.observable.on('showAlert', showAlert)
    tag.on('mount', onMount)

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========
    const button = {}
    riot.mixin({
      suAlert
    })

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
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

    function suAlert(param) {
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
  </script>
</su-alert>
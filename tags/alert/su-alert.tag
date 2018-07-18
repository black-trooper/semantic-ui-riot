<su-alert>
  <su-modal class="tiny" ref="modal" modal="{ modal }">
    <div class="ui icon message">
      <i class="info circle icon"></i>
      <div class="content">
        <div class="header" if="{ parent.title }">
          { parent.title }
        </div>
        <p each="{ message in parent.messages }">{ message }</p>
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
  </style>

  <script>
    const self = this
    this.mixin('semantic-ui')

    this.modal = {
      closable: false,
      buttons: [{
        default: true,
        text: opts.close ||
          (this.defaultOptions && this.defaultOptions.alert && this.defaultOptions.alert.close) ||
          'close'
      }]
    }

    // ===================================================================================
    //                                                                          Observable
    //                                                                          ==========
    this.observable.on('showAlert', option => {
      this.title = option.title
      this.messages = Array.isArray(option.message) ? option.message : [option.message]
      this.update()
      this.refs.modal.show()
    })

    riot.mixin({
      alert(param) {
        const option = {
          title: null,
          message: null,
        }

        if (typeof param === 'string') {
          option.message = param
        } else if (param) {
          if (param.title) {
            option.title = param.title
          } if (param.message) {
            option.message = param.message
          }
        }

        self.observable.trigger('showAlert', option)
      }
    })
  </script>
</su-alert>
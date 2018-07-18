<su-confirm>
  <su-modal class="tiny" ref="modal" modal="{ modal }">
    <div class="ui icon message">
      <i class="question circle outline icon"></i>
      <div class="content">
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
    this.modal = {
      closable: false,
      buttons: [{
        text: 'はい',
        action: 'positiveAction',
        type: 'primary',
        icon: 'checkmark'
      }, {
        text: 'いいえ',
        action: 'negativeAction',
      }]
    }

    this.on('mount', () => {
      this.refs.modal.on('positiveAction', () => {
        this.observable.trigger('callbackConfirm', true)
      })
      this.refs.modal.on('negativeAction', () => {
        this.observable.trigger('callbackConfirm', false)
      })
    })

    this.mixin('semantic-ui')
    // ===================================================================================
    //                                                                          Observable
    //                                                                          ==========
    this.observable.on('showConfirm', option => {
      this.title = option.title
      this.messages = Array.isArray(option.message) ? option.message : [option.message]
      this.update()
      this.refs.modal.show()
    })
  </script>
</su-confirm>
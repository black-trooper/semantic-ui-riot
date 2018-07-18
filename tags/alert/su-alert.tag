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
    this.modal = {
      closable: false,
      buttons: [{
        text: '閉じる'
      }]
    }

    this.mixin('semantic-ui')
    // ===================================================================================
    //                                                                          Observable
    //                                                                          ==========
    this.observable.on('showAlert', option => {
      this.title = option.title
      this.messages = Array.isArray(option.message) ? option.message : [option.message]
      this.update()
      this.refs.modal.show()
    })
  </script>
</su-alert>
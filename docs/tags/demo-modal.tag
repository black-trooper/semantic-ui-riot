<demo-modal>
  <h1 class="ui header">
    Modal
    <div class="sub header">A modal displays content that temporarily blocks interactions with the main view of a site</div>
  </h1>

  <!-- =================================================================================== -->
  <!--                                                                               Types -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <!-- ====================================================== -->
  <!--                                               Standard -->
  <!--                                               ======== -->
  <h3 class="ui header">Modal</h3>
  <p>A standard modal</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-modal modal="{ modal }" class="large" ref="modal">
        <div class="ui medium image">
          <img src="./images/avatar2/large/rachel.png" />
        </div>
        <div class="description">
          <div class="ui header">Default Profile Image</div>
          <p>We've found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with
            your e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </div>
      </su-modal>
      <button class="ui button" onclick="{ showModal.bind(this, this.refs.modal) }">Show modal</button>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-modal modal="{ modal }" class="large" ref="modal">
          <div class="ui medium image">
            <img src="./images/avatar2/large/rachel.png" />
          </div>
          <div class="description">
            <div class="ui header">Default Profile Image</div>
            <p>We've found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your
              e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </div>
        </su-modal>
        <button class="ui button" onclick="{ showModal }">Show modal</button>

        <script>
          this.modal = {
            header: 'Select a Photo',
            buttons: [{
              text: 'Ok',
              type: 'primary',
              icon: 'checkmark'
            }, {
              text: 'Cancel'
            }]
          }

          this.showModal = () => {
            this.refs.modal.show()
          }
        </script>
      </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                  Basic -->
  <!--                                                  ===== -->
  <h3 class="ui header">Basic</h3>
  <p>A modal can reduce its complexity</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-modal modal="{ modal_basic }" class="basic" ref="modal_basic">
        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
      </su-modal>
      <button class="ui button" onclick="{ showModal.bind(this, this.refs.modal_basic) }">Show modal</button>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-modal modal="{ modal }" class="basic" ref="modal_basic">
        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
      </su-modal>
      <button class="ui button" onclick="{ showModalBasic }">Show modal</button>

      <script>
        this.modal = {
          header: {
            text: 'Archive Old Messages',
            icon: 'archive'
          },
          buttons: [{
            text: 'No'
          }, {
            text: 'Yes',
            type: 'green',
            icon: 'checkmark'
          }]
        }

        this.showModalBasic = () => {
          this.refs.modal_basic.show()
        }
      </script>
    </code></pre>
    </div>
  </section>

  <!-- =================================================================================== -->
  <!--                                                                            Settings -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Settings<a class="anchor" id="settings"></a></h2>

  <!-- ====================================================== -->
  <!--                                           Not closable -->
  <!--                                           ============ -->
  <h3 class="ui header">Not closable</h3>
  <p>Clicking on the dimmer does not close modal</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-modal modal="{ modal2 }" ref="modal2">
        And not closable button
      </su-modal>
      <button class="ui button" onclick="{ showModal.bind(this, this.refs.modal2) }">Show modal</button>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-modal modal="{ modal }" ref="modal">
          And not closable button
        </su-modal>
        <button class="ui button" onclick="{ showModal }">Show modal</button>

        <script>
          this.modal = {
            header: 'Clicking on the dimmer does not close modal',
            closable: false,
            buttons: [{
              text: 'Not closable',
              type: 'red',
              closable: false,
            }, {
              text: 'Closable',
            }]
          }

          this.showModal = () => {
            this.refs.modal.show()
          }
        </script>
      </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                               Callback -->
  <!--                                               ======== -->
  <h3 class="ui header">Callback</h3>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-modal modal="{ modal3 }" ref="modal3">
      </su-modal>
      <div class="ui message" if="{ callbackMessage.length > 0 }">
        <ul>
          <li each="{ item in callbackMessage }">{ item }</li>
        </ul>
      </div>
      <button class="ui button" onclick="{ showModal.bind(this, this.refs.modal3) }">Show modal</button>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-modal modal="{ modal }" ref="modal">
        </su-modal>
        <div class="ui message" if="{ callbackMessage.length > 0 }">
          <ul>
            <li each="{ item in callbackMessage }">{ item }</li>
          </ul>
        </div>
        <button class="ui button" onclick="{ showModal }">Show modal</button>

        <script>
          this.modal = {
            headers: 'Button actions',
            buttons: [{
              text: 'Text access'
            }, {
              text: 'Action access',
              action: 'clickAction'
            }, {
              text: 'Confirm close',
              closable: false,
            }]
          }

          this.showModal = () => {
            this.refs.modal.show()
          }

          this.on('mount', () => {
            // trigger by buttons[n].text
            this.refs.modal.on('Text access', () => {
              this.callbackMessage.push('Text access button is clicked.')
              this.update()
            })

            // trigger by buttons[n].action
            this.refs.modal.on('clickAction', () => {
              this.callbackMessage.push('Action access button is clicked.')
              this.update()
            })
            this.refs.modal.on('Confirm close', () => {
              if (confirm('Are you ok ?')) {
                this.refs.modal3.hide()
                this.callbackMessage.push('Confirm close button is clicked and confirm ok.')
                this.update()
              }
            })

            this.refs.modal.on('show', () => {
              this.callbackMessage.push('Modal show')
              this.update()
            })
            this.refs.modal.on('hide', () => {
              this.callbackMessage.push('Modal hide')
              this.update()
            })
          })
        </script>
      </code></pre>
    </div>
  </section>

  <script>
    this.toggleExample = event => {
      global.toggleExample(event.target)
    }

    this.modal = {
      header: 'Select a Photo',
      buttons: [{
        text: 'Ok',
        type: 'primary',
        icon: 'checkmark'
      }, {
        text: 'Cancel'
      }]
    }

    this.modal_basic = {
      header: {
        text: 'Archive Old Messages',
        icon: 'archive'
      },
      buttons: [{
        text: 'No'
      }, {
        text: 'Yes',
        type: 'green',
        icon: 'checkmark'
      }]
    }

    this.modal2 = {
      header: 'Clicking on the dimmer does not close modal',
      closable: false,
      buttons: [{
        text: 'Not closable',
        type: 'red',
        closable: false,
      }, {
        text: 'Closable',
      }]
    }

    this.modal3 = {
      headers: 'Button actions',
      buttons: [{
        text: 'Text access'
      }, {
        text: 'Action access',
        action: 'clickAction'
      }, {
        text: 'Confirm close',
        closable: false,
      }]
    }

    this.showModal = target => {
      target.show()
    }
    this.callbackMessage = []

    this.on('mount', () => {
      // trigger by buttons[n].text
      this.refs.modal3.on('Text access', () => {
        this.callbackMessage.push('Text access button is clicked.')
        this.update()
      })

      // trigger by buttons[n].action
      this.refs.modal3.on('clickAction', () => {
        this.callbackMessage.push('Action access button is clicked.')
        this.update()
      })
      this.refs.modal3.on('Confirm close', () => {
        this.callbackMessage.push('Confirm close button is clicked.')
        this.update()
        if (confirm('Are you ok ?')) {
          this.refs.modal3.hide()
        }
      })

      this.refs.modal3.on('show', () => {
        this.callbackMessage.push('Modal show')
        this.update()
      })
      this.refs.modal3.on('hide', () => {
        this.callbackMessage.push('Modal hide')
        this.update()
      })

      PR.prettyPrint(false)
    })
  </script>
</demo-modal>
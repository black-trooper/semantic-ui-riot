<demo-modal>
  <h1 class="ui header">
    Modal
    <div class="sub header">A modal displays content that temporarily blocks interactions with the main view of a site</div>
  </h1>

  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <h3 class="ui header">Modal</h3>
  <p>A standard modal</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 0) }"></i>
  </div>
  <div class="ui segment { bottom: !example[0] } attached">
    <su-modal modal="{ modal }" class="large">
      <div class="ui medium image">
        <img src="/images/avatar2/large/rachel.png" />
      </div>
      <div class="description">
        <div class="ui header">Default Profile Image</div>
        <p>We've found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your
          e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </div>
    </su-modal>
    <button class="ui button" onclick="{ showModal }">Show modal</button>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[0] }">
    <pre><code class="prettyprint">
      <su-modal modal="{ modal }" class="large">
        <div class="ui medium image">
          <img src="/images/avatar2/large/rachel.png" />
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
          visible: false,
          heading: 'Select a Photo',
          content_class: 'image',
          buttons: [{
            text: 'Ok',
            type: 'primary',
            icon: 'checkmark'
          }, {
            text: 'Canel'
          }]
        }

        this.showModal = () => {
          this.modal.visible = true
        }
      </script>
    </code></pre>
  </div>

  <h3 class="ui header">Basic</h3>
  <p>A modal can reduce its complexity</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 1) }"></i>
  </div>
  <div class="ui segment { bottom: !example[1] } attached">
    <su-modal modal="{ modal_basic }" class="basic">
      Your inbox is getting full, would you like us to enable automatic archiving of old messages?
    </su-modal>
    <button class="ui button" onclick="{ showModalBasic }">Show modal</button>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[1] }">
    <pre><code class="prettyprint">
      <su-modal modal="{ modal }" class="basic">
        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
      </su-modal>
      <button class="ui button" onclick="{ showModalBasic }">Show modal</button>

      <script>
        this.modal = {
          visible: false,
          heading: {
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
          this.modal.visible = true
        }
      </script>
    </code></pre>
  </div>

  <script>
        this.example = []
        this.toggleExample = index => {
          this.example[index] = !this.example[index]
        }
        this.modal = {
          visible: false,
          heading: 'Select a Photo',
          size: 'large',
          content_class: 'image',
          buttons: [{
            text: 'Ok',
            type: 'primary',
            icon: 'checkmark'
          }, {
            text: 'Canel'
          }]
        }

        this.showModal = () => {
          this.modal.visible = true
        }

        this.modal_basic = {
          visible: false,
          heading: {
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
          this.modal_basic.visible = true
        }

        this.on('mount', () => {
          PR.prettyPrint(false)
        })
  </script>
</demo-modal>
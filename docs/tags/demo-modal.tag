<demo-modal>
  <h1 class="ui header">
    Modal
    <div class="sub header">A modal displays content that temporarily blocks interactions with the main view of a site</div>
  </h1>

  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <h3 class="ui header">Modal</h3>
  <p>A standard modal</p>
  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <su-modal modal="{ modal }">
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
  <div class="ui segment bottom attached inverted">
    <pre><code class="prettyprint">&lt;su-modal modal=&quot;\{ modal \}&quot;&gt;
  &lt;div class=&quot;ui medium image&quot;&gt;
    &lt;img src=&quot;/images/avatar2/large/rachel.png&quot; /&gt;
  &lt;/div&gt;
  &lt;div class=&quot;description&quot;&gt;
    &lt;div class=&quot;ui header&quot;&gt;Default Profile Image&lt;/div&gt;
    &lt;p&gt;We&#039;ve found the following &lt;a href=&quot;https://www.gravatar.com&quot; target=&quot;_blank&quot;&gt;gravatar&lt;/a&gt; image associated with your
      e-mail address.&lt;/p&gt;
    &lt;p&gt;Is it okay to use this photo?&lt;/p&gt;
  &lt;/div&gt;
&lt;/su-modal&gt;
&lt;button class=&quot;ui button&quot; onclick=&quot;\{ showModal \}&quot;&gt;Show modal&lt;/button&gt;

&lt;script&gt;
  this.modal = \{
    visible: false,
    heading: &#039;Select a Photo&#039;,
    size: &#039;large&#039;,
    content_type: &#039;image&#039;,
    buttons: [\{
      text: &#039;Ok&#039;,
      type: &#039;primary&#039;,
      icon: &#039;checkmark&#039;,
      action: () =&gt; this.modal.visible = false
    \}, \{
      text: &#039;Canel&#039;,
      action: () =&gt; this.modal.visible = false
    \}]
  \}

  this.showModal = () =&gt; \{
    this.modal.visible = true
  \}
&lt;/script&gt;</code></pre>
  </div>

  <h3 class="ui header">Basic</h3>
  <p>A modal can reduce its complexity</p>
  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <su-modal modal="{ modal_basic }">
      Your inbox is getting full, would you like us to enable automatic archiving of old messages?
    </su-modal>
    <button class="ui button" onclick="{ showModalBasic }">Show modal</button>
  </div>
  <div class="ui segment bottom attached inverted">
    <pre><code class="prettyprint">&lt;su-modal modal=&quot;\{ modal_basic \}&quot;&gt;
  Your inbox is getting full, would you like us to enable automatic archiving of old messages?
&lt;/su-modal&gt;
&lt;button class=&quot;ui button&quot; onclick=&quot;\{ showModalBasic \}&quot;&gt;Show modal&lt;/button&gt;

&lt;script&gt;
  this.modal_basic = \{
    visible: false,
    heading: \{
      text: &#039;Archive Old Messages&#039;,
      icon: &#039;archive&#039;
    \},
    type: &#039;basic&#039;,
    buttons: [\{
      text: &#039;No&#039;,
      action: () =&gt; this.modal_basic.visible = false
    \}, \{
      text: &#039;Yes&#039;,
      type: &#039;green&#039;,
      icon: &#039;checkmark&#039;,
      action: () =&gt; this.modal_basic.visible = false
    \}]
  \}

  this.showModalBasic = () =&gt; \{
    this.modal_basic.visible = true
  \}
&lt;/script&gt;</code></pre>
  </div>

  <script>
    this.modal = {
      visible: false,
      heading: 'Select a Photo',
      size: 'large',
      content_type: 'image',
      buttons: [{
        text: 'Ok',
        type: 'primary',
        icon: 'checkmark',
        action: () => this.modal.visible = false
      }, {
        text: 'Canel',
        action: () => this.modal.visible = false
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
      type: 'basic',
      buttons: [{
        text: 'No',
        action: () => this.modal_basic.visible = false
      }, {
        text: 'Yes',
        type: 'green',
        icon: 'checkmark',
        action: () => this.modal_basic.visible = false
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
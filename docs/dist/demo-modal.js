riot.tag2('demo-modal', '<h1 class="ui header"> Modal <div class="sub header">A modal displays content that temporarily blocks interactions with the main view of a site</div> </h1> <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2> <h3 class="ui header">Modal</h3> <p>A standard modal</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 0)}"></i> </div> <div class="ui segment {bottom: !example[0]} attached"> <su-modal modal="{modal}"> <div class="ui medium image"> <img src="/images/avatar2/large/rachel.png"> </div> <div class="description"> <div class="ui header">Default Profile Image</div> <p>We\'ve found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your e-mail address.</p> <p>Is it okay to use this photo?</p> </div> </su-modal> <button class="ui button" onclick="{showModal}">Show modal</button> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[0]}"> <pre><code class="prettyprint">&lt;su-modal modal=&quot;\\{ modal \\}&quot;&gt;\n  &lt;div class=&quot;ui medium image&quot;&gt;\n    &lt;img src=&quot;/images/avatar2/large/rachel.png&quot; /&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;description&quot;&gt;\n    &lt;div class=&quot;ui header&quot;&gt;Default Profile Image&lt;/div&gt;\n    &lt;p&gt;We&#039;ve found the following &lt;a href=&quot;https://www.gravatar.com&quot; target=&quot;_blank&quot;&gt;gravatar&lt;/a&gt; image associated with your\n      e-mail address.&lt;/p&gt;\n    &lt;p&gt;Is it okay to use this photo?&lt;/p&gt;\n  &lt;/div&gt;\n&lt;/su-modal&gt;\n&lt;button class=&quot;ui button&quot; onclick=&quot;\\{ showModal \\}&quot;&gt;Show modal&lt;/button&gt;\n\n&lt;script&gt;\n  this.modal = \\{\n    visible: false,\n    heading: &#039;Select a Photo&#039;,\n    size: &#039;large&#039;,\n    content_type: &#039;image&#039;,\n    buttons: [\\{\n      text: &#039;Ok&#039;,\n      type: &#039;primary&#039;,\n      icon: &#039;checkmark&#039;,\n      action: () =&gt; this.modal.visible = false\n    \\}, \\{\n      text: &#039;Canel&#039;,\n      action: () =&gt; this.modal.visible = false\n    \\}]\n  \\}\n\n  this.showModal = () =&gt; \\{\n    this.modal.visible = true\n  \\}\n&lt;/script&gt;</code></pre> </div> <h3 class="ui header">Basic</h3> <p>A modal can reduce its complexity</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 1)}"></i> </div> <div class="ui segment {bottom: !example[1]} attached"> <su-modal modal="{modal_basic}"> Your inbox is getting full, would you like us to enable automatic archiving of old messages? </su-modal> <button class="ui button" onclick="{showModalBasic}">Show modal</button> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[1]}"> <pre><code class="prettyprint">&lt;su-modal modal=&quot;\\{ modal_basic \\}&quot;&gt;\n  Your inbox is getting full, would you like us to enable automatic archiving of old messages?\n&lt;/su-modal&gt;\n&lt;button class=&quot;ui button&quot; onclick=&quot;\\{ showModalBasic \\}&quot;&gt;Show modal&lt;/button&gt;\n\n&lt;script&gt;\n  this.modal_basic = \\{\n    visible: false,\n    heading: \\{\n      text: &#039;Archive Old Messages&#039;,\n      icon: &#039;archive&#039;\n    \\},\n    type: &#039;basic&#039;,\n    buttons: [\\{\n      text: &#039;No&#039;,\n      action: () =&gt; this.modal_basic.visible = false\n    \\}, \\{\n      text: &#039;Yes&#039;,\n      type: &#039;green&#039;,\n      icon: &#039;checkmark&#039;,\n      action: () =&gt; this.modal_basic.visible = false\n    \\}]\n  \\}\n\n  this.showModalBasic = () =&gt; \\{\n    this.modal_basic.visible = true\n  \\}\n&lt;/script&gt;</code></pre> </div>', '', '', function(opts) {
'use strict';

var _this = this;

this.example = [];
this.toggleExample = function (index) {
  _this.example[index] = !_this.example[index];
};
this.modal = {
  visible: false,
  heading: 'Select a Photo',
  size: 'large',
  content_type: 'image',
  buttons: [{
    text: 'Ok',
    type: 'primary',
    icon: 'checkmark',
    action: function action() {
      return _this.modal.visible = false;
    }
  }, {
    text: 'Canel',
    action: function action() {
      return _this.modal.visible = false;
    }
  }]
};

this.showModal = function () {
  _this.modal.visible = true;
};

this.modal_basic = {
  visible: false,
  heading: {
    text: 'Archive Old Messages',
    icon: 'archive'
  },
  type: 'basic',
  buttons: [{
    text: 'No',
    action: function action() {
      return _this.modal_basic.visible = false;
    }
  }, {
    text: 'Yes',
    type: 'green',
    icon: 'checkmark',
    action: function action() {
      return _this.modal_basic.visible = false;
    }
  }]
};

this.showModalBasic = function () {
  _this.modal_basic.visible = true;
};

this.on('mount', function () {
  PR.prettyPrint(false);
});
});
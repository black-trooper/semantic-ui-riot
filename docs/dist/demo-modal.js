riot.tag2('demo-modal', '<h1 class="ui header"> Modal <div class="sub header">A modal displays content that temporarily blocks interactions with the main view of a site</div> </h1> <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2> <h3 class="ui header">Modal</h3> <p>A standard modal</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 0)}"></i> </div> <div class="ui segment {bottom: !example[0]} attached"> <su-modal modal="{modal}" class="large"> <div class="ui medium image"> <img src="/images/avatar2/large/rachel.png"> </div> <div class="description"> <div class="ui header">Default Profile Image</div> <p>We\'ve found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your e-mail address.</p> <p>Is it okay to use this photo?</p> </div> </su-modal> <button class="ui button" onclick="{showModal}">Show modal</button> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[0]}"> <pre><code class="prettyprint">&lt;su-modal modal=&quot;\\{ modal \\}&quot; class=&quot;large&quot;&gt;\n  &lt;div class=&quot;ui medium image&quot;&gt;\n    &lt;img src=&quot;/images/avatar2/large/rachel.png&quot; /&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;description&quot;&gt;\n    &lt;div class=&quot;ui header&quot;&gt;Default Profile Image&lt;/div&gt;\n    &lt;p&gt;We&#39;ve found the following &lt;a href=&quot;https://www.gravatar.com&quot; target=&quot;_blank&quot;&gt;gravatar&lt;/a&gt; image associated with your\n      e-mail address.&lt;/p&gt;\n    &lt;p&gt;Is it okay to use this photo?&lt;/p&gt;\n  &lt;/div&gt;\n&lt;/su-modal&gt;\n&lt;button class=&quot;ui button&quot; onclick=&quot;\\{ showModal \\}&quot;&gt;Show modal&lt;/button&gt;\n\n&lt;script&gt;\n  this.modal = \\{\n    visible: false,\n    heading: &#39;Select a Photo&#39;,\n    content_class: &#39;image&#39;,\n    buttons: [\\{\n      text: &#39;Ok&#39;,\n      type: &#39;primary&#39;,\n      icon: &#39;checkmark&#39;\n    \\}, \\{\n      text: &#39;Canel&#39;\n    \\}]\n  \\}\n\n  this.showModal = () =&gt; \\{\n    this.modal.visible = true\n  \\}\n&lt;/script&gt;\n</code></pre> </div> <h3 class="ui header">Basic</h3> <p>A modal can reduce its complexity</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 1)}"></i> </div> <div class="ui segment {bottom: !example[1]} attached"> <su-modal modal="{modal_basic}" class="basic"> Your inbox is getting full, would you like us to enable automatic archiving of old messages? </su-modal> <button class="ui button" onclick="{showModalBasic}">Show modal</button> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[1]}"> <pre><code class="prettyprint">&lt;su-modal modal=&quot;\\{ modal \\}&quot; class=&quot;basic&quot;&gt;\n  Your inbox is getting full, would you like us to enable automatic archiving of old messages?\n&lt;/su-modal&gt;\n&lt;button class=&quot;ui button&quot; onclick=&quot;\\{ showModalBasic \\}&quot;&gt;Show modal&lt;/button&gt;\n\n&lt;script&gt;\n  this.modal = \\{\n    visible: false,\n    heading: \\{\n      text: &#39;Archive Old Messages&#39;,\n      icon: &#39;archive&#39;\n    \\},\n    buttons: [\\{\n      text: &#39;No&#39;\n    \\}, \\{\n      text: &#39;Yes&#39;,\n      type: &#39;green&#39;,\n      icon: &#39;checkmark&#39;\n    \\}]\n  \\}\n\n  this.showModalBasic = () =&gt; \\{\n    this.modal.visible = true\n  \\}\n&lt;/script&gt;\n</code></pre> </div>', '', '', function(opts) {
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
  content_class: 'image',
  buttons: [{
    text: 'Ok',
    type: 'primary',
    icon: 'checkmark'
  }, {
    text: 'Canel'
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
  buttons: [{
    text: 'No'
  }, {
    text: 'Yes',
    type: 'green',
    icon: 'checkmark'
  }]
};

this.showModalBasic = function () {
  _this.modal_basic.visible = true;
};

this.on('mount', function () {
  PR.prettyPrint(false);
});
});
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

riot.tag2('app', '<navigation></navigation> <div style="margin-left:15.5rem"> <div class="ui padded one column grid"> <div class="column"> <content></content> </div> </div> </div>', '', '', function (opts) {
  'use strict';

  route('', function () {
    riot.mount('content', 'root');
  });

  route(function (collection) {
    riot.mount('content', collection);
  });

  route.start(true);

  global.toggleExample = function (target) {
    var childs = target.parentElement.parentElement.childNodes;
    var segments = Array.from(childs).filter(function (element) {
      return element.classList && element.classList.contains('segment');
    });
    if (segments[2].classList.contains('hidden')) {
      segments[1].classList.remove('bottom');
      segments[2].classList.remove('hidden');
    } else {
      segments[1].classList.remove('attached');
      segments[1].classList.add('bottom');
      segments[1].classList.add('attached');
      segments[2].classList.add('hidden');
    }
  };
});
riot.tag2('demo-checkbox', '<h1 class="ui header"> Checkbox <div class="sub header">A checkbox allows a user to select a value from a small set of options, often binary</div> </h1> <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2> <h3 class="ui header">Standard</h3> <p>A standard checkbox</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-checkbox> Make my profile visible </su-checkbox> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-checkbox&gt;\n  Make my profile visible\n&lt;/su-checkbox&gt;\n</code></pre> </div> </section> <h3 class="ui header">Slider</h3> <p>A checkbox can be formatted to emphasize the current selection state</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-checkbox class="slider"> Accept terms and conditions </su-checkbox> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-checkbox class=&quot;slider&quot;&gt;\n  Accept terms and conditions\n&lt;/su-checkbox&gt;\n</code></pre> </div> </section> <h3 class="ui header">Toggle</h3> <p>A checkbox can be formatted to show an on or off choice</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-checkbox class="toggle"> Subscribe to weekly newsletter </su-checkbox> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-checkbox class=&quot;toggle&quot;&gt;\n  Subscribe to weekly newsletter\n&lt;/su-checkbox&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">States<a class="anchor" id="states"></a></h2> <h3 class="ui header">Read-only</h3> <p>A checkbox can be read-only and unable to change states</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-checkbox class="read-only"> Read Only </su-checkbox> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-checkbox class=&quot;read-only&quot; checked=&quot;true&quot;&gt;\n  Read Only\n&lt;/su-checkbox&gt;\n</code></pre> </div> </section> <h3 class="ui header">Checked</h3> <p>A checkbox can be checked</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-checkbox checked="true"> Active </su-checkbox> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-checkbox checked=&quot;true&quot;&gt;\n  Active\n&lt;/su-checkbox&gt;\n</code></pre> </div> </section> <h3 class="ui header">Disabled</h3> <p>A checkbox can be read-only and unable to change states</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-checkbox class="disabled"> Disabled </su-checkbox> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-checkbox class=&quot;disabled&quot;&gt;\n  Disabled\n&lt;/su-checkbox&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">Update label<a class="anchor" id="label"></a></h2> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-checkbox label="{checkbox_label}"></su-checkbox> <div style="margin-top:1em"> <button type="button" click="{changeCheckboxLabel}" class="ui button">Change label</button> </div> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">  &lt;su-checkbox label=&quot;\\{ checkbox_label \\}&quot; /&gt;\n  &lt;button type=&quot;button&quot; click=&quot;\\{ changeCheckboxLabel \\}&quot; class=&quot;ui button&quot;&gt;Change label&lt;/button&gt;\n\n&lt;script&gt;\n  this.checkbox_label = &apos;change&apos;\n  this.changeCheckboxLabel = () =&gt; \\{\n    this.checkbox_label = (this.checkbox_label === &apos;change&apos;) ? &apos;changed&apos; : &apos;change&apos;\n  \\}\n&lt;/script&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">Access elements<a class="anchor" id="access"></a></h2> <p>Access to checkbox with ref attribute</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-checkbox ref="checkbox1"> Make my profile visible </su-checkbox> <div class="ui message"> <div class="header"> Checked from refs </div> <p>{refs.checkbox1.checked ? \'on\' : \'off\'}</p> </div> <button type="button" click="{setRefValue.bind(this, true)}" class="ui button">Check on</button> <button type="button" click="{setRefValue.bind(this, false)}" class="ui button">Check off</button> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-checkbox ref=&quot;checkbox1&quot;&gt;\n  Make my profile visible\n&lt;/su-checkbox&gt;\n\n&lt;div class=&quot;ui message&quot;&gt;\n  &lt;div class=&quot;header&quot;&gt;\n    Checked\n  &lt;/div&gt;\n  &lt;p&gt;\\{ refs.checkbox1.checked ? &apos;on&apos; : &apos;off&apos; \\}&lt;/p&gt;\n&lt;/div&gt;\n\n&lt;button type=&quot;button&quot; click=&quot;\\{ setRefValue.bind(this, true) \\}&quot; class=&quot;ui button&quot;&gt;Check on&lt;/button&gt;\n&lt;button type=&quot;button&quot; click=&quot;\\{ setRefValue.bind(this, false) \\}&quot; class=&quot;ui button&quot;&gt;Check off&lt;/button&gt;\n\n&lt;script&gt;\n  this.setRefValue = value =&gt; \\{\n    this.refs.checkbox1.checked = value\n  \\}\n&lt;/script&gt;\n</code></pre> </div> </section> <p>Access to checkbox with check attribute</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-checkbox ref="checkbox2" checked="{checkbox2}"> Make my profile visible </su-checkbox> <div class="ui message"> <div class="header"> Checked from refs </div> <p>{refs.checkbox2.checked ? \'on\' : \'off\'}</p> </div> <button type="button" click="{setCheckboxValue.bind(this, true)}" class="ui button">Check on</button> <button type="button" click="{setCheckboxValue.bind(this, false)}" class="ui button">Check off</button> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-checkbox ref=&quot;checkbox2&quot; checked=&quot;\\{ checkbox2 \\}&quot;&gt;\n  Make my profile visible\n&lt;/su-checkbox&gt;\n\n&lt;div class=&quot;ui message&quot;&gt;\n  &lt;div class=&quot;header&quot;&gt;\n    Checked\n  &lt;/div&gt;\n  &lt;p&gt;\\{ refs.checkbox2.checked ? &apos;on&apos; : &apos;off&apos; \\}&lt;/p&gt;\n&lt;/div&gt;\n\n&lt;button type=&quot;button&quot; click=&quot;\\{ setCheckboxValue.bind(this, true) \\}&quot; class=&quot;ui button&quot;&gt;Check on&lt;/button&gt;\n&lt;button type=&quot;button&quot; click=&quot;\\{ setCheckboxValue.bind(this, false) \\}&quot; class=&quot;ui button&quot;&gt;Check off&lt;/button&gt;\n\n&lt;script&gt;\n  this.setCheckboxValue = value =&gt; \\{\n    this.checkbox2 = value\n  \\}\n&lt;/script&gt;\n</code></pre> </div> </section>', '', '', function (opts) {
  'use strict';

  var _this = this;

  this.toggleExample = function (event) {
    global.toggleExample(event.target);
  };

  this.setCheckboxValue = function (value) {
    _this.checkbox2 = value;
  };

  this.setRefValue = function (value) {
    _this.refs.checkbox1.checked = value;
  };

  this.checkbox_label = 'change';
  this.changeCheckboxLabel = function () {
    _this.checkbox_label = _this.checkbox_label === 'change' ? 'changed' : 'change';
  };

  this.on('mount', function () {
    PR.prettyPrint(false);
  });
});
riot.tag2('demo-dropdown', '<h1 class="ui header"> Dropdown <div class="sub header">A dropdown allows a user to select a value from a series of options</div> </h1> <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2> <h3 class="ui header">Selection</h3> <p>A dropdown can be used to select between choices in a form</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;Gender&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &apos;Male&apos;,\n      value: 1\n    \\},\n    \\{\n      label: &apos;Female&apos;,\n      value: 2\n    \\},\n  ]\n&lt;/script&gt;\n</code></pre> </div> </section> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems9}" class="fluid"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; class=&quot;fluid&quot; &gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;Select Friend&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &apos;Jenny Hess&apos;,\n      image: &apos;./images/avatar/small/jenny.jpg&apos;,\n      value: &apos;jenny&apos;\n    \\},\n    \\{\n      label: &apos;Elliot Fu&apos;,\n      image: &apos;./images/avatar/small/elliot.jpg&apos;,\n      value: &apos;elliot&apos;\n    \\},\n    \\{\n      label: &apos;Stevie Feliciano&apos;,\n      image: &apos;./images/avatar/small/stevie.jpg&apos;,\n      value: &apos;stevie&apos;\n    \\},\n    \\{\n      label: &apos;Christian&apos;,\n      image: &apos;./images/avatar/small/christian.jpg&apos;,\n      value: &apos;christian&apos;\n    \\},\n    \\{\n      label: &apos;Matt&apos;,\n      image: &apos;./images/avatar/small/matt.jpg&apos;,\n      value: &apos;matt&apos;\n    \\},\n    \\{\n      label: &apos;Justen Kitsune&apos;,\n      image: &apos;./images/avatar/small/justen.jpg&apos;,\n      value: &apos;justen&apos;\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> </section> <h3 class="ui header">Search Selection</h3> <p>A selection dropdown can allow a user to search through a large list of choices.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems2}" search="true"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; search=&quot;true&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;State&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{ value: &apos;AL&apos;, label: &apos;Alabama&apos; \\},\n    \\{ value: &apos;AK&apos;, label: &apos;Alaska&apos; \\},\n    \\{ value: &apos;AZ&apos;, label: &apos;Arizona&apos; \\},\n    \\{ value: &apos;AR&apos;, label: &apos;Arkansas&apos; \\},\n    \\{ value: &apos;CA&apos;, label: &apos;California&apos; \\},\n    \\{ value: &apos;CO&apos;, label: &apos;Colorado&apos; \\},\n    \\{ value: &apos;CT&apos;, label: &apos;Connecticut&apos; \\},\n    \\{ value: &apos;DE&apos;, label: &apos;Delaware&apos; \\},\n    \\{ value: &apos;DC&apos;, label: &apos;District Of Columbia&apos; \\},\n    \\{ value: &apos;FL&apos;, label: &apos;Florida&apos; \\},\n    \\{ value: &apos;GA&apos;, label: &apos;Georgia&apos; \\},\n    \\{ value: &apos;HI&apos;, label: &apos;Hawaii&apos; \\},\n    \\{ value: &apos;ID&apos;, label: &apos;Idaho&apos; \\},\n    \\{ value: &apos;IL&apos;, label: &apos;Illinois&apos; \\},\n    \\{ value: &apos;IN&apos;, label: &apos;Indiana&apos; \\},\n    \\{ value: &apos;IA&apos;, label: &apos;Iowa&apos; \\},\n    \\{ value: &apos;KS&apos;, label: &apos;Kansas&apos; \\},\n    \\{ value: &apos;KY&apos;, label: &apos;Kentucky&apos; \\},\n    \\{ value: &apos;LA&apos;, label: &apos;Louisiana&apos; \\},\n    \\{ value: &apos;ME&apos;, label: &apos;Maine&apos; \\},\n    \\{ value: &apos;MD&apos;, label: &apos;Maryland&apos; \\},\n    \\{ value: &apos;MA&apos;, label: &apos;Massachusetts&apos; \\},\n    \\{ value: &apos;MI&apos;, label: &apos;Michigan&apos; \\},\n    \\{ value: &apos;MN&apos;, label: &apos;Minnesota&apos; \\},\n    \\{ value: &apos;MS&apos;, label: &apos;Mississippi&apos; \\},\n    \\{ value: &apos;MO&apos;, label: &apos;Missouri&apos; \\},\n    \\{ value: &apos;MT&apos;, label: &apos;Montana&apos; \\},\n    \\{ value: &apos;NE&apos;, label: &apos;Nebraska&apos; \\},\n    \\{ value: &apos;NV&apos;, label: &apos;Nevada&apos; \\},\n    \\{ value: &apos;NH&apos;, label: &apos;New Hampshire&apos; \\},\n    \\{ value: &apos;NJ&apos;, label: &apos;New Jersey&apos; \\},\n    \\{ value: &apos;NM&apos;, label: &apos;New Mexico&apos; \\},\n    \\{ value: &apos;NY&apos;, label: &apos;New York&apos; \\},\n    \\{ value: &apos;NC&apos;, label: &apos;North Carolina&apos; \\},\n    \\{ value: &apos;ND&apos;, label: &apos;North Dakota&apos; \\},\n    \\{ value: &apos;OH&apos;, label: &apos;Ohio&apos; \\},\n    \\{ value: &apos;OK&apos;, label: &apos;Oklahoma&apos; \\},\n    \\{ value: &apos;OR&apos;, label: &apos;Oregon&apos; \\},\n    \\{ value: &apos;PA&apos;, label: &apos;Pennsylvania&apos; \\},\n    \\{ value: &apos;RI&apos;, label: &apos;Rhode Island&apos; \\},\n    \\{ value: &apos;SC&apos;, label: &apos;South Carolina&apos; \\},\n    \\{ value: &apos;SD&apos;, label: &apos;South Dakota&apos; \\},\n    \\{ value: &apos;TN&apos;, label: &apos;Tennessee&apos; \\},\n    \\{ value: &apos;TX&apos;, label: &apos;Texas&apos; \\},\n    \\{ value: &apos;UT&apos;, label: &apos;Utah&apos; \\},\n    \\{ value: &apos;VT&apos;, label: &apos;Vermont&apos; \\},\n    \\{ value: &apos;VA&apos;, label: &apos;Virginia&apos; \\},\n    \\{ value: &apos;WA&apos;, label: &apos;Washington&apos; \\},\n    \\{ value: &apos;WV&apos;, label: &apos;West Virginia&apos; \\},\n    \\{ value: &apos;WI&apos;, label: &apos;Wisconsin&apos; \\},\n    \\{ value: &apos;WY&apos;, label: &apos;Wyoming&apos; \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> </section> <h3 class="ui header">Multiple Selection</h3> <p>A selection dropdown can allow multiple selections</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems8}" multiple="true"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; multiple=&quot;true&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;Skills&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{ value: &apos;angular&apos;, label: &apos;Angular&apos; \\},\n    \\{ value: &apos;css&apos;, label: &apos;CSS&apos; \\},\n    \\{ value: &apos;design&apos;, label: &apos;Graphic Design&apos; \\},\n    \\{ value: &apos;ember&apos;, label: &apos;Ember&apos; \\},\n    \\{ value: &apos;html&apos;, label: &apos;HTML&apos; \\},\n    \\{ value: &apos;ia&apos;, label: &apos;Information Architecture&apos; \\},\n    \\{ value: &apos;javascript&apos;, label: &apos;Javascript&apos; \\},\n    \\{ value: &apos;mech&apos;, label: &apos;Mechanical Engineering&apos; \\},\n    \\{ value: &apos;meteor&apos;, label: &apos;Meteor&apos; \\},\n    \\{ value: &apos;node&apos;, label: &apos;NodeJS&apos; \\},\n    \\{ value: &apos;plumbing&apos;, label: &apos;Plumbing&apos; \\},\n    \\{ value: &apos;python&apos;, label: &apos;Python&apos; \\},\n    \\{ value: &apos;rails&apos;, label: &apos;Rails&apos; \\},\n    \\{ value: &apos;react&apos;, label: &apos;React&apos; \\},\n    \\{ value: &apos;repair&apos;, label: &apos;Kitchen Repair&apos; \\},\n    \\{ value: &apos;ruby&apos;, label: &apos;Ruby&apos; \\},\n    \\{ value: &apos;ui&apos;, label: &apos;UI Design&apos; \\},\n    \\{ value: &apos;ux&apos;, label: &apos;User Experience&apos; \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">Content<a class="anchor" id="content"></a></h2> <h3 class="ui header">Header</h3> <p>A dropdown menu can contain a header</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems3}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;Filter&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &apos;Filter by tag&apos;,\n      icon: &apos;tags&apos;,\n      header: true\n    \\},\n    \\{\n      label: &apos;Important&apos;,\n      value: 1\n    \\},\n    \\{\n      label: &apos;Announcement&apos;,\n      value: 2\n    \\},\n    \\{\n      label: &apos;Discussion&apos;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> </section> <h3 class="ui header">Divider</h3> <p>A dropdown menu can contain dividers to separate related content</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems4}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;Filter&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &apos;Filter by tag&apos;,\n      icon: &apos;tags&apos;,\n      header: true\n    \\},\n    \\{\n      divider: true\n    \\},\n    \\{\n      label: &apos;Important&apos;,\n      value: 1\n    \\},\n    \\{\n      label: &apos;Announcement&apos;,\n      value: 2\n    \\},\n    \\{\n      label: &apos;Discussion&apos;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> </section> <h3 class="ui header">Icon</h3> <p>A dropdown menu can contain an <a href="https://semantic-ui.com/elements/icon.html">icon</a>.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems5}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;Filter&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &apos;Filter by tag&apos;,\n      icon: &apos;tags&apos;,\n      header: true\n    \\},\n    \\{\n      divider: true\n    \\},\n    \\{\n      label: &apos;Important&apos;,\n      icon: &apos;attention&apos;,\n      value: 1\n    \\},\n    \\{\n      label: &apos;Announcement&apos;,\n      icon: &apos;comment&apos;,\n      value: 2\n    \\},\n    \\{\n      label: &apos;Discussion&apos;,\n      icon: &apos;conversation&apos;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> </section> <h3 class="ui header">Description</h3> <p>A dropdown menu can contain a description.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems6}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;Filter Tags&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &apos;Filter by tag&apos;,\n      header: true\n    \\},\n    \\{\n      divider: true\n    \\},\n    \\{\n      label: &apos;Important&apos;,\n      description: &apos;2 new&apos;,\n      value: 1\n    \\},\n    \\{\n      label: &apos;Hopper&apos;,\n      description: &apos;10 new&apos;,\n      value: 2\n    \\},\n    \\{\n      label: &apos;Discussion&apos;,\n      description: &apos;5 new&apos;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> </section> <h3 class="ui header">Image</h3> <p>A dropdown menu can contain an image.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems7}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;Add User&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &apos;People You Might Know&apos;,\n      header: true\n    \\},\n    \\{\n      label: &apos;Jenny Hess&apos;,\n      image: &apos;./images/avatar/small/jenny.jpg&apos;,\n      value: &apos;jenny&apos;\n    \\},\n    \\{\n      label: &apos;Elliot Fu&apos;,\n      image: &apos;./images/avatar/small/elliot.jpg&apos;,\n      value: &apos;elliot&apos;\n    \\},\n    \\{\n      label: &apos;Stevie Feliciano&apos;,\n      image: &apos;./images/avatar/small/stevie.jpg&apos;,\n      value: &apos;stevie&apos;\n    \\},\n    \\{\n      label: &apos;Your Friends\\&apos; Friends&apos;,\n      header: true\n    \\},\n    \\{\n      label: &apos;Christian&apos;,\n      image: &apos;./images/avatar/small/christian.jpg&apos;,\n      value: &apos;christian&apos;\n    \\},\n    \\{\n      label: &apos;Matt&apos;,\n      image: &apos;./images/avatar/small/matt.jpg&apos;,\n      value: &apos;matt&apos;\n    \\},\n    \\{\n      label: &apos;Justen Kitsune&apos;,\n      image: &apos;./images/avatar/small/justen.jpg&apos;,\n      value: &apos;justen&apos;\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">States<a class="anchor" id="states"></a></h2> <h3 class="ui header">Disabled</h3> <p>A dropdown can be disavbled</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems12}" class="disabled"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown class=&quot;disabled&quot;&gt;&lt;/su-dropdown&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">Named elements<a class="anchor" id="named"></a></h2> <h3 class="ui header">Single Selection</h3> <p>Access to single selection with ref attribute</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems10}" ref="dropdown1"></su-dropdown> <div class="ui message"> <div class="header"> Selected value </div> <p>value: {refs.dropdown1.value}</p> <p>label: {refs.dropdown1.label}</p> </div> <button type="button" click="{setRefValue.bind(this, null)}" class="ui button">Select Default</button> <button type="button" click="{setRefValue.bind(this, 1)}" class="ui button">Select Male</button> <button type="button" click="{setRefValue.bind(this, 2)}" class="ui button">Select Female</button> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; ref=&quot;dropdown1&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;div class=&quot;ui message&quot;&gt;\n  &lt;div class=&quot;header&quot;&gt;\n    Selected value\n  &lt;/div&gt;\n  &lt;p&gt;value: \\{ refs.dropdown1.value \\}&lt;/p&gt;\n  &lt;p&gt;label: \\{ refs.dropdown1.label \\}&lt;/p&gt;\n&lt;/div&gt;\n\n&lt;button type=&quot;button&quot; click=&quot;\\{ setRefValue.bind(this, null) \\}&quot; class=&quot;ui button&quot;&gt;Select Default&lt;/button&gt;\n&lt;button type=&quot;button&quot; click=&quot;\\{ setRefValue.bind(this, 1) \\}&quot; class=&quot;ui button&quot;&gt;Select Male&lt;/button&gt;\n&lt;button type=&quot;button&quot; click=&quot;\\{ setRefValue.bind(this, 2) \\}&quot; class=&quot;ui button&quot;&gt;Select Female&lt;/button&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;Gender&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &apos;Male&apos;,\n      value: 1\n    \\},\n    \\{\n      label: &apos;Female&apos;,\n      value: 2\n    \\},\n  ]\n\n  this.setRefValue = value =&gt; \\{\n    this.refs.dropdown1.value = value\n  \\}\n&lt;/script&gt;\n</code></pre> </div> </section> <h3 class="ui header">Multi Selection</h3> <p>Access to multi selection with ref attribute</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems11}" ref="dropdown2" multiple="true"></su-dropdown> <div class="ui message"> <div class="header"> Selected value </div> <p>value: {refs.dropdown2.value}</p> </div> <button type="button" click="{setMultiRefValue.bind(this, null)}" class="ui button">Select Default</button> <button type="button" click="{setMultiRefValue.bind(this, [\'angular\', \'css\'])}" class="ui button">Select Angular &amp; CSS</button> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; ref=&quot;dropdown2&quot; multiple=&quot;true&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;div class=&quot;ui message&quot;&gt;\n  &lt;div class=&quot;header&quot;&gt;\n    Selected value\n  &lt;/div&gt;\n  &lt;p&gt;value: \\{ refs.dropdown2.value \\}&lt;/p&gt;\n&lt;/div&gt;\n\n&lt;button type=&quot;button&quot; click=&quot;\\{ setMultiRefValue.bind(this, null) \\}&quot; class=&quot;ui button&quot;&gt;Select Default&lt;/button&gt;\n&lt;button type=&quot;button&quot; click=&quot;\\{ setMultiRefValue.bind(this, [&apos;angular&apos;, &apos;css&apos;]) \\}&quot; class=&quot;ui button&quot;&gt;Select Angular &amp;amp; CSS&lt;/button&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;Skills&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{ value: &apos;angular&apos;, label: &apos;Angular&apos; \\},\n    \\{ value: &apos;css&apos;, label: &apos;CSS&apos; \\},\n    \\{ value: &apos;design&apos;, label: &apos;Graphic Design&apos; \\},\n    \\{ value: &apos;ember&apos;, label: &apos;Ember&apos; \\},\n    \\{ value: &apos;html&apos;, label: &apos;HTML&apos; \\},\n    \\{ value: &apos;ia&apos;, label: &apos;Information Architecture&apos; \\},\n    \\{ value: &apos;javascript&apos;, label: &apos;Javascript&apos; \\},\n    \\{ value: &apos;mech&apos;, label: &apos;Mechanical Engineering&apos; \\},\n    \\{ value: &apos;meteor&apos;, label: &apos;Meteor&apos; \\},\n    \\{ value: &apos;node&apos;, label: &apos;NodeJS&apos; \\},\n    \\{ value: &apos;plumbing&apos;, label: &apos;Plumbing&apos; \\},\n    \\{ value: &apos;python&apos;, label: &apos;Python&apos; \\},\n    \\{ value: &apos;rails&apos;, label: &apos;Rails&apos; \\},\n    \\{ value: &apos;react&apos;, label: &apos;React&apos; \\},\n    \\{ value: &apos;repair&apos;, label: &apos;Kitchen Repair&apos; \\},\n    \\{ value: &apos;ruby&apos;, label: &apos;Ruby&apos; \\},\n    \\{ value: &apos;ui&apos;, label: &apos;UI Design&apos; \\},\n    \\{ value: &apos;ux&apos;, label: &apos;User Experience&apos; \\}\n  ]\n\n  this.setRefValue = value =&gt; \\{\n    this.refs.dropdown1.value = value\n  \\}\n&lt;/script&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">Event trigger<a class="anchor" id="event"></a></h2> <h3 class="ui header">Single Selection</h3> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-dropdown items="{dropdownItems13}" ref="dropdown3"></su-dropdown> <div class="ui message"> <ul> <li each="{item in singleMessage}">{item}</li> </ul> </div> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; ref=&quot;dropdown&quot;&gt;&lt;/su-dropdown&gt;\n&lt;div class=&quot;ui message&quot;&gt;\n  &lt;ul&gt;\n    &lt;li each=&quot;\\{ item in singleMessage \\}&quot;&gt;\\{ item \\}&lt;/li&gt;\n  &lt;/ul&gt;\n&lt;/div&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &apos;Gender&apos;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &apos;Male&apos;,\n      value: 1\n    \\},\n    \\{\n      label: &apos;Female&apos;,\n      value: 2\n    \\},\n  ]\n\n  this.on(&apos;mount&apos;, () =&gt; \\{\n    this.refs.dropdown.on(&apos;select&apos;, target =&gt; \\{\n      this.singleMessage.push(`Selected. label: $\\{target.label\\}, value: $\\{target.value\\}`)\n      this.update()\n    \\})\n    this.refs.dropdown.on(&apos;change&apos;, target =&gt; \\{\n      this.singleMessage.push(`Changed. label: $\\{target.label\\}, value: $\\{target.value\\}`)\n      this.update()\n    \\})\n\n    PR.prettyPrint(false)\n  \\})\n&lt;/script&gt;\n</code></pre> </div> </section>', '', '', function (opts) {
  'use strict';

  var _this = this;

  this.toggleExample = function (event) {
    global.toggleExample(event.target);
  };

  this.dropdownItems = [{
    label: 'Gender',
    value: null,
    default: true
  }, {
    label: 'Male',
    value: 1
  }, {
    label: 'Female',
    value: 2
  }];
  this.dropdownItems2 = [{
    label: 'State',
    value: null,
    default: true
  }, { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'DC', label: 'District Of Columbia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }];
  this.dropdownItems3 = [{
    label: 'Filter',
    value: null,
    default: true
  }, {
    label: 'Filter by tag',
    icon: 'tags',
    header: true
  }, {
    label: 'Important',
    value: 1
  }, {
    label: 'Announcement',
    value: 2
  }, {
    label: 'Discussion',
    value: 3
  }];

  this.dropdownItems4 = [{
    label: 'Filter',
    value: null,
    default: true
  }, {
    label: 'Filter by tag',
    icon: 'tags',
    header: true
  }, {
    divider: true
  }, {
    label: 'Important',
    value: 1
  }, {
    label: 'Announcement',
    value: 2
  }, {
    label: 'Discussion',
    value: 3
  }];

  this.dropdownItems5 = [{
    label: 'Filter',
    value: null,
    default: true
  }, {
    label: 'Filter by tag',
    icon: 'tags',
    header: true
  }, {
    divider: true
  }, {
    label: 'Important',
    icon: 'attention',
    value: 1
  }, {
    label: 'Announcement',
    icon: 'comment',
    value: 2
  }, {
    label: 'Discussion',
    icon: 'conversation',
    value: 3
  }];

  this.dropdownItems6 = [{
    label: 'Filter Tags',
    value: null,
    default: true
  }, {
    label: 'Filter by tag',
    header: true
  }, {
    divider: true
  }, {
    label: 'Important',
    description: '2 new',
    value: 1
  }, {
    label: 'Hopper',
    description: '10 new',
    value: 2
  }, {
    label: 'Discussion',
    description: '5 new',
    value: 3
  }];

  this.dropdownItems7 = [{
    label: 'Add User',
    value: null,
    default: true
  }, {
    label: 'People You Might Know',
    header: true
  }, {
    label: 'Jenny Hess',
    image: './images/avatar/small/jenny.jpg',
    value: 'jenny'
  }, {
    label: 'Elliot Fu',
    image: './images/avatar/small/elliot.jpg',
    value: 'elliot'
  }, {
    label: 'Stevie Feliciano',
    image: './images/avatar/small/stevie.jpg',
    value: 'stevie'
  }, {
    label: 'Your Friends\' Friends',
    header: true
  }, {
    label: 'Christian',
    image: './images/avatar/small/christian.jpg',
    value: 'christian'
  }, {
    label: 'Matt',
    image: './images/avatar/small/matt.jpg',
    value: 'matt'
  }, {
    label: 'Justen Kitsune',
    image: './images/avatar/small/justen.jpg',
    value: 'justen'
  }];

  this.dropdownItems8 = [{
    label: 'Skills',
    value: null,
    default: true
  }, { value: 'angular', label: 'Angular' }, { value: 'css', label: 'CSS' }, { value: 'design', label: 'Graphic Design' }, { value: 'ember', label: 'Ember' }, { value: 'html', label: 'HTML' }, { value: 'ia', label: 'Information Architecture' }, { value: 'javascript', label: 'Javascript' }, { value: 'mech', label: 'Mechanical Engineering' }, { value: 'meteor', label: 'Meteor' }, { value: 'node', label: 'NodeJS' }, { value: 'plumbing', label: 'Plumbing' }, { value: 'python', label: 'Python' }, { value: 'rails', label: 'Rails' }, { value: 'react', label: 'React' }, { value: 'repair', label: 'Kitchen Repair' }, { value: 'ruby', label: 'Ruby' }, { value: 'ui', label: 'UI Design' }, { value: 'ux', label: 'User Experience' }];

  this.dropdownItems9 = [{
    label: 'Select Friend',
    value: null,
    default: true
  }, {
    label: 'Jenny Hess',
    image: './images/avatar/small/jenny.jpg',
    value: 'jenny'
  }, {
    label: 'Elliot Fu',
    image: './images/avatar/small/elliot.jpg',
    value: 'elliot'
  }, {
    label: 'Stevie Feliciano',
    image: './images/avatar/small/stevie.jpg',
    value: 'stevie'
  }, {
    label: 'Christian',
    image: './images/avatar/small/christian.jpg',
    value: 'christian'
  }, {
    label: 'Matt',
    image: './images/avatar/small/matt.jpg',
    value: 'matt'
  }, {
    label: 'Justen Kitsune',
    image: './images/avatar/small/justen.jpg',
    value: 'justen'
  }];

  this.dropdownItems10 = [{
    label: 'Gender',
    value: null,
    default: true
  }, {
    label: 'Male',
    value: 1
  }, {
    label: 'Female',
    value: 2
  }];

  this.dropdownItems11 = [{
    label: 'Skills',
    value: null,
    default: true
  }, { value: 'angular', label: 'Angular' }, { value: 'css', label: 'CSS' }, { value: 'design', label: 'Graphic Design' }, { value: 'ember', label: 'Ember' }, { value: 'html', label: 'HTML' }, { value: 'ia', label: 'Information Architecture' }, { value: 'javascript', label: 'Javascript' }, { value: 'mech', label: 'Mechanical Engineering' }, { value: 'meteor', label: 'Meteor' }, { value: 'node', label: 'NodeJS' }, { value: 'plumbing', label: 'Plumbing' }, { value: 'python', label: 'Python' }, { value: 'rails', label: 'Rails' }, { value: 'react', label: 'React' }, { value: 'repair', label: 'Kitchen Repair' }, { value: 'ruby', label: 'Ruby' }, { value: 'ui', label: 'UI Design' }, { value: 'ux', label: 'User Experience' }];
  this.dropdownItems12 = [{
    label: 'Gender',
    value: null,
    default: true
  }, {
    label: 'Male',
    value: 1
  }, {
    label: 'Female',
    value: 2
  }];
  this.dropdownItems13 = [{
    label: 'Gender',
    value: null,
    default: true
  }, {
    label: 'Male',
    value: 1
  }, {
    label: 'Female',
    value: 2
  }];

  this.setRefValue = function (value) {
    _this.refs.dropdown1.value = value;
  };
  this.setMultiRefValue = function (values) {
    _this.refs.dropdown2.value = values;
    _this.update();
  };

  this.singleMessage = [];
  this.on('mount', function () {
    _this.refs.dropdown3.on('select', function (target) {
      _this.singleMessage.push('Selected. label: ' + target.label + ', value: ' + target.value);
      _this.update();
    });
    _this.refs.dropdown3.on('change', function (target) {
      _this.singleMessage.push('Changed. label: ' + target.label + ', value: ' + target.value);
      _this.update();
    });

    PR.prettyPrint(false);
  });
});
riot.tag2('demo-modal', '<h1 class="ui header"> Modal <div class="sub header">A modal displays content that temporarily blocks interactions with the main view of a site</div> </h1> <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2> <h3 class="ui header">Modal</h3> <p>A standard modal</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-modal modal="{modal}" class="large" ref="modal"> <div class="ui medium image"> <img src="./images/avatar2/large/rachel.png"> </div> <div class="description"> <div class="ui header">Default Profile Image</div> <p>We\'ve found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your e-mail address.</p> <p>Is it okay to use this photo?</p> </div> </su-modal> <button class="ui button" onclick="{showModal.bind(this, this.refs.modal)}">Show modal</button> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-modal modal=&quot;\\{ modal \\}&quot; class=&quot;large&quot; ref=&quot;modal&quot;&gt;\n  &lt;div class=&quot;ui medium image&quot;&gt;\n    &lt;img src=&quot;./images/avatar2/large/rachel.png&quot; /&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;description&quot;&gt;\n    &lt;div class=&quot;ui header&quot;&gt;Default Profile Image&lt;/div&gt;\n    &lt;p&gt;We&apos;ve found the following &lt;a href=&quot;https://www.gravatar.com&quot; target=&quot;_blank&quot;&gt;gravatar&lt;/a&gt; image associated with your\n      e-mail address.&lt;/p&gt;\n    &lt;p&gt;Is it okay to use this photo?&lt;/p&gt;\n  &lt;/div&gt;\n&lt;/su-modal&gt;\n&lt;button class=&quot;ui button&quot; onclick=&quot;\\{ showModal \\}&quot;&gt;Show modal&lt;/button&gt;\n\n&lt;script&gt;\n  this.modal = \\{\n    header: &apos;Select a Photo&apos;,\n    buttons: [\\{\n      text: &apos;Ok&apos;,\n      type: &apos;primary&apos;,\n      icon: &apos;checkmark&apos;\n    \\}, \\{\n      text: &apos;Cancel&apos;\n    \\}]\n  \\}\n\n  this.showModal = () =&gt; \\{\n    this.refs.modal.show()\n  \\}\n&lt;/script&gt;\n</code></pre> </div> </section> <h3 class="ui header">Basic</h3> <p>A modal can reduce its complexity</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-modal modal="{modal_basic}" class="basic" ref="modal_basic"> Your inbox is getting full, would you like us to enable automatic archiving of old messages? </su-modal> <button class="ui button" onclick="{showModal.bind(this, this.refs.modal_basic)}">Show modal</button> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-modal modal=&quot;\\{ modal \\}&quot; class=&quot;basic&quot; ref=&quot;modal_basic&quot;&gt;\n  Your inbox is getting full, would you like us to enable automatic archiving of old messages?\n&lt;/su-modal&gt;\n&lt;button class=&quot;ui button&quot; onclick=&quot;\\{ showModalBasic \\}&quot;&gt;Show modal&lt;/button&gt;\n\n&lt;script&gt;\n  this.modal = \\{\n    header: \\{\n      text: &apos;Archive Old Messages&apos;,\n      icon: &apos;archive&apos;\n    \\},\n    buttons: [\\{\n      text: &apos;No&apos;\n    \\}, \\{\n      text: &apos;Yes&apos;,\n      type: &apos;green&apos;,\n      icon: &apos;checkmark&apos;\n    \\}]\n  \\}\n\n  this.showModalBasic = () =&gt; \\{\n    this.refs.modal_basic.show()\n  \\}\n&lt;/script&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">Settings<a class="anchor" id="settings"></a></h2> <h3 class="ui header">Not closable</h3> <p>Clicking on the dimmer does not close modal</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-modal modal="{modal2}" ref="modal2"> And not closable button </su-modal> <button class="ui button" onclick="{showModal.bind(this, this.refs.modal2)}">Show modal</button> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-modal modal=&quot;\\{ modal \\}&quot; ref=&quot;modal&quot;&gt;\n  And not closable button\n&lt;/su-modal&gt;\n&lt;button class=&quot;ui button&quot; onclick=&quot;\\{ showModal \\}&quot;&gt;Show modal&lt;/button&gt;\n\n&lt;script&gt;\n  this.modal = \\{\n    header: &apos;Clicking on the dimmer does not close modal&apos;,\n    closable: false,\n    buttons: [\\{\n      text: &apos;Not closable&apos;,\n      type: &apos;red&apos;,\n      closable: false,\n    \\}, \\{\n      text: &apos;Closable&apos;,\n    \\}]\n  \\}\n\n  this.showModal = () =&gt; \\{\n    this.refs.modal.show()\n  \\}\n&lt;/script&gt;\n</code></pre> </div> </section> <h3 class="ui header">Callback</h3> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-modal modal="{modal3}" ref="modal3"> </su-modal> <div class="ui message" if="{callbackMessage.length > 0}"> <ul> <li each="{item in callbackMessage}">{item}</li> </ul> </div> <button class="ui button" onclick="{showModal.bind(this, this.refs.modal3)}">Show modal</button> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-modal modal=&quot;\\{ modal \\}&quot; ref=&quot;modal&quot;&gt;\n&lt;/su-modal&gt;\n&lt;div class=&quot;ui message&quot; if=&quot;\\{ callbackMessage.length &gt; 0 \\}&quot;&gt;\n  &lt;ul&gt;\n    &lt;li each=&quot;\\{ item in callbackMessage \\}&quot;&gt;\\{ item \\}&lt;/li&gt;\n  &lt;/ul&gt;\n&lt;/div&gt;\n&lt;button class=&quot;ui button&quot; onclick=&quot;\\{ showModal \\}&quot;&gt;Show modal&lt;/button&gt;\n\n&lt;script&gt;\n  this.modal = \\{\n    headers: &apos;Button actions&apos;,\n    buttons: [\\{\n      text: &apos;Text access&apos;\n    \\}, \\{\n      text: &apos;Action access&apos;,\n      action: &apos;clickAction&apos;\n    \\}, \\{\n      text: &apos;Confirm close&apos;,\n      closable: false,\n    \\}]\n  \\}\n\n  this.showModal = () =&gt; \\{\n    this.refs.modal.show()\n  \\}\n\n  this.on(&apos;mount&apos;, () =&gt; \\{\n    // trigger by buttons[n].text\n    this.refs.modal.on(&apos;Text access&apos;, () =&gt; \\{\n      this.callbackMessage.push(&apos;Text access button is clicked.&apos;)\n      this.update()\n    \\})\n\n    // trigger by buttons[n].action\n    this.refs.modal.on(&apos;clickAction&apos;, () =&gt; \\{\n      this.callbackMessage.push(&apos;Action access button is clicked.&apos;)\n      this.update()\n    \\})\n    this.refs.modal.on(&apos;Confirm close&apos;, () =&gt; \\{\n      if (confirm(&apos;Are you ok ?&apos;)) \\{\n        this.refs.modal3.hide()\n        this.callbackMessage.push(&apos;Confirm close button is clicked and confirm ok.&apos;)\n        this.update()\n      \\}\n    \\})\n\n    this.refs.modal.on(&apos;show&apos;, () =&gt; \\{\n      this.callbackMessage.push(&apos;Modal show&apos;)\n      this.update()\n    \\})\n    this.refs.modal.on(&apos;hide&apos;, () =&gt; \\{\n      this.callbackMessage.push(&apos;Modal hide&apos;)\n      this.update()\n    \\})\n  \\})\n&lt;/script&gt;\n</code></pre> </div> </section>', '', '', function (opts) {
  'use strict';

  var _this = this;

  this.toggleExample = function (event) {
    global.toggleExample(event.target);
  };

  this.modal = {
    header: 'Select a Photo',
    buttons: [{
      text: 'Ok',
      type: 'primary',
      icon: 'checkmark'
    }, {
      text: 'Cancel'
    }]
  };

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
  };

  this.modal2 = {
    header: 'Clicking on the dimmer does not close modal',
    closable: false,
    buttons: [{
      text: 'Not closable',
      type: 'red',
      closable: false
    }, {
      text: 'Closable'
    }, {
      text: 'Disabled',
      disabled: true
    }]
  };

  this.modal3 = {
    headers: 'Button actions',
    buttons: [{
      text: 'Text access'
    }, {
      text: 'Action access',
      action: 'clickAction'
    }, {
      text: 'Confirm close',
      closable: false
    }]
  };

  this.showModal = function (target) {
    target.show();
  };
  this.callbackMessage = [];

  this.on('mount', function () {
    // trigger by buttons[n].text
    _this.refs.modal3.on('Text access', function () {
      _this.callbackMessage.push('Text access button is clicked.');
      _this.update();
    });

    // trigger by buttons[n].action
    _this.refs.modal3.on('clickAction', function () {
      _this.callbackMessage.push('Action access button is clicked.');
      _this.update();
    });
    _this.refs.modal3.on('Confirm close', function () {
      _this.callbackMessage.push('Confirm close button is clicked.');
      _this.update();
      if (confirm('Are you ok ?')) {
        _this.refs.modal3.hide();
      }
    });

    _this.refs.modal3.on('show', function () {
      _this.callbackMessage.push('Modal show');
      _this.update();
    });
    _this.refs.modal3.on('hide', function () {
      _this.callbackMessage.push('Modal hide');
      _this.update();
    });

    PR.prettyPrint(false);
  });
});
riot.tag2('demo-popup', '<h1 class="ui header"> Popup <div class="sub header">A popup displays additional information on top of a page </div> </h1> <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2> <h3 class="ui header">Popup</h3> <p>An element can specify popup content to appear</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-popup class="ui icon button" tooltip="Add users to your feed" position="top left">Top Left</su-popup> <su-popup class="ui icon button" tooltip="Add users to your feed" position="top center">Top Center</su-popup> <su-popup class="ui icon button" tooltip="Add users to your feed" position="top right">Top Right</su-popup> <div class="ui divider"></div> <su-popup class="ui icon button" tooltip="Add users to your feed" position="bottom left">Bottom Left</su-popup> <su-popup class="ui icon button" tooltip="Add users to your feed" position="bottom center">Bottom Center</su-popup> <su-popup class="ui icon button" tooltip="Add users to your feed" position="bottom right">Bottom Right</su-popup> <div class="ui divider"></div> <su-popup class="ui icon button" tooltip="Add users to your feed" position="right center">Right Center</su-popup> <su-popup class="ui icon button" tooltip="Add users to your feed" position="left center">Left Center</su-popup> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-popup class=&quot;ui icon button&quot; tooltip=&quot;Add users to your feed&quot; position=&quot;top left&quot;&gt;Top Left&lt;/su-popup&gt;\n&lt;su-popup class=&quot;ui icon button&quot; tooltip=&quot;Add users to your feed&quot; position=&quot;top center&quot;&gt;Top Center&lt;/su-popup&gt;\n&lt;su-popup class=&quot;ui icon button&quot; tooltip=&quot;Add users to your feed&quot; position=&quot;top right&quot;&gt;Top Right&lt;/su-popup&gt;\n&lt;div class=&quot;ui divider&quot;&gt;&lt;/div&gt;\n&lt;su-popup class=&quot;ui icon button&quot; tooltip=&quot;Add users to your feed&quot; position=&quot;bottom left&quot;&gt;Bottom Left&lt;/su-popup&gt;\n&lt;su-popup class=&quot;ui icon button&quot; tooltip=&quot;Add users to your feed&quot; position=&quot;bottom center&quot;&gt;Bottom Center&lt;/su-popup&gt;\n&lt;su-popup class=&quot;ui icon button&quot; tooltip=&quot;Add users to your feed&quot; position=&quot;bottom right&quot;&gt;Bottom Right&lt;/su-popup&gt;\n&lt;div class=&quot;ui divider&quot;&gt;&lt;/div&gt;\n&lt;su-popup class=&quot;ui icon button&quot; tooltip=&quot;Add users to your feed&quot; position=&quot;right center&quot;&gt;Right Center&lt;/su-popup&gt;\n&lt;su-popup class=&quot;ui icon button&quot; tooltip=&quot;Add users to your feed&quot; position=&quot;left center&quot;&gt;Left Center&lt;/su-popup&gt;\n</code></pre> </div> </section> <h3 class="ui header">Titled</h3> <p>An element can specify popup content with a title</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-popup data-title="Elliot Fu" tooltip="Elliot has been a member since July 2012"><img src="/images/avatar/small/elliot.jpg" class="ui avatar image"></su-popup> <su-popup data-title="Stevie Feliciano" tooltip="Stevie has been a member since August 2013"><img src="/images/avatar/small/stevie.jpg" class="ui avatar image"></su-popup> <su-popup data-title="Matt" tooltip="Matt has been a member since July 2014"><img src="/images/avatar/small/matt.jpg" class="ui avatar image"></su-popup> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-popup data-title=&quot;Elliot Fu&quot; tooltip=&quot;Elliot has been a member since July 2012&quot;&gt;&lt;img src=&quot;/images/avatar/small/elliot.jpg&quot; class=&quot;ui avatar image&quot; /&gt;&lt;/su-popup&gt;\n&lt;su-popup data-title=&quot;Stevie Feliciano&quot; tooltip=&quot;Stevie has been a member since August 2013&quot;&gt;&lt;img src=&quot;/images/avatar/small/stevie.jpg&quot; class=&quot;ui avatar image&quot; /&gt;&lt;/su-popup&gt;\n&lt;su-popup data-title=&quot;Matt&quot; tooltip=&quot;Matt has been a member since July 2014&quot;&gt;&lt;img src=&quot;/images/avatar/small/matt.jpg&quot; class=&quot;ui avatar image&quot; /&gt;&lt;/su-popup&gt;\n</code></pre> </div> </section> <h3 class="ui header">HTML</h3> <p>An element can specify HTML for a popup</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-popup class="ui card"> <div class="content"> <div class="header">My Neighbor Totoro</div> <div class="description"> Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by magical spirits. </div> </div> <div class="ui two bottom attached buttons"> <div class="ui button"> <i class="add icon"></i> Queue </div> <div class="ui primary button"> <i class="play icon"></i> Watch </div> </div> <su-popup-content> <div class="header">User Rating</div> <div class="content"> <div class="ui star rating"> <i class="active icon"></i> <i class="active icon"></i> <i class="active icon"></i> <i class="icon"></i> <i class="icon"></i> </div> </div> </su-popup-content> </su-popup> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-popup class=&quot;ui card&quot;&gt;\n  &lt;div class=&quot;content&quot;&gt;\n    &lt;div class=&quot;header&quot;&gt;My Neighbor Totoro&lt;/div&gt;\n    &lt;div class=&quot;description&quot;&gt;\n      Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding\n      trees are inhabited by magical spirits.\n    &lt;/div&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;ui two bottom attached buttons&quot;&gt;\n    &lt;div class=&quot;ui button&quot;&gt;\n      &lt;i class=&quot;add icon&quot;&gt;&lt;/i&gt;\n      Queue\n    &lt;/div&gt;\n    &lt;div class=&quot;ui primary button&quot;&gt;\n      &lt;i class=&quot;play icon&quot;&gt;&lt;/i&gt;\n      Watch\n    &lt;/div&gt;\n  &lt;/div&gt;\n\n  &lt;su-popup-content&gt;\n    &lt;div class=&quot;header&quot;&gt;User Rating&lt;/div&gt;\n    &lt;div class=&quot;content&quot;&gt;\n      &lt;div class=&quot;ui star rating&quot;&gt;\n        &lt;i class=&quot;active icon&quot;&gt;&lt;/i&gt;\n        &lt;i class=&quot;active icon&quot;&gt;&lt;/i&gt;\n        &lt;i class=&quot;active icon&quot;&gt;&lt;/i&gt;\n        &lt;i class=&quot;icon&quot;&gt;&lt;/i&gt;\n        &lt;i class=&quot;icon&quot;&gt;&lt;/i&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/su-popup-content&gt;\n&lt;/su-popup&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">Variations<a class="anchor" id="variations"></a></h2> <h3 class="ui header">Width</h3> <p>A popup can be extra wide to allow for longer content</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-popup tooltip="Hello. This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide." data-variation="wide"> <i class="circular heart icon link"></i> </su-popup> <su-popup tooltip="Hello. This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide." data-variation="very wide"> <i class="circular heart icon link"></i> </su-popup> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-popup tooltip=&quot;Hello. This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide.&quot;\n  data-variation=&quot;wide&quot;&gt;\n  &lt;i class=&quot;circular heart icon link&quot;&gt;&lt;/i&gt;\n&lt;/su-popup&gt;\n&lt;su-popup tooltip=&quot;Hello. This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide.&quot;\n  data-variation=&quot;very wide&quot;&gt;\n  &lt;i class=&quot;circular heart icon link&quot;&gt;&lt;/i&gt;\n&lt;/su-popup&gt;\n</code></pre> </div> </section> <h3 class="ui header">Size</h3> <p>A popup can vary in size</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-popup tooltip="Hello. This is a mini popup" data-variation="mini"> <i class="circular heart icon link"></i> </su-popup> <su-popup tooltip="Hello. This is a mini popup" data-variation="tiny"> <i class="circular heart icon link"></i> </su-popup> <su-popup tooltip="Hello. This is a mini popup" data-variation="small"> <i class="circular heart icon link"></i> </su-popup> <su-popup tooltip="Hello. This is a mini popup" data-variation="large"> <i class="circular heart icon link"></i> </su-popup> <su-popup tooltip="Hello. This is a mini popup" data-variation="huge"> <i class="circular heart icon link"></i> </su-popup> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-popup tooltip=&quot;Hello. This is a mini popup&quot; data-variation=&quot;mini&quot;&gt;\n  &lt;i class=&quot;circular heart icon link&quot;&gt;&lt;/i&gt;\n&lt;/su-popup&gt;\n&lt;su-popup tooltip=&quot;Hello. This is a mini popup&quot; data-variation=&quot;tiny&quot;&gt;\n  &lt;i class=&quot;circular heart icon link&quot;&gt;&lt;/i&gt;\n&lt;/su-popup&gt;\n&lt;su-popup tooltip=&quot;Hello. This is a mini popup&quot; data-variation=&quot;small&quot;&gt;\n  &lt;i class=&quot;circular heart icon link&quot;&gt;&lt;/i&gt;\n&lt;/su-popup&gt;\n&lt;su-popup tooltip=&quot;Hello. This is a mini popup&quot; data-variation=&quot;large&quot;&gt;\n  &lt;i class=&quot;circular heart icon link&quot;&gt;&lt;/i&gt;\n&lt;/su-popup&gt;\n&lt;su-popup tooltip=&quot;Hello. This is a mini popup&quot; data-variation=&quot;huge&quot;&gt;\n  &lt;i class=&quot;circular heart icon link&quot;&gt;&lt;/i&gt;\n&lt;/su-popup&gt;\n</code></pre> </div> </section> <h3 class="ui header">Inverted</h3> <p>A popup can have its colors inverted</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-popup tooltip="Hello. This is a mini popup" data-variation="inverted"> <i class="circular heart icon link"></i> </su-popup> <su-popup class="ui icon button" tooltip="Hello. This is an inverted popup" data-variation="inverted"> <i class="add icon"></i> </su-popup> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-popup tooltip=&quot;Hello. This is a mini popup&quot; data-variation=&quot;inverted&quot;&gt;\n  &lt;i class=&quot;circular heart icon link&quot;&gt;&lt;/i&gt;\n&lt;/su-popup&gt;\n&lt;su-popup class=&quot;ui icon button&quot; tooltip=&quot;Hello. This is an inverted popup&quot; data-variation=&quot;inverted&quot;&gt;\n  &lt;i class=&quot;add icon&quot;&gt;&lt;/i&gt;\n&lt;/su-popup&gt;\n</code></pre> </div> </section>', '', '', function (opts) {
  'use strict';

  this.toggleExample = function (event) {
    global.toggleExample(event.target);
  };

  this.on('mount', function () {
    PR.prettyPrint(false);
  });
});
riot.tag2('demo-radio', '<h1 class="ui header"> Radio <div class="sub header">A checkbox allows a user to select a value from a small set of options, often binary</div> </h1> <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2> <h3 class="ui header">Standard</h3> <p>A standard radio.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-radio-group> <su-radio value="1">Radio choice1</su-radio> <su-radio value="2">Radio choice2</su-radio> </su-radio-group> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-radio-group&gt;\n  &lt;su-radio value=&quot;1&quot;&gt;Radio choice1&lt;/su-radio&gt;\n  &lt;su-radio value=&quot;2&quot;&gt;Radio choice2&lt;/su-radio&gt;\n&lt;/su-radio-group&gt;\n</code></pre> </div> </section> <h3 class="ui header">Slider</h3> <p>A radio can be formatted to emphasize the current selection state</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <div class="ui form"> <su-radio-group class="grouped fields"> <label>Outbound Throughput</label> <div class="field"> <su-radio class="slider" value="20">20mbps max</su-radio> </div> <div class="field"> <su-radio class="slider" value="10">10mbps max</su-radio> </div> <div class="field"> <su-radio class="slider" value="5">5mbps max</su-radio> </div> <div class="field"> <su-radio class="slider" value="Unmetered">Unmetered</su-radio> </div> </su-radio-group> </div> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;div class=&quot;ui form&quot;&gt;\n  &lt;su-radio-group class=&quot;grouped fields&quot;&gt;\n    &lt;label&gt;Outbound Throughput&lt;/label&gt;\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;su-radio class=&quot;slider&quot; value=&quot;20&quot;&gt;20mbps max&lt;/su-radio&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;su-radio class=&quot;slider&quot; value=&quot;10&quot;&gt;10mbps max&lt;/su-radio&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;su-radio class=&quot;slider&quot; value=&quot;5&quot;&gt;5mbps max&lt;/su-radio&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;su-radio class=&quot;slider&quot; value=&quot;Unmetered&quot;&gt;Unmetered&lt;/su-radio&gt;\n    &lt;/div&gt;\n  &lt;/su-radio-group&gt;\n&lt;/div&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">States<a class="anchor" id="states"></a></h2> <h3 class="ui header">Read-only</h3> <p>A radio can be read-only and unable to change states</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-radio-group> <su-radio class="read-only"> Read Only </su-radio> </su-radio-group> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-radio-group&gt;\n  &lt;su-radio class=&quot;read-only&quot;&gt;\n    Read Only\n  &lt;/su-radio&gt;\n&lt;/su-radio-group&gt;\n</code></pre> </div> </section> <h3 class="ui header">Checked</h3> <p>A radio can be checked</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-radio-group value="true"> <su-radio value="true">Active</su-radio> <su-radio value="false">None Active</su-radio> </su-radio-group> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-radio-group value=&quot;true&quot;&gt;\n  &lt;su-radio value=&quot;true&quot;&gt;Active&lt;/su-radio&gt;\n  &lt;su-radio value=&quot;false&quot;&gt;None Active&lt;/su-radio&gt;\n&lt;/su-radio-group&gt;\n</code></pre> </div> </section> <h3 class="ui header">Disabled</h3> <p>A radio can be read-only and unable to change states</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-radio class="disabled"> Disabled </su-radio> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-radio class=&quot;disabled&quot;&gt;\n  Disabled\n&lt;/su-radio&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">Update label<a class="anchor" id="label"></a></h2> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-radio label="{radio_label}"></su-radio> <div style="margin-top:1em"> <button type="button" click="{changeLabel}" class="ui button">Change label</button> </div> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-radio label=&quot;\\{ radio_label \\}&quot; /&gt;\n&lt;button type=&quot;button&quot; click=&quot;\\{ changeLabel \\}&quot; class=&quot;ui button&quot;&gt;Change label&lt;/button&gt;\n\n&lt;script&gt;\n  this.radio_label = &apos;change&apos;\n  this.changeLabel = () =&gt; \\{\n    this.radio_label = (this.radio_label === &apos;change&apos;) ? &apos;changed&apos; : &apos;change&apos;\n  \\}\n&lt;/script&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">Access elements<a class="anchor" id="access"></a></h2> <p>Access to radio with ref attribute</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-radio-group ref="radio1" riot-value="{radio1}"> <su-radio value="1">Radio choice1</su-radio> <su-radio value="2">Radio choice2</su-radio> </su-radio-group> <div class="ui message"> <div class="header"> Checked from refs </div> <p>Radio choice{refs.radio1.value}</p> </div> <button type="button" click="{setValue.bind(this, 1)}" class="ui button">Choice1</button> <button type="button" click="{setValue.bind(this, 2)}" class="ui button">Choice2</button> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-radio-group ref=&quot;radio1&quot; value=&quot;\\{ radio1 \\}&quot;&gt;\n  &lt;su-radio value=&quot;1&quot;&gt;Radio choice1&lt;/su-radio&gt;\n  &lt;su-radio value=&quot;2&quot;&gt;Radio choice2&lt;/su-radio&gt;\n&lt;/su-radio-group&gt;\n\n&lt;div class=&quot;ui message&quot;&gt;\n  &lt;div class=&quot;header&quot;&gt;\n    Checked from refs\n  &lt;/div&gt;\n  &lt;p&gt;Radio choice\\{ refs.radio1.value\\}&lt;/p&gt;\n&lt;/div&gt;\n\n&lt;button type=&quot;button&quot; click=&quot;\\{ setValue.bind(this, 1) \\}&quot; class=&quot;ui button&quot;&gt;Choice1&lt;/button&gt;\n&lt;button type=&quot;button&quot; click=&quot;\\{ setValue.bind(this, 2) \\}&quot; class=&quot;ui button&quot;&gt;Choice2&lt;/button&gt;\n\n&lt;script&gt;\n  this.on(&apos;mount&apos;, () =&gt; \\{\n    this.refs.radio1.on(&apos;change&apos;, value =&gt; \\{\n      this.update(\\{ radio1: value \\})\n    \\})\n  \\})\n  this.radio1 = 1\n  this.setValue = value =&gt; \\{\n    this.radio1 = value\n  \\}\n&lt;/script&gt;\n</code></pre> </div> </section>', '', '', function (opts) {
  'use strict';

  var _this = this;

  this.toggleExample = function (event) {
    global.toggleExample(event.target);
  };

  this.radio1 = 1;
  this.setValue = function (value) {
    _this.radio1 = value;
  };

  this.radio_label = 'change';
  this.changeLabel = function () {
    _this.radio_label = _this.radio_label === 'change' ? 'changed' : 'change';
  };

  this.on('mount', function () {
    _this.refs.radio1.on('change', function (value) {
      _this.update({ radio1: value });
    });
    PR.prettyPrint(false);
  });
});
riot.tag2('demo-tab', '<h1 class="ui header"> Tab <div class="sub header">A tab is a hidden section of content activated by a menu</div> </h1> <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2> <h3 class="ui header">Basic</h3> <p>A basic tab.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="three column item"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;three column item&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <h3 class="ui header">Secondary Menu</h3> <p>A menu can adjust its appearance to de-emphasize its contents.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="secondary"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;secondary&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <h3 class="ui header">Pointing</h3> <p>A menu can point to show its relationship to nearby content.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="pointing"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;pointing&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="secondary pointing"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;secondary pointing&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <h3 class="ui header">Attached</h3> <p>A menu can be formatted to show tabs of information.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="top attached"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;top attached&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="bottom attached"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;bottom attached&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <h3 class="ui header">Tabular</h3> <p>A menu can be formatted to show tabs of information.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="top tabular"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;top tabular&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="bottom tabular"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;bottom tabular&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="left tabular"> <div class="ui grid"> <div class="four wide column"> <su-tab-header> <su-tab-title>Home</su-tab-title> <su-tab-title>Messages</su-tab-title> <su-tab-title>Friends</su-tab-title> </su-tab-header> </div> <div class="twelve wide stretched column"> <su-tab>Home content</su-tab> <su-tab>Messages content</su-tab> <su-tab>Friends content</su-tab> </div> </div> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;left tabular&quot;&gt;\n  &lt;div class=&quot;ui grid&quot;&gt;\n    &lt;div class=&quot;four wide column&quot;&gt;\n      &lt;su-tab-header&gt;\n        &lt;su-tab-title&gt;Home&lt;/su-tab-title&gt;\n        &lt;su-tab-title&gt;Messages&lt;/su-tab-title&gt;\n        &lt;su-tab-title&gt;Friends&lt;/su-tab-title&gt;\n      &lt;/su-tab-header&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;twelve wide stretched column&quot;&gt;\n      &lt;su-tab&gt;Home content&lt;/su-tab&gt;\n      &lt;su-tab&gt;Messages content&lt;/su-tab&gt;\n      &lt;su-tab&gt;Friends content&lt;/su-tab&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="right tabular"> <div class="ui grid"> <div class="twelve wide stretched column"> <su-tab>Home content</su-tab> <su-tab>Messages content</su-tab> <su-tab>Friends content</su-tab> </div> <div class="four wide column"> <su-tab-header> <su-tab-title>Home</su-tab-title> <su-tab-title>Messages</su-tab-title> <su-tab-title>Friends</su-tab-title> </su-tab-header> </div> </div> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;right tabular&quot;&gt;\n  &lt;div class=&quot;ui grid&quot;&gt;\n    &lt;div class=&quot;twelve wide stretched column&quot;&gt;\n      &lt;su-tab&gt;Home content&lt;/su-tab&gt;\n      &lt;su-tab&gt;Messages content&lt;/su-tab&gt;\n      &lt;su-tab&gt;Friends content&lt;/su-tab&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;four wide column&quot;&gt;\n      &lt;su-tab-header&gt;\n        &lt;su-tab-title&gt;Home&lt;/su-tab-title&gt;\n        &lt;su-tab-title&gt;Messages&lt;/su-tab-title&gt;\n        &lt;su-tab-title&gt;Friends&lt;/su-tab-title&gt;\n      &lt;/su-tab-header&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">States<a class="anchor" id="states"></a></h2> <h3 class="ui header">Active</h3> <p>A menu item can be active.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="three column item"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages" active="true">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;three column item&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot; active=&quot;true&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">Variations<a class="anchor" id="variations"></a></h2> <h3 class="ui header">Inverted</h3> <p>A menu may have its colors inverted to show greater contrast.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="inverted"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;inverted&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <h3 class="ui header">Colored</h3> <p>Additional colors can be specified.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset> <su-tab title="red" title-class="red" class="red segment">Red</su-tab> <su-tab title="orange" title-class="orange" class="orange segment">Orange</su-tab> <su-tab title="yellow" title-class="yellow" class="yellow segment">Yellow</su-tab> <su-tab title="olive" title-class="olive" class="olive segment">Olive</su-tab> <su-tab title="green" title-class="green" class="green segment">Green</su-tab> <su-tab title="teal" title-class="teal" class="teal segment">Teal</su-tab> <su-tab title="blue" title-class="blue" class="blue segment">Blue</su-tab> <su-tab title="violet" title-class="violet" class="violet segment">Violet</su-tab> <su-tab title="purple" title-class="purple" class="purple segment">Purple</su-tab> <su-tab title="pink" title-class="pink" class="pink segment">Pink</su-tab> <su-tab title="brown" title-class="brown" class="brown segment">Brown</su-tab> <su-tab title="grey" title-class="grey" class="grey segment">Grey</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset&gt;\n  &lt;su-tab title=&quot;red&quot; title-class=&quot;red&quot; class=&quot;red segment&quot;&gt;Red&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;orange&quot; title-class=&quot;orange&quot; class=&quot;orange segment&quot;&gt;Orange&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;yellow&quot; title-class=&quot;yellow&quot; class=&quot;yellow segment&quot;&gt;Yellow&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;olive&quot; title-class=&quot;olive&quot; class=&quot;olive segment&quot;&gt;Olive&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;green&quot; title-class=&quot;green&quot; class=&quot;green segment&quot;&gt;Green&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;teal&quot; title-class=&quot;teal&quot; class=&quot;teal segment&quot;&gt;Teal&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;blue&quot; title-class=&quot;blue&quot; class=&quot;blue segment&quot;&gt;Blue&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;violet&quot; title-class=&quot;violet&quot; class=&quot;violet segment&quot;&gt;Violet&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;purple&quot; title-class=&quot;purple&quot; class=&quot;purple segment&quot;&gt;Purple&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;pink&quot; title-class=&quot;pink&quot; class=&quot;pink segment&quot;&gt;Pink&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;brown&quot; title-class=&quot;brown&quot; class=&quot;brown segment&quot;&gt;Brown&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;grey&quot; title-class=&quot;grey&quot; class=&quot;grey segment&quot;&gt;Grey&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="red"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;red&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="red"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;red&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <p>These colors can also be inverted.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="inverted"> <su-tab title="red" title-class="red" class="red segment inverted">Red</su-tab> <su-tab title="orange" title-class="orange" class="orange segment inverted">Orange</su-tab> <su-tab title="yellow" title-class="yellow" class="yellow segment inverted">Yellow</su-tab> <su-tab title="olive" title-class="olive" class="olive segment inverted">Olive</su-tab> <su-tab title="green" title-class="green" class="green segment inverted">Green</su-tab> <su-tab title="teal" title-class="teal" class="teal segment inverted">Teal</su-tab> <su-tab title="blue" title-class="blue" class="blue segment inverted">Blue</su-tab> <su-tab title="violet" title-class="violet" class="violet segment inverted">Violet</su-tab> <su-tab title="purple" title-class="purple" class="purple segment inverted">Purple</su-tab> <su-tab title="pink" title-class="pink" class="pink segment inverted">Pink</su-tab> <su-tab title="brown" title-class="brown" class="brown segment inverted">Brown</su-tab> <su-tab title="grey" title-class="grey" class="grey segment inverted">Grey</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;inverted&quot;&gt;\n  &lt;su-tab title=&quot;red&quot; title-class=&quot;red&quot; class=&quot;red segment inverted&quot;&gt;Red&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;orange&quot; title-class=&quot;orange&quot; class=&quot;orange segment inverted&quot;&gt;Orange&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;yellow&quot; title-class=&quot;yellow&quot; class=&quot;yellow segment inverted&quot;&gt;Yellow&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;olive&quot; title-class=&quot;olive&quot; class=&quot;olive segment inverted&quot;&gt;Olive&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;green&quot; title-class=&quot;green&quot; class=&quot;green segment inverted&quot;&gt;Green&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;teal&quot; title-class=&quot;teal&quot; class=&quot;teal segment inverted&quot;&gt;Teal&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;blue&quot; title-class=&quot;blue&quot; class=&quot;blue segment inverted&quot;&gt;Blue&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;violet&quot; title-class=&quot;violet&quot; class=&quot;violet segment inverted&quot;&gt;Violet&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;purple&quot; title-class=&quot;purple&quot; class=&quot;purple segment inverted&quot;&gt;Purple&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;pink&quot; title-class=&quot;pink&quot; class=&quot;pink segment inverted&quot;&gt;Pink&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;brown&quot; title-class=&quot;brown&quot; class=&quot;brown segment inverted&quot;&gt;Brown&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;grey&quot; title-class=&quot;grey&quot; class=&quot;grey segment inverted&quot;&gt;Grey&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="red inverted"> <su-tab title="Home">Home content</su-tab> <su-tab title="Messages">Messages content</su-tab> <su-tab title="Friends">Friends content</su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;red inverted&quot;&gt;\n  &lt;su-tab title=&quot;Home&quot;&gt;Home content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Messages&quot;&gt;Messages content&lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Friends&quot;&gt;Friends content&lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section> <h2 class="ui dividing header">Multiple<a class="anchor" id="multiple"></a></h2> <h3 class="ui header">Multiple Tab Groups</h3> <p>There are a several of ways to include independent tab groups on the same page, even with history. One of the easiest ways is provide a specific parent context for each tab group.</p> <section> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample}"></i> </div> <div class="ui segment bottom attached"> <su-tabset class="secondary"> <su-tab title="First"> <su-tabset class="top tabular"> <su-tab title="1A">1A</su-tab> <su-tab title="1B" active="true">1B</su-tab> <su-tab title="1C">1C</su-tab> </su-tabset> </su-tab> <su-tab title="Second"> <su-tabset class="top tabular"> <su-tab title="2A">2A</su-tab> <su-tab title="2B">2B</su-tab> <su-tab title="2C">2C</su-tab> </su-tabset> </su-tab> <su-tab title="Third"> <su-tabset class="top tabular"> <su-tab title="3A">3A</su-tab> <su-tab title="3B">3B</su-tab> <su-tab title="3C">3C</su-tab> </su-tabset> </su-tab> </su-tabset> </div> <div class="ui segment bottom attached inverted transition hidden"> <pre><code class="prettyprint">&lt;su-tabset class=&quot;secondary&quot;&gt;\n  &lt;su-tab title=&quot;First&quot;&gt;\n    &lt;su-tabset class=&quot;top tabular&quot;&gt;\n      &lt;su-tab title=&quot;1A&quot;&gt;1A&lt;/su-tab&gt;\n      &lt;su-tab title=&quot;1B&quot; active=&quot;true&quot;&gt;1B&lt;/su-tab&gt;\n      &lt;su-tab title=&quot;1C&quot;&gt;1C&lt;/su-tab&gt;\n    &lt;/su-tabset&gt;\n  &lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Second&quot;&gt;\n    &lt;su-tabset class=&quot;top tabular&quot;&gt;\n      &lt;su-tab title=&quot;2A&quot;&gt;2A&lt;/su-tab&gt;\n      &lt;su-tab title=&quot;2B&quot;&gt;2B&lt;/su-tab&gt;\n      &lt;su-tab title=&quot;2C&quot;&gt;2C&lt;/su-tab&gt;\n    &lt;/su-tabset&gt;\n  &lt;/su-tab&gt;\n  &lt;su-tab title=&quot;Third&quot;&gt;\n    &lt;su-tabset class=&quot;top tabular&quot;&gt;\n      &lt;su-tab title=&quot;3A&quot;&gt;3A&lt;/su-tab&gt;\n      &lt;su-tab title=&quot;3B&quot;&gt;3B&lt;/su-tab&gt;\n      &lt;su-tab title=&quot;3C&quot;&gt;3C&lt;/su-tab&gt;\n    &lt;/su-tabset&gt;\n  &lt;/su-tab&gt;\n&lt;/su-tabset&gt;\n</code></pre> </div> </section>', '', '', function (opts) {
  'use strict';

  this.toggleExample = function (event) {
    global.toggleExample(event.target);
  };

  this.on('mount', function () {
    PR.prettyPrint(false);
  });
});
riot.tag2('root', '<h1 class="ui header"> Semantic UI Riot <div class="sub header">Semantic-UI-Riot integration.</div> </h1> <h2 class="ui dividing header" id="introduction">Introduction</h2> <p> Semantic UI Riot is Riot integration for <a href="https://semantic-ui.com/">Semantic UI</a>. </p>', '', '', function (opts) {});
riot.tag2('navigation', '<div class="ui inverted vertical left fixed menu"> <div class="item"> <strong>Semantic UI Riot <small><em>{version}</em></small> </strong> </div> <div class="item"> <div class="header">Getting Started</div> <div class="menu"> <a class="item" href="#">Introduction</a> <a href="https://github.com/black-trooper/semantic-ui-riot" class="item"> <i aria-hidden="true" class="github icon"></i> GitHub </a> </div> </div> <div class="item"> <div class="header">Module</div> <div class="menu"> <a class="item" href="#demo-checkbox">Checkbox</a> <a class="item" href="#demo-dropdown">Dropdown</a> <a class="item" href="#demo-modal">Modal</a> <a class="item" href="#demo-popup">Popup</a> <a class="item" href="#demo-radio">Radio</a> <a class="item" href="#demo-tab">Tab</a> </div> </div> <div class="item"> <div class="header">Module(Unimplemented)</div> <div class="menu"> <span class="item">Datepicker</span> </div> </div> </div>', '', '', function (opts) {
  'use strict';

  this.version = require('../package.json').version;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../package.json":2}],2:[function(require,module,exports){
module.exports={
  "name": "semantic-ui-riot",
  "version": "0.3.0",
  "description": "Semantic UI for Riot",
  "main": "dist/semantic-ui-riot.min.js",
  "files": [
    "dist"
  ],
  "scripts": {
    "start": "gulp",
    "test": "karma start"
  },
  "keywords": [
    "riotjs",
    "riot",
    "semantic",
    "semanticui"
  ],
  "author": {
    "name": "black-trooper",
    "url": "https://github.com/black-trooper/semantic-ui-riot/"
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/black-trooper/semantic-ui-riot/issues"
  },
  "dependencies": {
    "riot": "^3.6.1"
  },
  "devDependencies": {
    "babel": "^6.23.0",
    "babel-core": "^6.25.0",
    "babel-preset-es2015-riot": "^1.1.0",
    "babelify": "^7.3.0",
    "browserify": "^14.4.0",
    "chai": "^4.1.2",
    "eslint-plugin-html": "^3.1.1",
    "gulp": "^3.9.1",
    "gulp-babel": "^7.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-eslint": "^4.0.0",
    "gulp-htmlhint": "^0.3.1",
    "gulp-natural-sort": "^0.1.1",
    "gulp-plumber": "^1.1.0",
    "gulp-rename": "^1.2.2",
    "gulp-riot": "^1.1.1",
    "gulp-uglify": "^3.0.0",
    "gulp-webserver-fast": "^0.9.1",
    "jquery": "2.2.2",
    "karma": "^1.7.1",
    "karma-babel-preprocessor": "^7.0.0",
    "karma-browserify": "^5.1.2",
    "karma-chrome-launcher": "^2.2.0",
    "karma-coverage": "^1.1.1",
    "karma-coveralls": "^1.1.2",
    "karma-mocha": "^1.3.0",
    "karma-mocha-reporter": "^2.2.4",
    "karma-riot": "^2.0.0",
    "karma-sinon-chai": "^1.3.2",
    "map-stream": "0.0.7",
    "mocha": "^4.0.1",
    "riot-route": "^3.1.1",
    "run-sequence": "^2.0.0",
    "sinon": "^2.1.0",
    "sinon-chai": "^2.13.0",
    "uglify-js": "^3.0.25",
    "vinyl-source-stream": "^1.1.0"
  }
}

},{}]},{},[1]);

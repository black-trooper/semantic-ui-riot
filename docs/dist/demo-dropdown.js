riot.tag2('demo-dropdown', '<h1 class="ui header"> Dropdown <div class="sub header">A dropdown allows a user to select a value from a series of options</div> </h1> <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2> <h3 class="ui header">Selection</h3> <p>A dropdown can be used to select between choices in a form</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 0)}"></i> </div> <div class="ui segment {bottom: !example[0]} attached"> <su-dropdown items="{dropdownItems}" ref="dropdown1"></su-dropdown> <span class="ui tag label {teal: refs.dropdown1.value}"> {refs.dropdown1.value} {refs.dropdown1.label} </span> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[0]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#39;Gender&#39;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#39;Male&#39;,\n      value: 1\n    \\},\n    \\{\n      label: &#39;Female&#39;,\n      value: 2\n    \\},\n  ]\n&lt;/script&gt;\n</code></pre> </div> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 8)}"></i> </div> <div class="ui segment {bottom: !example[8]} attached"> <su-dropdown items="{dropdownItems9}" class="fluid"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[8]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; class=&quot;fluid&quot; &gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#39;Select Friend&#39;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#39;Jenny Hess&#39;,\n      image: &#39;/images/avatar/small/jenny.jpg&#39;,\n      value: &#39;jenny&#39;\n    \\},\n    \\{\n      label: &#39;Elliot Fu&#39;,\n      image: &#39;/images/avatar/small/elliot.jpg&#39;,\n      value: &#39;elliot&#39;\n    \\},\n    \\{\n      label: &#39;Stevie Feliciano&#39;,\n      image: &#39;/images/avatar/small/stevie.jpg&#39;,\n      value: &#39;stevie&#39;\n    \\},\n    \\{\n      label: &#39;Christian&#39;,\n      image: &#39;/images/avatar/small/christian.jpg&#39;,\n      value: &#39;christian&#39;\n    \\},\n    \\{\n      label: &#39;Matt&#39;,\n      image: &#39;/images/avatar/small/matt.jpg&#39;,\n      value: &#39;matt&#39;\n    \\},\n    \\{\n      label: &#39;Justen Kitsune&#39;,\n      image: &#39;/images/avatar/small/justen.jpg&#39;,\n      value: &#39;justen&#39;\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> <h3 class="ui header">Search Selection</h3> <p>A selection dropdown can allow a user to search through a large list of choices.</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 1)}"></i> </div> <div class="ui segment {bottom: !example[1]} attached"> <su-dropdown items="{dropdownItems2}" search="true" ref="dropdown2"></su-dropdown> <span class="ui tag label {teal: refs.dropdown2.value}"> {refs.dropdown2.value} {refs.dropdown2.label} </span> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[1]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; search=&quot;true&quot; ref=&quot;dropdown2&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;!-- dropdown state example --&gt;\n&lt;span class=&quot;ui tag label \\{teal: refs.dropdown2.value \\}&quot;&gt;\n  \\{ refs.dropdown2.value \\}\n  \\{ refs.dropdown2.label \\}\n&lt;/span&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#39;State&#39;,\n      value: null,\n      default: true\n    \\},\n    \\{ value: &#39;AL&#39;, label: &#39;Alabama&#39; \\},\n    \\{ value: &#39;AK&#39;, label: &#39;Alaska&#39; \\},\n    \\{ value: &#39;AZ&#39;, label: &#39;Arizona&#39; \\},\n    \\{ value: &#39;AR&#39;, label: &#39;Arkansas&#39; \\},\n    \\{ value: &#39;CA&#39;, label: &#39;California&#39; \\},\n    \\{ value: &#39;CO&#39;, label: &#39;Colorado&#39; \\},\n    \\{ value: &#39;CT&#39;, label: &#39;Connecticut&#39; \\},\n    \\{ value: &#39;DE&#39;, label: &#39;Delaware&#39; \\},\n    \\{ value: &#39;DC&#39;, label: &#39;District Of Columbia&#39; \\},\n    \\{ value: &#39;FL&#39;, label: &#39;Florida&#39; \\},\n    \\{ value: &#39;GA&#39;, label: &#39;Georgia&#39; \\},\n    \\{ value: &#39;HI&#39;, label: &#39;Hawaii&#39; \\},\n    \\{ value: &#39;ID&#39;, label: &#39;Idaho&#39; \\},\n    \\{ value: &#39;IL&#39;, label: &#39;Illinois&#39; \\},\n    \\{ value: &#39;IN&#39;, label: &#39;Indiana&#39; \\},\n    \\{ value: &#39;IA&#39;, label: &#39;Iowa&#39; \\},\n    \\{ value: &#39;KS&#39;, label: &#39;Kansas&#39; \\},\n    \\{ value: &#39;KY&#39;, label: &#39;Kentucky&#39; \\},\n    \\{ value: &#39;LA&#39;, label: &#39;Louisiana&#39; \\},\n    \\{ value: &#39;ME&#39;, label: &#39;Maine&#39; \\},\n    \\{ value: &#39;MD&#39;, label: &#39;Maryland&#39; \\},\n    \\{ value: &#39;MA&#39;, label: &#39;Massachusetts&#39; \\},\n    \\{ value: &#39;MI&#39;, label: &#39;Michigan&#39; \\},\n    \\{ value: &#39;MN&#39;, label: &#39;Minnesota&#39; \\},\n    \\{ value: &#39;MS&#39;, label: &#39;Mississippi&#39; \\},\n    \\{ value: &#39;MO&#39;, label: &#39;Missouri&#39; \\},\n    \\{ value: &#39;MT&#39;, label: &#39;Montana&#39; \\},\n    \\{ value: &#39;NE&#39;, label: &#39;Nebraska&#39; \\},\n    \\{ value: &#39;NV&#39;, label: &#39;Nevada&#39; \\},\n    \\{ value: &#39;NH&#39;, label: &#39;New Hampshire&#39; \\},\n    \\{ value: &#39;NJ&#39;, label: &#39;New Jersey&#39; \\},\n    \\{ value: &#39;NM&#39;, label: &#39;New Mexico&#39; \\},\n    \\{ value: &#39;NY&#39;, label: &#39;New York&#39; \\},\n    \\{ value: &#39;NC&#39;, label: &#39;North Carolina&#39; \\},\n    \\{ value: &#39;ND&#39;, label: &#39;North Dakota&#39; \\},\n    \\{ value: &#39;OH&#39;, label: &#39;Ohio&#39; \\},\n    \\{ value: &#39;OK&#39;, label: &#39;Oklahoma&#39; \\},\n    \\{ value: &#39;OR&#39;, label: &#39;Oregon&#39; \\},\n    \\{ value: &#39;PA&#39;, label: &#39;Pennsylvania&#39; \\},\n    \\{ value: &#39;RI&#39;, label: &#39;Rhode Island&#39; \\},\n    \\{ value: &#39;SC&#39;, label: &#39;South Carolina&#39; \\},\n    \\{ value: &#39;SD&#39;, label: &#39;South Dakota&#39; \\},\n    \\{ value: &#39;TN&#39;, label: &#39;Tennessee&#39; \\},\n    \\{ value: &#39;TX&#39;, label: &#39;Texas&#39; \\},\n    \\{ value: &#39;UT&#39;, label: &#39;Utah&#39; \\},\n    \\{ value: &#39;VT&#39;, label: &#39;Vermont&#39; \\},\n    \\{ value: &#39;VA&#39;, label: &#39;Virginia&#39; \\},\n    \\{ value: &#39;WA&#39;, label: &#39;Washington&#39; \\},\n    \\{ value: &#39;WV&#39;, label: &#39;West Virginia&#39; \\},\n    \\{ value: &#39;WI&#39;, label: &#39;Wisconsin&#39; \\},\n    \\{ value: &#39;WY&#39;, label: &#39;Wyoming&#39; \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> <h3 class="ui header">Multiple Selection</h3> <p>A selection dropdown can allow multiple selections</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 7)}"></i> </div> <div class="ui segment {bottom: !example[7]} attached"> <su-dropdown items="{dropdownItems8}" multiple="true"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[7]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; multiple=&quot;true&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#39;Skills&#39;,\n      value: null,\n      default: true\n    \\},\n    \\{ value: &#39;angular&#39;, label: &#39;Angular&#39; \\},\n    \\{ value: &#39;css&#39;, label: &#39;CSS&#39; \\},\n    \\{ value: &#39;design&#39;, label: &#39;Graphic Design&#39; \\},\n    \\{ value: &#39;ember&#39;, label: &#39;Ember&#39; \\},\n    \\{ value: &#39;html&#39;, label: &#39;HTML&#39; \\},\n    \\{ value: &#39;ia&#39;, label: &#39;Information Architecture&#39; \\},\n    \\{ value: &#39;javascript&#39;, label: &#39;Javascript&#39; \\},\n    \\{ value: &#39;mech&#39;, label: &#39;Mechanical Engineering&#39; \\},\n    \\{ value: &#39;meteor&#39;, label: &#39;Meteor&#39; \\},\n    \\{ value: &#39;node&#39;, label: &#39;NodeJS&#39; \\},\n    \\{ value: &#39;plumbing&#39;, label: &#39;Plumbing&#39; \\},\n    \\{ value: &#39;python&#39;, label: &#39;Python&#39; \\},\n    \\{ value: &#39;rails&#39;, label: &#39;Rails&#39; \\},\n    \\{ value: &#39;react&#39;, label: &#39;React&#39; \\},\n    \\{ value: &#39;repair&#39;, label: &#39;Kitchen Repair&#39; \\},\n    \\{ value: &#39;ruby&#39;, label: &#39;Ruby&#39; \\},\n    \\{ value: &#39;ui&#39;, label: &#39;UI Design&#39; \\},\n    \\{ value: &#39;ux&#39;, label: &#39;User Experience&#39; \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> <h2 class="ui dividing header">Content<a class="anchor" id="content"></a></h2> <h3 class="ui header">Header</h3> <p>A dropdown menu can contain a header</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 2)}"></i> </div> <div class="ui segment {bottom: !example[2]} attached"> <su-dropdown items="{dropdownItems3}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[2]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#39;Filter&#39;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#39;Filter by tag&#39;,\n      icon: &#39;tags&#39;,\n      header: true\n    \\},\n    \\{\n      label: &#39;Important&#39;,\n      value: 1\n    \\},\n    \\{\n      label: &#39;Announcement&#39;,\n      value: 2\n    \\},\n    \\{\n      label: &#39;Discussion&#39;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> <h3 class="ui header">Divider</h3> <p>A dropdown menu can contain dividers to separate related content</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 3)}"></i> </div> <div class="ui segment {bottom: !example[3]} attached"> <su-dropdown items="{dropdownItems4}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[3]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#39;Filter&#39;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#39;Filter by tag&#39;,\n      icon: &#39;tags&#39;,\n      header: true\n    \\},\n    \\{\n      divider: true\n    \\},\n    \\{\n      label: &#39;Important&#39;,\n      value: 1\n    \\},\n    \\{\n      label: &#39;Announcement&#39;,\n      value: 2\n    \\},\n    \\{\n      label: &#39;Discussion&#39;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> <h3 class="ui header">Icon</h3> <p>A dropdown menu can contain an <a href="https://semantic-ui.com/elements/icon.html">icon</a>.</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 4)}"></i> </div> <div class="ui segment {bottom: !example[4]} attached"> <su-dropdown items="{dropdownItems5}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[4]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#39;Filter&#39;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#39;Filter by tag&#39;,\n      icon: &#39;tags&#39;,\n      header: true\n    \\},\n    \\{\n      divider: true\n    \\},\n    \\{\n      label: &#39;Important&#39;,\n      icon: &#39;attention&#39;,\n      value: 1\n    \\},\n    \\{\n      label: &#39;Announcement&#39;,\n      icon: &#39;comment&#39;,\n      value: 2\n    \\},\n    \\{\n      label: &#39;Discussion&#39;,\n      icon: &#39;conversation&#39;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> <h3 class="ui header">Description</h3> <p>A dropdown menu can contain a description.</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 5)}"></i> </div> <div class="ui segment {bottom: !example[5]} attached"> <su-dropdown items="{dropdownItems6}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[5]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#39;Filter Tags&#39;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#39;Filter by tag&#39;,\n      header: true\n    \\},\n    \\{\n      divider: true\n    \\},\n    \\{\n      label: &#39;Important&#39;,\n      description: &#39;2 new&#39;,\n      value: 1\n    \\},\n    \\{\n      label: &#39;Hopper&#39;,\n      description: &#39;10 new&#39;,\n      value: 2\n    \\},\n    \\{\n      label: &#39;Discussion&#39;,\n      description: &#39;5 new&#39;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div> <h3 class="ui header">Image</h3> <p>A dropdown menu can contain an image.</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 6)}"></i> </div> <div class="ui segment {bottom: !example[6]} attached"> <su-dropdown items="{dropdownItems7}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[6]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#39;Add User&#39;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#39;People You Might Know&#39;,\n      header: true\n    \\},\n    \\{\n      label: &#39;Jenny Hess&#39;,\n      image: &#39;/images/avatar/small/jenny.jpg&#39;,\n      value: &#39;jenny&#39;\n    \\},\n    \\{\n      label: &#39;Elliot Fu&#39;,\n      image: &#39;/images/avatar/small/elliot.jpg&#39;,\n      value: &#39;elliot&#39;\n    \\},\n    \\{\n      label: &#39;Stevie Feliciano&#39;,\n      image: &#39;/images/avatar/small/stevie.jpg&#39;,\n      value: &#39;stevie&#39;\n    \\},\n    \\{\n      label: &#39;Your Friends\\&#39; Friends&#39;,\n      header: true\n    \\},\n    \\{\n      label: &#39;Christian&#39;,\n      image: &#39;/images/avatar/small/christian.jpg&#39;,\n      value: &#39;christian&#39;\n    \\},\n    \\{\n      label: &#39;Matt&#39;,\n      image: &#39;/images/avatar/small/matt.jpg&#39;,\n      value: &#39;matt&#39;\n    \\},\n    \\{\n      label: &#39;Justen Kitsune&#39;,\n      image: &#39;/images/avatar/small/justen.jpg&#39;,\n      value: &#39;justen&#39;\n    \\}\n  ]\n&lt;/script&gt;\n</code></pre> </div>', '', '', function(opts) {
'use strict';

var _this = this;

this.example = [];
this.toggleExample = function (index) {
  _this.example[index] = !_this.example[index];
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
  image: '/images/avatar/small/jenny.jpg',
  value: 'jenny'
}, {
  label: 'Elliot Fu',
  image: '/images/avatar/small/elliot.jpg',
  value: 'elliot'
}, {
  label: 'Stevie Feliciano',
  image: '/images/avatar/small/stevie.jpg',
  value: 'stevie'
}, {
  label: 'Your Friends\' Friends',
  header: true
}, {
  label: 'Christian',
  image: '/images/avatar/small/christian.jpg',
  value: 'christian'
}, {
  label: 'Matt',
  image: '/images/avatar/small/matt.jpg',
  value: 'matt'
}, {
  label: 'Justen Kitsune',
  image: '/images/avatar/small/justen.jpg',
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
  image: '/images/avatar/small/jenny.jpg',
  value: 'jenny'
}, {
  label: 'Elliot Fu',
  image: '/images/avatar/small/elliot.jpg',
  value: 'elliot'
}, {
  label: 'Stevie Feliciano',
  image: '/images/avatar/small/stevie.jpg',
  value: 'stevie'
}, {
  label: 'Christian',
  image: '/images/avatar/small/christian.jpg',
  value: 'christian'
}, {
  label: 'Matt',
  image: '/images/avatar/small/matt.jpg',
  value: 'matt'
}, {
  label: 'Justen Kitsune',
  image: '/images/avatar/small/justen.jpg',
  value: 'justen'
}];

this.on('mount', function () {
  PR.prettyPrint(false);
});
});
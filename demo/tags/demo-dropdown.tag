<demo-dropdown>
  <h1 class="ui header">
    Dropdown
    <div class="sub header">A dropdown allows a user to select a value from a series of options</div>
  </h1>

  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <h3 class="ui header">Dropdown</h3>
  <p>A dropdown</p>
  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <su-dropdown items="{ dropdownItems }" ref="dropdown1"></su-dropdown>

    <span class="ui tag label {teal: refs.dropdown1.value }">
      { refs.dropdown1.value }
      { refs.dropdown1.label }
    </span>
  </div>
  <div class="ui segment bottom attached inverted">
    <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\{ dropdownItems \}&quot;&gt;&lt;/su-dropdown&gt;

&lt;script&gt;
  this.dropdownItems = [
    \{
      label: &#039;Gender&#039;,
      value: null,
      default: true
    \},
    \{
      label: &#039;Male&#039;,
      value: 1
    \},
    \{
      label: &#039;Female&#039;,
      value: 2
    \},
  ]
&lt;/script&gt;</code></pre>
  </div>

  <h3 class="ui header">Search Selection</h3>
  <p>A selection dropdown can allow a user to search through a large list of choices.</p>
  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <su-dropdown items="{ dropdownItems2 }" search="{ true }" ref="dropdown2"></su-dropdown>

    <!-- dropdown state example -->
    <span class="ui tag label {teal: refs.dropdown2.value }">
      { refs.dropdown2.value }
      { refs.dropdown2.label }
    </span>
  </div>
  <div class="ui segment bottom attached inverted">
    <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\{ dropdownItems2 \}&quot; search=&quot;\{ true \}&quot; ref=&quot;dropdown2&quot;&gt;&lt;/su-dropdown&gt;

&lt;!-- dropdown state example --&gt;
&lt;span class=&quot;ui tag label \{teal: refs.dropdown2.value \}&quot;&gt;
  \{ refs.dropdown2.value \}
  \{ refs.dropdown2.label \}
&lt;/span&gt;

&lt;script&gt;
  this.dropdownItems2 = [
    \{
      label: &#039;State&#039;,
      value: null,
      default: true
    \},
    \{ value: &#039;AL&#039;, label: &#039;Alabama&#039; \},
    \{ value: &#039;AK&#039;, label: &#039;Alaska&#039; \},
    \{ value: &#039;AZ&#039;, label: &#039;Arizona&#039; \},
    \{ value: &#039;AR&#039;, label: &#039;Arkansas&#039; \},
    \{ value: &#039;CA&#039;, label: &#039;California&#039; \},
    \{ value: &#039;CO&#039;, label: &#039;Colorado&#039; \},
    \{ value: &#039;CT&#039;, label: &#039;Connecticut&#039; \},
    \{ value: &#039;DE&#039;, label: &#039;Delaware&#039; \},
    \{ value: &#039;DC&#039;, label: &#039;District Of Columbia&#039; \},
    \{ value: &#039;FL&#039;, label: &#039;Florida&#039; \},
    \{ value: &#039;GA&#039;, label: &#039;Georgia&#039; \},
    \{ value: &#039;HI&#039;, label: &#039;Hawaii&#039; \},
    \{ value: &#039;ID&#039;, label: &#039;Idaho&#039; \},
    \{ value: &#039;IL&#039;, label: &#039;Illinois&#039; \},
    \{ value: &#039;IN&#039;, label: &#039;Indiana&#039; \},
    \{ value: &#039;IA&#039;, label: &#039;Iowa&#039; \},
    \{ value: &#039;KS&#039;, label: &#039;Kansas&#039; \},
    \{ value: &#039;KY&#039;, label: &#039;Kentucky&#039; \},
    \{ value: &#039;LA&#039;, label: &#039;Louisiana&#039; \},
    \{ value: &#039;ME&#039;, label: &#039;Maine&#039; \},
    \{ value: &#039;MD&#039;, label: &#039;Maryland&#039; \},
    \{ value: &#039;MA&#039;, label: &#039;Massachusetts&#039; \},
    \{ value: &#039;MI&#039;, label: &#039;Michigan&#039; \},
    \{ value: &#039;MN&#039;, label: &#039;Minnesota&#039; \},
    \{ value: &#039;MS&#039;, label: &#039;Mississippi&#039; \},
    \{ value: &#039;MO&#039;, label: &#039;Missouri&#039; \},
    \{ value: &#039;MT&#039;, label: &#039;Montana&#039; \},
    \{ value: &#039;NE&#039;, label: &#039;Nebraska&#039; \},
    \{ value: &#039;NV&#039;, label: &#039;Nevada&#039; \},
    \{ value: &#039;NH&#039;, label: &#039;New Hampshire&#039; \},
    \{ value: &#039;NJ&#039;, label: &#039;New Jersey&#039; \},
    \{ value: &#039;NM&#039;, label: &#039;New Mexico&#039; \},
    \{ value: &#039;NY&#039;, label: &#039;New York&#039; \},
    \{ value: &#039;NC&#039;, label: &#039;North Carolina&#039; \},
    \{ value: &#039;ND&#039;, label: &#039;North Dakota&#039; \},
    \{ value: &#039;OH&#039;, label: &#039;Ohio&#039; \},
    \{ value: &#039;OK&#039;, label: &#039;Oklahoma&#039; \},
    \{ value: &#039;OR&#039;, label: &#039;Oregon&#039; \},
    \{ value: &#039;PA&#039;, label: &#039;Pennsylvania&#039; \},
    \{ value: &#039;RI&#039;, label: &#039;Rhode Island&#039; \},
    \{ value: &#039;SC&#039;, label: &#039;South Carolina&#039; \},
    \{ value: &#039;SD&#039;, label: &#039;South Dakota&#039; \},
    \{ value: &#039;TN&#039;, label: &#039;Tennessee&#039; \},
    \{ value: &#039;TX&#039;, label: &#039;Texas&#039; \},
    \{ value: &#039;UT&#039;, label: &#039;Utah&#039; \},
    \{ value: &#039;VT&#039;, label: &#039;Vermont&#039; \},
    \{ value: &#039;VA&#039;, label: &#039;Virginia&#039; \},
    \{ value: &#039;WA&#039;, label: &#039;Washington&#039; \},
    \{ value: &#039;WV&#039;, label: &#039;West Virginia&#039; \},
    \{ value: &#039;WI&#039;, label: &#039;Wisconsin&#039; \},
    \{ value: &#039;WY&#039;, label: &#039;Wyoming&#039; \}
  ]
&lt;/script&gt;</code></pre>
  </div>

  <script>
    this.dropdownItems = [
      {
        label: 'Gender',
        value: null,
        default: true
      },
      {
        label: 'Male',
        value: 1
      },
      {
        label: 'Female',
        value: 2
      }
    ]
    this.dropdownItems2 = [
      {
        label: 'State',
        value: null,
        default: true
      },
      { value: 'AL', label: 'Alabama' },
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'AR', label: 'Arkansas' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'CT', label: 'Connecticut' },
      { value: 'DE', label: 'Delaware' },
      { value: 'DC', label: 'District Of Columbia' },
      { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' },
      { value: 'HI', label: 'Hawaii' },
      { value: 'ID', label: 'Idaho' },
      { value: 'IL', label: 'Illinois' },
      { value: 'IN', label: 'Indiana' },
      { value: 'IA', label: 'Iowa' },
      { value: 'KS', label: 'Kansas' },
      { value: 'KY', label: 'Kentucky' },
      { value: 'LA', label: 'Louisiana' },
      { value: 'ME', label: 'Maine' },
      { value: 'MD', label: 'Maryland' },
      { value: 'MA', label: 'Massachusetts' },
      { value: 'MI', label: 'Michigan' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'MS', label: 'Mississippi' },
      { value: 'MO', label: 'Missouri' },
      { value: 'MT', label: 'Montana' },
      { value: 'NE', label: 'Nebraska' },
      { value: 'NV', label: 'Nevada' },
      { value: 'NH', label: 'New Hampshire' },
      { value: 'NJ', label: 'New Jersey' },
      { value: 'NM', label: 'New Mexico' },
      { value: 'NY', label: 'New York' },
      { value: 'NC', label: 'North Carolina' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OH', label: 'Ohio' },
      { value: 'OK', label: 'Oklahoma' },
      { value: 'OR', label: 'Oregon' },
      { value: 'PA', label: 'Pennsylvania' },
      { value: 'RI', label: 'Rhode Island' },
      { value: 'SC', label: 'South Carolina' },
      { value: 'SD', label: 'South Dakota' },
      { value: 'TN', label: 'Tennessee' },
      { value: 'TX', label: 'Texas' },
      { value: 'UT', label: 'Utah' },
      { value: 'VT', label: 'Vermont' },
      { value: 'VA', label: 'Virginia' },
      { value: 'WA', label: 'Washington' },
      { value: 'WV', label: 'West Virginia' },
      { value: 'WI', label: 'Wisconsin' },
      { value: 'WY', label: 'Wyoming' }
    ]

    this.on('mount', () => {
      PR.prettyPrint(false)
    })
  </script>
</demo-dropdown>
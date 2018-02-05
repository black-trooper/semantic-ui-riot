<demo-dropdown>
  <h1 class="ui header">
    Dropdown
    <div class="sub header">A dropdown allows a user to select a value from a series of options</div>
  </h1>

  <!-- =================================================================================== -->
  <!--                                                                               Types -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <!-- ====================================================== -->
  <!--                                              Selection -->
  <!--                                              ========= -->
  <h3 class="ui header">Selection</h3>
  <p>A dropdown can be used to select between choices in a form</p>

  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems }"></su-dropdown>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-dropdown items="{ dropdownItems }"></su-dropdown>

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
          },
        ]
      </script>
    </code></pre>
    </div>
  </section>

  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems9 }" class="fluid"></su-dropdown>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-dropdown items="{ dropdownItems }" class="fluid" ></su-dropdown>

      <script>
        this.dropdownItems = [
          {
            label: 'Select Friend',
            value: null,
            default: true
          },
          {
            label: 'Jenny Hess',
            image: './images/avatar/small/jenny.jpg',
            value: 'jenny'
          },
          {
            label: 'Elliot Fu',
            image: './images/avatar/small/elliot.jpg',
            value: 'elliot'
          },
          {
            label: 'Stevie Feliciano',
            image: './images/avatar/small/stevie.jpg',
            value: 'stevie'
          },
          {
            label: 'Christian',
            image: './images/avatar/small/christian.jpg',
            value: 'christian'
          },
          {
            label: 'Matt',
            image: './images/avatar/small/matt.jpg',
            value: 'matt'
          },
          {
            label: 'Justen Kitsune',
            image: './images/avatar/small/justen.jpg',
            value: 'justen'
          }
        ]
      </script>
    </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                 Search -->
  <!--                                                 ====== -->
  <h3 class="ui header">Search Selection</h3>
  <p>A selection dropdown can allow a user to search through a large list of choices.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems2 }" search="true"></su-dropdown>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-dropdown items="{ dropdownItems }" search="true"></su-dropdown>

      <script>
        this.dropdownItems = [
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
      </script>
    </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                               Multiple -->
  <!--                                               ======== -->
  <h3 class="ui header">Multiple Selection</h3>
  <p>A selection dropdown can allow multiple selections</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems8 }" multiple="true"></su-dropdown>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-dropdown items="{ dropdownItems }" multiple="true"></su-dropdown>

      <script>
        this.dropdownItems = [
          {
            label: 'Skills',
            value: null,
            default: true
          },
          { value: 'angular', label: 'Angular' },
          { value: 'css', label: 'CSS' },
          { value: 'design', label: 'Graphic Design' },
          { value: 'ember', label: 'Ember' },
          { value: 'html', label: 'HTML' },
          { value: 'ia', label: 'Information Architecture' },
          { value: 'javascript', label: 'Javascript' },
          { value: 'mech', label: 'Mechanical Engineering' },
          { value: 'meteor', label: 'Meteor' },
          { value: 'node', label: 'NodeJS' },
          { value: 'plumbing', label: 'Plumbing' },
          { value: 'python', label: 'Python' },
          { value: 'rails', label: 'Rails' },
          { value: 'react', label: 'React' },
          { value: 'repair', label: 'Kitchen Repair' },
          { value: 'ruby', label: 'Ruby' },
          { value: 'ui', label: 'UI Design' },
          { value: 'ux', label: 'User Experience' }
        ]
      </script>
    </code></pre>
    </div>
  </section>

  <!-- =================================================================================== -->
  <!--                                                                             Content -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Content<a class="anchor" id="content"></a></h2>

  <!-- ====================================================== -->
  <!--                                                 Header -->
  <!--                                                 ====== -->
  <h3 class="ui header">Header</h3>
  <p>A dropdown menu can contain a header</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems3 }"></su-dropdown>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-dropdown items="{ dropdownItems }"></su-dropdown>

      <script>
        this.dropdownItems = [
          {
            label: 'Filter',
            value: null,
            default: true
          },
          {
            label: 'Filter by tag',
            icon: 'tags',
            header: true
          },
          {
            label: 'Important',
            value: 1
          },
          {
            label: 'Announcement',
            value: 2
          },
          {
            label: 'Discussion',
            value: 3
          }
        ]
      </script>
    </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                Divider -->
  <!--                                                ======= -->
  <h3 class="ui header">Divider</h3>
  <p>A dropdown menu can contain dividers to separate related content</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems4 }"></su-dropdown>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-dropdown items="{ dropdownItems }"></su-dropdown>

      <script>
        this.dropdownItems = [
          {
            label: 'Filter',
            value: null,
            default: true
          },
          {
            label: 'Filter by tag',
            icon: 'tags',
            header: true
          },
          {
            divider: true
          },
          {
            label: 'Important',
            value: 1
          },
          {
            label: 'Announcement',
            value: 2
          },
          {
            label: 'Discussion',
            value: 3
          }
        ]
      </script>
    </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                   Icon -->
  <!--                                                   ==== -->
  <h3 class="ui header">Icon</h3>
  <p>A dropdown menu can contain an <a href="https://semantic-ui.com/elements/icon.html">icon</a>.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems5 }"></su-dropdown>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-dropdown items="{ dropdownItems }"></su-dropdown>

      <script>
        this.dropdownItems = [
          {
            label: 'Filter',
            value: null,
            default: true
          },
          {
            label: 'Filter by tag',
            icon: 'tags',
            header: true
          },
          {
            divider: true
          },
          {
            label: 'Important',
            icon: 'attention',
            value: 1
          },
          {
            label: 'Announcement',
            icon: 'comment',
            value: 2
          },
          {
            label: 'Discussion',
            icon: 'conversation',
            value: 3
          }
        ]
      </script>
    </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                            Description -->
  <!--                                            =========== -->
  <h3 class="ui header">Description</h3>
  <p>A dropdown menu can contain a description.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems6 }"></su-dropdown>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-dropdown items="{ dropdownItems }"></su-dropdown>

      <script>
        this.dropdownItems = [
          {
            label: 'Filter Tags',
            value: null,
            default: true
          },
          {
            label: 'Filter by tag',
            header: true
          },
          {
            divider: true
          },
          {
            label: 'Important',
            description: '2 new',
            value: 1
          },
          {
            label: 'Hopper',
            description: '10 new',
            value: 2
          },
          {
            label: 'Discussion',
            description: '5 new',
            value: 3
          }
        ]
      </script>
    </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                  Image -->
  <!--                                                  ===== -->
  <h3 class="ui header">Image</h3>
  <p>A dropdown menu can contain an image.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems7 }"></su-dropdown>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-dropdown items="{ dropdownItems }"></su-dropdown>

      <script>
        this.dropdownItems = [
          {
            label: 'Add User',
            value: null,
            default: true
          },
          {
            label: 'People You Might Know',
            header: true
          },
          {
            label: 'Jenny Hess',
            image: './images/avatar/small/jenny.jpg',
            value: 'jenny'
          },
          {
            label: 'Elliot Fu',
            image: './images/avatar/small/elliot.jpg',
            value: 'elliot'
          },
          {
            label: 'Stevie Feliciano',
            image: './images/avatar/small/stevie.jpg',
            value: 'stevie'
          },
          {
            label: 'Your Friends\' Friends',
            header: true
          },
          {
            label: 'Christian',
            image: './images/avatar/small/christian.jpg',
            value: 'christian'
          },
          {
            label: 'Matt',
            image: './images/avatar/small/matt.jpg',
            value: 'matt'
          },
          {
            label: 'Justen Kitsune',
            image: './images/avatar/small/justen.jpg',
            value: 'justen'
          }
        ]
      </script>
    </code></pre>
    </div>
  </section>

  <!-- =================================================================================== -->
  <!--                                                                              States -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">States<a class="anchor" id="states"></a></h2>

  <!-- ====================================================== -->
  <!--                                              Read-only -->
  <!--                                              ========= -->
  <!-- <h3 class="ui header">Read-only</h3>
  <p>A dropdown can be read-only and unable to change states</p>
  <section>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample }"></i>
  </div>
  <div class="ui segment bottom attached">
    <su-dropdown items="{ dropdownItems12 }" class="read-only"></su-dropdown>
  </div>
  <div class="ui segment bottom attached inverted transition hidden">
    <pre><code class="prettyprint">
        <su-dropdown class="read-only"></su-dropdown>
      </code></pre>
  </div>
  </section>
  -->

  <!-- ====================================================== -->
  <!--                                               Disabled -->
  <!--                                               ======== -->
  <h3 class="ui header">Disabled</h3>
  <p>A dropdown can be disavbled</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems12 }" class="disabled"></su-dropdown>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-dropdown class="disabled"></su-dropdown>
      </code></pre>
    </div>
  </section>

  <!-- =================================================================================== -->
  <!--                                                                      Named elements -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Named elements<a class="anchor" id="named"></a></h2>

  <!-- ====================================================== -->
  <!--                                                 Single -->
  <!--                                                 ====== -->
  <h3 class="ui header">Single Selection</h3>
  <p>Access to single selection with ref attribute</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems10 }" ref="dropdown1"></su-dropdown>

      <div class="ui message">
        <div class="header">
          Selected value
        </div>
        <p>value: { refs.dropdown1.value }</p>
        <p>label: { refs.dropdown1.label }</p>
      </div>

      <button type="button" click="{ setRefValue.bind(this, null) }" class="ui button">Select Default</button>
      <button type="button" click="{ setRefValue.bind(this, 1) }" class="ui button">Select Male</button>
      <button type="button" click="{ setRefValue.bind(this, 2) }" class="ui button">Select Female</button>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-dropdown items="{ dropdownItems }" ref="dropdown1"></su-dropdown>

      <div class="ui message">
        <div class="header">
          Selected value
        </div>
        <p>value: { refs.dropdown1.value }</p>
        <p>label: { refs.dropdown1.label }</p>
      </div>

      <button type="button" click="{ setRefValue.bind(this, null) }" class="ui button">Select Default</button>
      <button type="button" click="{ setRefValue.bind(this, 1) }" class="ui button">Select Male</button>
      <button type="button" click="{ setRefValue.bind(this, 2) }" class="ui button">Select Female</button>

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
          },
        ]

        this.setRefValue = value => {
          this.refs.dropdown1.value = value
        }
      </script>
    </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                  Multi -->
  <!--                                                  ===== -->
  <h3 class="ui header">Multi Selection</h3>
  <p>Access to multi selection with ref attribute</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems11 }" ref="dropdown2" multiple="true"></su-dropdown>

      <div class="ui message">
        <div class="header">
          Selected value
        </div>
        <p>value: { refs.dropdown2.value }</p>
      </div>

      <button type="button" click="{ setMultiRefValue.bind(this, null) }" class="ui button">Select Default</button>
      <button type="button" click="{ setMultiRefValue.bind(this, ['angular', 'css']) }" class="ui button">Select Angular &amp; CSS</button>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      <su-dropdown items="{ dropdownItems }" ref="dropdown2" multiple="true"></su-dropdown>

      <div class="ui message">
        <div class="header">
          Selected value
        </div>
        <p>value: { refs.dropdown2.value }</p>
      </div>

      <button type="button" click="{ setMultiRefValue.bind(this, null) }" class="ui button">Select Default</button>
      <button type="button" click="{ setMultiRefValue.bind(this, ['angular', 'css']) }" class="ui button">Select Angular &amp; CSS</button>

      <script>
        this.dropdownItems = [
          {
            label: 'Skills',
            value: null,
            default: true
          },
          { value: 'angular', label: 'Angular' },
          { value: 'css', label: 'CSS' },
          { value: 'design', label: 'Graphic Design' },
          { value: 'ember', label: 'Ember' },
          { value: 'html', label: 'HTML' },
          { value: 'ia', label: 'Information Architecture' },
          { value: 'javascript', label: 'Javascript' },
          { value: 'mech', label: 'Mechanical Engineering' },
          { value: 'meteor', label: 'Meteor' },
          { value: 'node', label: 'NodeJS' },
          { value: 'plumbing', label: 'Plumbing' },
          { value: 'python', label: 'Python' },
          { value: 'rails', label: 'Rails' },
          { value: 'react', label: 'React' },
          { value: 'repair', label: 'Kitchen Repair' },
          { value: 'ruby', label: 'Ruby' },
          { value: 'ui', label: 'UI Design' },
          { value: 'ux', label: 'User Experience' }
        ]

        this.setRefValue = value => {
          this.refs.dropdown1.value = value
        }
      </script>
    </code></pre>
    </div>
  </section>

  <!-- =================================================================================== -->
  <!--                                                                       Event trigger -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Event trigger<a class="anchor" id="event"></a></h2>

  <!-- ====================================================== -->
  <!--                                       Single Selection -->
  <!--                                       ================ -->
  <h3 class="ui header">Single Selection</h3>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-dropdown items="{ dropdownItems13 }" ref="dropdown3"></su-dropdown>
      <div class="ui message">
        <ul>
          <li each="{ item in singleMessage }">{ item }</li>
        </ul>
      </div>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-dropdown items="{ dropdownItems }" ref="dropdown"></su-dropdown>
        <div class="ui message">
          <ul>
            <li each="{ item in singleMessage }">{ item }</li>
          </ul>
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
            },
          ]

          this.on('mount', () => {
            this.refs.dropdown.on('select', target => {
              this.singleMessage.push(`Selected. label: ${target.label}, value: ${target.value}`)
              this.update()
            })
            this.refs.dropdown.on('change', target => {
              this.singleMessage.push(`Changed. label: ${target.label}, value: ${target.value}`)
              this.update()
            })

            PR.prettyPrint(false)
          })
        </script>
      </code></pre>
    </div>
  </section>

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
    this.dropdownItems3 = [
      {
        label: 'Filter',
        value: null,
        default: true
      },
      {
        label: 'Filter by tag',
        icon: 'tags',
        header: true
      },
      {
        label: 'Important',
        value: 1
      },
      {
        label: 'Announcement',
        value: 2
      },
      {
        label: 'Discussion',
        value: 3
      }
    ]

    this.dropdownItems4 = [
      {
        label: 'Filter',
        value: null,
        default: true
      },
      {
        label: 'Filter by tag',
        icon: 'tags',
        header: true
      },
      {
        divider: true
      },
      {
        label: 'Important',
        value: 1
      },
      {
        label: 'Announcement',
        value: 2
      },
      {
        label: 'Discussion',
        value: 3
      }
    ]

    this.dropdownItems5 = [
      {
        label: 'Filter',
        value: null,
        default: true
      },
      {
        label: 'Filter by tag',
        icon: 'tags',
        header: true
      },
      {
        divider: true
      },
      {
        label: 'Important',
        icon: 'attention',
        value: 1
      },
      {
        label: 'Announcement',
        icon: 'comment',
        value: 2
      },
      {
        label: 'Discussion',
        icon: 'conversation',
        value: 3
      }
    ]

    this.dropdownItems6 = [
      {
        label: 'Filter Tags',
        value: null,
        default: true
      },
      {
        label: 'Filter by tag',
        header: true
      },
      {
        divider: true
      },
      {
        label: 'Important',
        description: '2 new',
        value: 1
      },
      {
        label: 'Hopper',
        description: '10 new',
        value: 2
      },
      {
        label: 'Discussion',
        description: '5 new',
        value: 3
      }
    ]

    this.dropdownItems7 = [
      {
        label: 'Add User',
        value: null,
        default: true
      },
      {
        label: 'People You Might Know',
        header: true
      },
      {
        label: 'Jenny Hess',
        image: './images/avatar/small/jenny.jpg',
        value: 'jenny'
      },
      {
        label: 'Elliot Fu',
        image: './images/avatar/small/elliot.jpg',
        value: 'elliot'
      },
      {
        label: 'Stevie Feliciano',
        image: './images/avatar/small/stevie.jpg',
        value: 'stevie'
      },
      {
        label: 'Your Friends\' Friends',
        header: true
      },
      {
        label: 'Christian',
        image: './images/avatar/small/christian.jpg',
        value: 'christian'
      },
      {
        label: 'Matt',
        image: './images/avatar/small/matt.jpg',
        value: 'matt'
      },
      {
        label: 'Justen Kitsune',
        image: './images/avatar/small/justen.jpg',
        value: 'justen'
      }
    ]

    this.dropdownItems8 = [
      {
        label: 'Skills',
        value: null,
        default: true
      },
      { value: 'angular', label: 'Angular' },
      { value: 'css', label: 'CSS' },
      { value: 'design', label: 'Graphic Design' },
      { value: 'ember', label: 'Ember' },
      { value: 'html', label: 'HTML' },
      { value: 'ia', label: 'Information Architecture' },
      { value: 'javascript', label: 'Javascript' },
      { value: 'mech', label: 'Mechanical Engineering' },
      { value: 'meteor', label: 'Meteor' },
      { value: 'node', label: 'NodeJS' },
      { value: 'plumbing', label: 'Plumbing' },
      { value: 'python', label: 'Python' },
      { value: 'rails', label: 'Rails' },
      { value: 'react', label: 'React' },
      { value: 'repair', label: 'Kitchen Repair' },
      { value: 'ruby', label: 'Ruby' },
      { value: 'ui', label: 'UI Design' },
      { value: 'ux', label: 'User Experience' }
    ]

    this.dropdownItems9 = [
      {
        label: 'Select Friend',
        value: null,
        default: true
      },
      {
        label: 'Jenny Hess',
        image: './images/avatar/small/jenny.jpg',
        value: 'jenny'
      },
      {
        label: 'Elliot Fu',
        image: './images/avatar/small/elliot.jpg',
        value: 'elliot'
      },
      {
        label: 'Stevie Feliciano',
        image: './images/avatar/small/stevie.jpg',
        value: 'stevie'
      },
      {
        label: 'Christian',
        image: './images/avatar/small/christian.jpg',
        value: 'christian'
      },
      {
        label: 'Matt',
        image: './images/avatar/small/matt.jpg',
        value: 'matt'
      },
      {
        label: 'Justen Kitsune',
        image: './images/avatar/small/justen.jpg',
        value: 'justen'
      }
    ]

    this.dropdownItems10 = [
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

    this.dropdownItems11 = [
      {
        label: 'Skills',
        value: null,
        default: true
      },
      { value: 'angular', label: 'Angular' },
      { value: 'css', label: 'CSS' },
      { value: 'design', label: 'Graphic Design' },
      { value: 'ember', label: 'Ember' },
      { value: 'html', label: 'HTML' },
      { value: 'ia', label: 'Information Architecture' },
      { value: 'javascript', label: 'Javascript' },
      { value: 'mech', label: 'Mechanical Engineering' },
      { value: 'meteor', label: 'Meteor' },
      { value: 'node', label: 'NodeJS' },
      { value: 'plumbing', label: 'Plumbing' },
      { value: 'python', label: 'Python' },
      { value: 'rails', label: 'Rails' },
      { value: 'react', label: 'React' },
      { value: 'repair', label: 'Kitchen Repair' },
      { value: 'ruby', label: 'Ruby' },
      { value: 'ui', label: 'UI Design' },
      { value: 'ux', label: 'User Experience' }
    ]
    this.dropdownItems12 = [
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
    this.dropdownItems13 = [
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

    this.setRefValue = value => {
      this.refs.dropdown1.value = value
    }
    this.setMultiRefValue = values => {
      this.refs.dropdown2.value = values
      this.update()
    }

    this.singleMessage = []
    this.on('mount', () => {
      this.refs.dropdown3.on('select', target => {
        this.singleMessage.push(`Selected. label: ${target.label}, value: ${target.value}`)
        this.update()
      })
      this.refs.dropdown3.on('change', target => {
        this.singleMessage.push(`Changed. label: ${target.label}, value: ${target.value}`)
        this.update()
      })
    })
  </script>
</demo-dropdown>
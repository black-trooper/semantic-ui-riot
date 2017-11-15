<demo-checkbox>
  <h1 class="ui header">
    Checkbox
    <div class="sub header">A checkbox allows a user to select a value from a small set of options, often binary</div>
  </h1>

  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <h3 class="ui header">Checkbox</h3>
  <p>A standard checkbox</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 1) }"></i>
  </div>
  <div class="ui segment { bottom: !example[1] } attached">
    <su-checkbox>
      Make my profile visible
    </su-checkbox>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[1] } ">
    <pre><code class="prettyprint">
      <su-checkbox>
        Make my profile visible
      </su-checkbox>
    </code></pre>
  </div>

  <h3 class="ui header">Radio</h3>
  <p>A checkbox can be formatted as a radio element. This means it is an exclusive option.</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code link" onclick="{ toggleExample.bind(this, 2) }"></i>
  </div>
  <div class="ui segment { bottom: !example[2] } attached">
    <su-radio name="radio1">
      Radio choice1
    </su-radio>
    <su-radio name="radio1">
      Radio choice2
    </su-radio>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[2] }">
    <pre><code class="prettyprint">
      <su-radio name="radio">
        Radio choice1
      </su-radio>
      <su-radio name="radio">
        Radio choice2
      </su-radio>
    </code></pre>
  </div>

  <h3 class="ui header">Slider</h3>
  <p>A checkbox can be formatted to emphasize the current selection state</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 3) }"></i>
  </div>
  <div class="ui segment { bottom: !example[3] } attached">
    <su-checkbox class="slider">
      Accept terms and conditions
    </su-checkbox>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[3] }">
    <pre><code class="prettyprint">
      <su-checkbox class="slider">
        Accept terms and conditions
      </su-checkbox>
    </code></pre>
  </div>

  <p>A checkbox can be formatted to emphasize the current selection state</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 4) }"></i>
  </div>
  <div class="ui segment { bottom: !example[4] } attached">
    <div class="ui form">
      <div class="grouped fields">
        <label>Outbound Throughput</label>
        <div class="field">
          <su-radio class="slider" name="throughput">
            20 mbps max
          </su-radio>
        </div>
        <div class="field">
          <su-radio class="slider" name="throughput">
            10mbps max
          </su-radio>
        </div>
        <div class="field">
          <su-radio class="slider" name="throughput">
            5mbps max
          </su-radio>
        </div>
        <div class="field">
          <su-radio class="slider" name="throughput">
            Unmetered
          </su-radio>
        </div>
      </div>
    </div>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[4] } ">
    <pre><code class="prettyprint">
      <div class="ui form">
        <div class="grouped fields">
          <label>Outbound Throughput</label>
          <div class="field">
            <su-radio class="slider" name="throughput">
              20 mbps max
            </su-radio>
          </div>
          <div class="field">
            <su-radio class="slider" name="throughput">
              10mbps max
            </su-radio>
          </div>
          <div class="field">
            <su-radio class="slider" name="throughput">
              5mbps max
            </su-radio>
          </div>
          <div class="field">
            <su-radio class="slider" name="throughput">
              Unmetered
            </su-radio>
          </div>
        </div>
      </div>
    </code></pre>
  </div>

  <h2 class="ui dividing header">Access elements<a class="anchor" id="event"></a></h2>

  <h3 class="ui header">Checkbox</h3>
  <p>Access to checkbox with ref attribute</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 5) }"></i>
  </div>
  <div class="ui segment { bottom: !example[5] } attached">
    <su-checkbox ref="checkbox1">
      Make my profile visible
    </su-checkbox>

    <div class="ui message">
      <div class="header">
        Checked from refs
      </div>
      <p>{ refs.checkbox1.checked ? 'on' : 'off' }</p>
    </div>

    <button type="button" click="{ setRefValue.bind(this, true) }" class="ui button">Check on</button>
    <button type="button" click="{ setRefValue.bind(this, false) }" class="ui button">Check off</button>
  </div>

  <div class="ui segment bottom attached inverted transition { hidden: !example[5] } ">
    <pre><code class="prettyprint">
      <su-checkbox ref="checkbox1">
        Make my profile visible
      </su-checkbox>

      <div class="ui message">
        <div class="header">
          Checked
        </div>
        <p>{ refs.checkbox1.check() ? 'on' : 'off' }</p>
      </div>

      <button type="button" click="{ setRefValue.bind(this, true) }" class="ui button">Check on</button>
      <button type="button" click="{ setRefValue.bind(this, false) }" class="ui button">Check off</button>

      <script>
        this.setRefValue = value => {
          this.refs.checkbox1.checked = value
        }
      </script>
    </code></pre>
  </div>

  <p>Access to checkbox with check attribute</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 7) }"></i>
  </div>
  <div class="ui segment { bottom: !example[7] } attached">
    <su-checkbox ref="checkbox2" check="{ checkbox2 }">
      Make my profile visible
    </su-checkbox>

    <div class="ui message">
      <div class="header">
        Checked from refs
      </div>
      <p>{ refs.checkbox2.checked ? 'on' : 'off' }</p>
    </div>

    <button type="button" click="{ setCheckboxValue.bind(this, true) }" class="ui button">Check on</button>
    <button type="button" click="{ setCheckboxValue.bind(this, false) }" class="ui button">Check off</button>
  </div>

  <div class="ui segment bottom attached inverted transition { hidden: !example[7] } ">
    <pre><code class="prettyprint">
      <su-checkbox ref="checkbox2" check="{ checkbox2 }">
        Make my profile visible
      </su-checkbox>

      <div class="ui message">
        <div class="header">
          Checked
        </div>
        <p>{ refs.checkbox2.check ? 'on' : 'off' }</p>
      </div>

      <button type="button" click="{ setCheckboxValue.bind(this, true) }" class="ui button">Check on</button>
      <button type="button" click="{ setCheckboxValue.bind(this, false) }" class="ui button">Check off</button>

      <script>
        this.on('mount', () => {
          this.refs.checkbox2.on('click', value => {
            this.setCheckboxValue(value)
          })
        })
        this.setCheckboxValue = value => {
          this.checkbox2 = value
        }
      </script>
    </code></pre>
  </div>

  <h3 class="ui header">Radio</h3>
  <p>Access to radio with ref attribute</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 6) }"></i>
  </div>
  <div class="ui segment { bottom: !example[6] } attached">
    <su-radio name="radio2" ref="radio1_1" value="1" checked="{ radio1 == 1 }">
      Radio choice1
    </su-radio>
    <su-radio name="radio2" ref="radio1_2" value="2" checked="{ radio1 == 2 }">
      Radio choice2
    </su-radio>

    <div class="ui message">
      <div class="header">
        Checked from refs
      </div>
      <p>Radio choice1 { refs.radio1_1.checked ? 'on' : 'off' }</p>
      <p>Radio choice2 { refs.radio1_2.checked ? 'on' : 'off' }</p>
    </div>

    <button type="button" click="{ setRadioValue.bind(this, 1) }" class="ui button">Choice1</button>
    <button type="button" click="{ setRadioValue.bind(this, 2) }" class="ui button">Choice2</button>
  </div>

  <div class="ui segment bottom attached inverted transition { hidden: !example[6] } ">
    <pre><code class="prettyprint">
      <su-radio name="radio" ref="radio1_1" value="1" checked="{ radio1 == 1 }">
        Radio choice1
      </su-radio>
      <su-radio name="radio" ref="radio1_2" value="2" checked="{ radio1 == 2 }">
        Radio choice2
      </su-radio>
  
      <div class="ui message">
        <div class="header">
          Checked from refs
        </div>
        <p>Radio choice1 { refs.radio1_1.checked ? 'on' : 'off' }</p>
        <p>Radio choice2 { refs.radio1_2.checked ? 'on' : 'off' }</p>
      </div>
  
      <button type="button" click="{ setRadioValue.bind(this, 1) }" class="ui button">Choice1</button>
      <button type="button" click="{ setRadioValue.bind(this, 2) }" class="ui button">Choice2</button>

      <script>
        this.on('mount', () => {
          this.refs.radio1_1.on('click', value => {
            this.setRadioValue(value)
          })
          this.refs.radio1_2.on('click', value => {
            this.setRadioValue(value)
          })
        })
        this.radio1 = 1
        this.setRadioValue = value => {
          this.radio1 = value
        }
      </script>
    </code></pre>
  </div>

  <script>
        this.example = []
        this.toggleExample = index => {
          this.example[index] = !this.example[index]
        }

        this.radio1 = 1
        this.setRadioValue = value => {
          this.radio1 = value
        }

        this.setCheckboxValue = value => {
          this.checkbox2 = value
        }

        this.setRefValue = value => {
          this.refs.checkbox1.checked = value
        }

        this.on('mount', () => {
          this.refs.checkbox2.on('click', value => {
            this.setCheckboxValue(value)
          })
          this.refs.radio1_1.on('click', value => {
            this.setRadioValue(value)
          })
          this.refs.radio1_2.on('click', value => {
            this.setRadioValue(value)
          })
          PR.prettyPrint(false)
        })
  </script>
</demo-checkbox>
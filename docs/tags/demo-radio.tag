<demo-radio>
  <h1 class="ui header">
    Radio
    <div class="sub header">A checkbox allows a user to select a value from a small set of options, often binary</div>
  </h1>

  <!-- =================================================================================== -->
  <!--                                                                               Types -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <!-- ====================================================== -->
  <!--                                               Standard -->
  <!--                                               ======== -->
  <h3 class="ui header">Standard</h3>
  <p>A standard radio.</p>
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

  <!-- ====================================================== -->
  <!--                                                 Slider -->
  <!--                                                 ====== -->
  <h3 class="ui header">Slider</h3>
  <p>A radio can be formatted to emphasize the current selection state</p>
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

  <!-- =================================================================================== -->
  <!--                                                                               Types -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">States<a class="anchor" id="states"></a></h2>

  <!-- ====================================================== -->
  <!--                                              Read-only -->
  <!--                                              ========= -->
  <h3 class="ui header">Read-only</h3>
  <p>A radio can be read-only and unable to change states</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 11) }"></i>
  </div>
  <div class="ui segment { bottom: !example[1] } attached">
    <su-radio class="read-only">
      Read Only
    </su-radio>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[11] } ">
    <pre><code class="prettyprint">
      <su-radio class="read-only" checked="true">
        Read Only
      </su-radio>
    </code></pre>
  </div>

  <!-- ====================================================== -->
  <!--                                              Checked -->
  <!--                                              ========= -->
  <h3 class="ui header">Checked</h3>
  <p>A radio can be checked</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 12) }"></i>
  </div>
  <div class="ui segment { bottom: !example[1] } attached">
    <su-radio checked="true" name="radio_active">
      Active
    </su-radio>
    <su-radio name="radio_active">
      None Active
    </su-radio>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[12] } ">
    <pre><code class="prettyprint">
        <su-radio checked="true" name="radio_active">
          Active
        </su-radio>
        <su-radio name="radio_active">
          None Active
        </su-radio>
    </code></pre>
  </div>

  <!-- ====================================================== -->
  <!--                                              Disabled -->
  <!--                                              ========= -->
  <h3 class="ui header">Disabled</h3>
  <p>A radio can be read-only and unable to change states</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 13) }"></i>
  </div>
  <div class="ui segment { bottom: !example[1] } attached">
    <su-radio class="disabled">
      Disabled
    </su-radio>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[13] } ">
    <pre><code class="prettyprint">
      <su-radio class="disabled">
        Disabled
      </su-radio>
    </code></pre>
  </div>

  <!-- =================================================================================== -->
  <!--                                                                        Update label -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Update label<a class="anchor" id="label"></a></h2>

  <!-- ====================================================== -->
  <!--                                                  Radio -->
  <!--                                                  ===== -->
  <h3 class="ui header">Radio</h3>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 9) }"></i>
  </div>
  <div class="ui segment { bottom: !example[9] } attached">
    <su-radio label="{ radio_label }" />
    <div style="margin-top:1em">
      <button type="button" click="{ changeLabel }" class="ui button">Change label</button>
    </div>
  </div>

  <div class="ui segment bottom attached inverted transition { hidden: !example[9] } ">
    <pre><code class="prettyprint">
        <su-radio label="{ radio_label }" />
        <button type="button" click="{ changeLabel }" class="ui button">Change label</button>
        
      <script>
        this.radio_label = 'change'
        this.changeLabel = () => {
          this.radio_label = (this.radio_label === 'change') ? 'changed' : 'change'
        }
      </script>
    </code></pre>
  </div>

  <!-- =================================================================================== -->
  <!--                                                                     Access elements -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Access elements<a class="anchor" id="access"></a></h2>

  <!-- ====================================================== -->
  <!--                                                  Radio -->
  <!--                                                  ===== -->
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

    <button type="button" click="{ setValue.bind(this, 1) }" class="ui button">Choice1</button>
    <button type="button" click="{ setValue.bind(this, 2) }" class="ui button">Choice2</button>
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
  
      <button type="button" click="{ setValue.bind(this, 1) }" class="ui button">Choice1</button>
      <button type="button" click="{ setValue.bind(this, 2) }" class="ui button">Choice2</button>

      <script>
        this.on('mount', () => {
          this.refs.radio1_1.on('click', value => {
            this.setValue(value)
          })
          this.refs.radio1_2.on('click', value => {
            this.setValue(value)
          })
        })
        this.radio1 = 1
        this.setValue = value => {
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
    this.setValue = value => {
      this.radio1 = value
    }

    this.radio_label = 'change'
    this.changeLabel = () => {
      this.radio_label = (this.radio_label === 'change') ? 'changed' : 'change'
    }

    this.on('mount', () => {
      this.refs.radio1_1.on('click', value => {
        this.setValue(value)
      })
      this.refs.radio1_2.on('click', value => {
        this.setValue(value)
      })
      PR.prettyPrint(false)
    })
  </script>
</demo-radio>
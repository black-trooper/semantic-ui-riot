<demo-checkbox>
  <h1 class="ui header">
    Checkbox
    <div class="sub header">A checkbox allows a user to select a value from a small set of options, often binary</div>
  </h1>

  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <h3 class="ui header">Checkbox</h3>
  <p>A standard checkbox</p>
  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <su-checkbox checkbox="{ checkbox }" ref="checkbox1">
      Make my profile visible
    </su-checkbox>
    <span class="ui tag label {teal: refs.checkbox1.checked}">{ refs.checkbox1.checked ? 'on' : 'off' }</span>
  </div>
  <div class="ui segment bottom attached inverted">
    <pre><code class="prettyprint">&lt;su-checkbox checkbox="\{ checkbox \}" ref="checkbox1"/&gt;
  Make my profile visible
&lt;/su-checkbox&gt;

&lt;!-- checkbox state example --&gt;
&lt;span class="ui tag label \{teal: refs.checkbox1.checked\}"&gt;\{ refs.checkbox1.checked ? 'on' : 'off' \}&lt;/span&gt;

&lt;script&gt;
  this.checkbox = \{
    checked: true,
    action: () =&gt; \{
      // Called after checkbox is checked.
      this.results.push('checkbox1 clicked')
      this.update()
    \}
  \}
&lt;/script&gt;</code></pre>
  </div>

  <p>A standard checkbox with inline option</p>
  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <su-checkbox checked="{ false }" action="{ checkboxClick }" ref="checkbox2">
      Make my profile visible
    </su-checkbox>
    <span class="ui tag label {teal: refs.checkbox2.checked}">{ refs.checkbox2.checked ? 'on' : 'off' }</span>
  </div>
  <div class="ui segment bottom attached inverted">
    <pre><code class="prettyprint">&lt;su-checkbox checked="\{ false \}" action="\{ checkboxClick \}" ref="checkbox2"/&gt;
  Make my profile visible
&lt;/su-checkbox&gt;

&lt;!-- checkbox state example --&gt;
&lt;span class="ui tag label \{teal: refs.checkbox2.checked\}"&gt;\{ refs.checkbox2.checked ? 'on' : 'off' \}&lt;/span&gt;

&lt;script&gt;
  this.click = () =&gt; \{
    this.results.push('checkbox2 clicked')
    this.update()
  \}
&lt;/script&gt;</code></pre>
  </div>

  <h3 class="ui header">Radio</h3>
  <p>A checkbox can be formatted as a radio element. This means it is an exclusive option.</p>
  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <su-radio name="radio1" action="{ radioClick }" value="1" checked="{ radio1 == 1 }">
      Radio choice1
    </su-radio>
    <su-radio name="radio1" action="{ radioClick }" value="2" checked="{ radio1 == 2 }">
      Radio choice2
    </su-radio>
    <span class=" ui tag label">Radio choice{ radio1 }</span>
  </div>
  <div class="ui segment bottom attached inverted">
    <pre><code class="prettyprint">&lt;su-radio name="radio1" action="\{ radioClick \}" value="1" checked="\{ radio1 == 1 \}"&gt;
  Radio choice1
&lt;/su-radio&gt;
&lt;su-radio name="radio1" action="\{ radioClick \}" value="2" checked="\{ radio1 == 2 \}""&gt;
  Radio choice2
&lt;/su-radio&gt;

&lt;script&gt;
  this.radio1 = 1
  this.radioClick = val =&gt; \{
    this.radio1 = val
    this.update()
  \}
&lt;/script&gt;</code></pre>
  </div>

  <h3 class="ui header">Slider</h3>
  <p>A checkbox can be formatted to emphasize the current selection state</p>
  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <su-checkbox type="{ 'slider' }">
      Accept terms and conditions
    </su-checkbox>
  </div>
  <div class="ui segment bottom attached inverted">
    <pre><code class="prettyprint">&lt;su-checkbox type="slider" /&gt;
  Accept terms and conditions
&lt;/su-checkbox&gt;</code></pre>
  </div>

  <p>A checkbox can be formatted to emphasize the current selection state</p>
  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <div class="ui form">
      <div class="grouped fields">
        <label>Outbound Throughput</label>
        <div class="field">
          <su-radio type="{ 'slider' }" name="throughput">
            20 mbps max
          </su-radio>
        </div>
        <div class="field">
          <su-radio type="{ 'slider' }" name="throughput">
            10mbps max
          </su-radio>
        </div>
        <div class="field">
          <su-radio type="{ 'slider' }" name="throughput">
            5mbps max
          </su-radio>
        </div>
        <div class="field">
          <su-radio type="{ 'slider' }" name="throughput">
            Unmetered
          </su-radio>
        </div>
      </div>
    </div>
  </div>
  <div class="ui segment bottom attached inverted">
    <pre><code class="prettyprint">&lt;div class=&quot;ui form&quot;&gt;
  &lt;div class=&quot;grouped fields&quot;&gt;
    &lt;label&gt;Outbound Throughput&lt;/label&gt;
    &lt;div class=&quot;field&quot;&gt;
      &lt;su-radio type=&quot;\{ &#039;slider&#039; \}&quot; name=&quot;throughput&quot;&gt;
        20 mbps max
      &lt;/su-radio&gt;
    &lt;/div&gt;
    &lt;div class=&quot;field&quot;&gt;
      &lt;su-radio type=&quot;\{ &#039;slider&#039; \}&quot; name=&quot;throughput&quot;&gt;
        10mbps max
      &lt;/su-radio&gt;
    &lt;/div&gt;
    &lt;div class=&quot;field&quot;&gt;
      &lt;su-radio type=&quot;\{ &#039;slider&#039; \}&quot; name=&quot;throughput&quot;&gt;
        5mbps max
      &lt;/su-radio&gt;
    &lt;/div&gt;
    &lt;div class=&quot;field&quot;&gt;
      &lt;su-radio type=&quot;\{ &#039;slider&#039; \}&quot; name=&quot;throughput&quot;&gt;
        Unmetered
      &lt;/su-radio&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
  </div>

  <ul>
    <li each="{ result in results }">{ result }</li>
  </ul>

  <script>
    this.results = []

    this.checkbox = {
      checked: true,
      action: () => {
        this.results.push('checkbox1 clicked')
        this.update()
      }
    }

    this.checkboxClick = () => {
      this.results.push('checkbox2 clicked')
      this.update()
    }

    this.radio1 = 1
    this.radioClick = val => {
      this.radio1 = val
      this.update()
    }

    this.on('mount', () => {
      PR.prettyPrint(false)
    })
  </script>
</demo-checkbox>
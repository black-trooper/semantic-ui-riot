<demo-checkbox>
  <h2>Checkbox</h2>

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

&lt;script&gt;
  this.checkbox = \{
    checked: true,
    action: () =&gt; \{
      this.results.push('checkbox1 clicked')
      this.update()
    \}
  \}
&lt;/script&gt;</code></pre>
  </div>

  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <su-checkbox checked="{ false }" action="{ click }" ref="checkbox2">
      Make my profile visible
    </su-checkbox>
    <span class="ui tag label {teal: refs.checkbox2.checked}">{ refs.checkbox2.checked ? 'on' : 'off' }</span>
  </div>
  <div class="ui segment bottom attached inverted">
    <pre><code class="prettyprint">&lt;su-checkbox checked="\{ false \}" action="\{ click \}" ref="checkbox2"/&gt;
  Make my profile visible
&lt;/su-checkbox&gt;

&lt;script&gt;
  this.click = () =&gt; \{
    this.results.push('checkbox2 clicked')
    this.update()
  \}
&lt;/script&gt;</code></pre>
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

    this.click = () => {
      this.results.push('checkbox2 clicked')
      this.update()
    }
  </script>
</demo-checkbox>
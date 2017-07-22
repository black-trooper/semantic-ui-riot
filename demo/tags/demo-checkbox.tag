<demo-checkbox>
  <h2>Checkbox</h2>

  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <su-checkbox checkbox="{ checkbox }" ref="checkbox1">
      Make my profile visible
    </su-checkbox>
    <div>{ refs.checkbox1.checked ? 'on' : 'off' }</div>
  </div>
  <div class="ui segment bottom attached">
    <pre><code class="code xml">&lt;su-checkbox checkbox="\{ checkbox \}" ref="checkbox1"/&gt;
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
    <br /> { refs.checkbox2.checked ? 'on' : 'off' }
  </div>
  <div class="ui segment bottom attached">
    <pre><code class="code xml">&lt;su-checkbox checked="\{ false \}" action="\{ click \}" ref="checkbox2"/&gt;
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
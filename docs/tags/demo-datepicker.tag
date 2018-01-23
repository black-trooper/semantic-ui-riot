<demo-datepicker>
  <h1 class="ui header">
    Datepicker
    <div class="sub header"></div>
  </h1>

  <!-- =================================================================================== -->
  <!--                                                                               Types -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <!-- ====================================================== -->
  <!--                                                  Basic -->
  <!--                                                  ===== -->
  <h3 class="ui header">Basic</h3>
  <p>A simple datepicker.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-datepicker ref="datepicker" />
      <div> { refs.datepicker.date }</div>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-datepicker ref="datepicker" />
      </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                  Popup -->
  <!--                                                  ===== -->
  <h3 class="ui header">Popup</h3>
  <p>A datepicker in a popup.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-datepicker popup="true" />
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-datepicker popup="true" />
      </code></pre>
    </div>
  </section>

  <script>
    this.toggleExample = event => {
      global.toggleExample(event.target)
    }

    this.on('mount', () => {
      PR.prettyPrint(false)

      this.refs.datepicker.on('click', () => {
        this.update()
      })
    })
  </script>
</demo-datepicker>
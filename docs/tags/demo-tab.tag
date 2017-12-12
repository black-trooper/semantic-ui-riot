<demo-tab>
  <h1 class="ui header">
    Tab
    <div class="sub header">A tab is a hidden section of content activated by a menu</div>
  </h1>

  <!-- =================================================================================== -->
  <!--                                                                               Types -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <!-- ====================================================== -->
  <!--                                                  Basic -->
  <!--                                                  ===== -->
  <h3 class="ui header">Basic</h3>
  <p>A basic tab.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset>
        <su-tab title="First">First content</su-tab>
        <su-tab title="Second">Second content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
          <su-tabset>
            <su-tab title="First">First content</su-tab>
            <su-tab title="Second">Second content</su-tab>
          </su-tabset>
      </code></pre>
    </div>
  </section>

  <script>
    this.toggleExample = event => {
      global.toggleExample(event.target)
    }

    this.on('mount', () => {
      PR.prettyPrint(false)
    })
  </script>
</demo-tab>
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

  <!-- ====================================================== -->
  <!--                                         Secondary Menu -->
  <!--                                         ============== -->
  <h3 class="ui header">Secondary Menu</h3>
  <p>A menu can adjust its appearance to de-emphasize its contents.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset class="secondary">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
          <su-tabset class="secondary">
            <su-tab title="Home">Home content</su-tab>
            <su-tab title="Messages">Messages content</su-tab>
            <su-tab title="Friends">Friends content</su-tab>
          </su-tabset>
      </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                               Pointing -->
  <!--                                               ======== -->
  <h3 class="ui header">Pointing</h3>
  <p>A menu can point to show its relationship to nearby content.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset class="pointing">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
          <su-tabset class="pointing">
            <su-tab title="Home">Home content</su-tab>
            <su-tab title="Messages">Messages content</su-tab>
            <su-tab title="Friends">Friends content</su-tab>
          </su-tabset>
      </code></pre>
    </div>
  </section>

  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset class="secondary pointing">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
          <su-tabset class="secondary pointing">
            <su-tab title="Home">Home content</su-tab>
            <su-tab title="Messages">Messages content</su-tab>
            <su-tab title="Friends">Friends content</su-tab>
          </su-tabset>
        </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                               Tabular -->
  <!--                                               ======== -->
  <h3 class="ui header">Tabular</h3>
  <p>A menu can be formatted to show tabs of information.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset class="tabular">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
          <su-tabset class="tabular">
            <su-tab title="Home">Home content</su-tab>
            <su-tab title="Messages">Messages content</su-tab>
            <su-tab title="Friends">Friends content</su-tab>
          </su-tabset>
      </code></pre>
    </div>
  </section>

  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset class="bottom tabular">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
          <su-tabset class="bottom tabular">
            <su-tab title="Home">Home content</su-tab>
            <su-tab title="Messages">Messages content</su-tab>
            <su-tab title="Friends">Friends content</su-tab>
          </su-tabset>
        </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                    Multiple Tab Groups -->
  <!--                                    =================== -->
  <h3 class="ui header">Multiple Tab Groups</h3>
  <p>There are a several of ways to include independent tab groups on the same page, even with history. One of the easiest ways
    is provide a specific parent context for each tab group.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset class="secondary">
        <su-tab title="First">
          <su-tabset class="top attached tabular">
            <su-tab title="1A">1A</su-tab>
            <su-tab title="1B" active="true">1B</su-tab>
            <su-tab title="1C">1C</su-tab>
          </su-tabset>
        </su-tab>
        <su-tab title="Second">
          <su-tabset class="top attached tabular">
            <su-tab title="2A">2A</su-tab>
            <su-tab title="2B">2B</su-tab>
            <su-tab title="2C">2C</su-tab>
          </su-tabset>
        </su-tab>
        <su-tab title="Third">
          <su-tabset class="top attached tabular">
            <su-tab title="3A">3A</su-tab>
            <su-tab title="3B">3B</su-tab>
            <su-tab title="3C">3C</su-tab>
          </su-tabset>
        </su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
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
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
      <su-tabset class="three column item">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-tabset class="three column item">
          <su-tab title="Home">Home content</su-tab>
          <su-tab title="Messages">Messages content</su-tab>
          <su-tab title="Friends">Friends content</su-tab>
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
  <!--                                               Attached -->
  <!--                                               ======== -->
  <h3 class="ui header">Attached</h3>
  <p>A menu can be formatted to show tabs of information.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset class="top attached">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
          <su-tabset class="top attached">
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
      <su-tabset class="bottom attached">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
          <su-tabset class="bottom attached">
            <su-tab title="Home">Home content</su-tab>
            <su-tab title="Messages">Messages content</su-tab>
            <su-tab title="Friends">Friends content</su-tab>
          </su-tabset>
        </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                Tabular -->
  <!--                                                ======= -->
  <h3 class="ui header">Tabular</h3>
  <p>A menu can be formatted to show tabs of information.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset class="top tabular">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
          <su-tabset class="top tabular">
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

  <!-- =================================================================================== -->
  <!--                                                                              States -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">States<a class="anchor" id="states"></a></h2>

  <!-- ====================================================== -->
  <!--                                                 Active -->
  <!--                                                 ====== -->
  <h3 class="ui header">Active</h3>
  <p>A menu item can be active.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset class="three column item">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages" active="true">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-tabset class="three column item">
          <su-tab title="Home">Home content</su-tab>
          <su-tab title="Messages" active="true">Messages content</su-tab>
          <su-tab title="Friends">Friends content</su-tab>
        </su-tabset>
      </code></pre>
    </div>
  </section>

  <!-- =================================================================================== -->
  <!--                                                                          Variations -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Variations<a class="anchor" id="variations"></a></h2>

  <!-- ====================================================== -->
  <!--                                               Inverted -->
  <!--                                               ======== -->
  <h3 class="ui header">Inverted</h3>
  <p>A menu may have its colors inverted to show greater contrast.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset class="inverted">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-tabset class="inverted">
          <su-tab title="Home">Home content</su-tab>
          <su-tab title="Messages">Messages content</su-tab>
          <su-tab title="Friends">Friends content</su-tab>
        </su-tabset>
      </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                Colored -->
  <!--                                                ======= -->
  <h3 class="ui header">Colored</h3>
  <p>Additional colors can be specified.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset>
        <su-tab title="red" title-class="red" class="red segment">Red</su-tab>
        <su-tab title="orange" title-class="orange" class="orange segment">Orange</su-tab>
        <su-tab title="yellow" title-class="yellow" class="yellow segment">Yellow</su-tab>
        <su-tab title="olive" title-class="olive" class="olive segment">Olive</su-tab>
        <su-tab title="green" title-class="green" class="green segment">Green</su-tab>
        <su-tab title="teal" title-class="teal" class="teal segment">Teal</su-tab>
        <su-tab title="blue" title-class="blue" class="blue segment">Blue</su-tab>
        <su-tab title="violet" title-class="violet" class="violet segment">Violet</su-tab>
        <su-tab title="purple" title-class="purple" class="purple segment">Purple</su-tab>
        <su-tab title="pink" title-class="pink" class="pink segment">Pink</su-tab>
        <su-tab title="brown" title-class="brown" class="brown segment">Brown</su-tab>
        <su-tab title="grey" title-class="grey" class="grey segment">Grey</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-tabset>
          <su-tab title="red" title-class="red" class="red segment">Red</su-tab>
          <su-tab title="orange" title-class="orange" class="orange segment">Orange</su-tab>
          <su-tab title="yellow" title-class="yellow" class="yellow segment">Yellow</su-tab>
          <su-tab title="olive" title-class="olive" class="olive segment">Olive</su-tab>
          <su-tab title="green" title-class="green" class="green segment">Green</su-tab>
          <su-tab title="teal" title-class="teal" class="teal segment">Teal</su-tab>
          <su-tab title="blue" title-class="blue" class="blue segment">Blue</su-tab>
          <su-tab title="violet" title-class="violet" class="violet segment">Violet</su-tab>
          <su-tab title="purple" title-class="purple" class="purple segment">Purple</su-tab>
          <su-tab title="pink" title-class="pink" class="pink segment">Pink</su-tab>
          <su-tab title="brown" title-class="brown" class="brown segment">Brown</su-tab>
          <su-tab title="grey" title-class="grey" class="grey segment">Grey</su-tab>
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
      <su-tabset class="red">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-tabset class="red">
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
      <su-tabset class="red">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-tabset class="red">
          <su-tab title="Home">Home content</su-tab>
          <su-tab title="Messages">Messages content</su-tab>
          <su-tab title="Friends">Friends content</su-tab>
        </su-tabset>
      </code></pre>
    </div>
  </section>

  <p>These colors can also be inverted.</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code link" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-tabset class="inverted">
        <su-tab title="red" title-class="red" class="red segment inverted">Red</su-tab>
        <su-tab title="orange" title-class="orange" class="orange segment inverted">Orange</su-tab>
        <su-tab title="yellow" title-class="yellow" class="yellow segment inverted">Yellow</su-tab>
        <su-tab title="olive" title-class="olive" class="olive segment inverted">Olive</su-tab>
        <su-tab title="green" title-class="green" class="green segment inverted">Green</su-tab>
        <su-tab title="teal" title-class="teal" class="teal segment inverted">Teal</su-tab>
        <su-tab title="blue" title-class="blue" class="blue segment inverted">Blue</su-tab>
        <su-tab title="violet" title-class="violet" class="violet segment inverted">Violet</su-tab>
        <su-tab title="purple" title-class="purple" class="purple segment inverted">Purple</su-tab>
        <su-tab title="pink" title-class="pink" class="pink segment inverted">Pink</su-tab>
        <su-tab title="brown" title-class="brown" class="brown segment inverted">Brown</su-tab>
        <su-tab title="grey" title-class="grey" class="grey segment inverted">Grey</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
          <su-tabset class="inverted">
            <su-tab title="red" title-class="red" class="red segment inverted">Red</su-tab>
            <su-tab title="orange" title-class="orange" class="orange segment inverted">Orange</su-tab>
            <su-tab title="yellow" title-class="yellow" class="yellow segment inverted">Yellow</su-tab>
            <su-tab title="olive" title-class="olive" class="olive segment inverted">Olive</su-tab>
            <su-tab title="green" title-class="green" class="green segment inverted">Green</su-tab>
            <su-tab title="teal" title-class="teal" class="teal segment inverted">Teal</su-tab>
            <su-tab title="blue" title-class="blue" class="blue segment inverted">Blue</su-tab>
            <su-tab title="violet" title-class="violet" class="violet segment inverted">Violet</su-tab>
            <su-tab title="purple" title-class="purple" class="purple segment inverted">Purple</su-tab>
            <su-tab title="pink" title-class="pink" class="pink segment inverted">Pink</su-tab>
            <su-tab title="brown" title-class="brown" class="brown segment inverted">Brown</su-tab>
            <su-tab title="grey" title-class="grey" class="grey segment inverted">Grey</su-tab>
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
      <su-tabset class="red inverted">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Messages">Messages content</su-tab>
        <su-tab title="Friends">Friends content</su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-tabset class="red inverted">
          <su-tab title="Home">Home content</su-tab>
          <su-tab title="Messages">Messages content</su-tab>
          <su-tab title="Friends">Friends content</su-tab>
        </su-tabset>
      </code></pre>
    </div>
  </section>

  <!-- =================================================================================== -->
  <!--                                                                            Multiple -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Multiple<a class="anchor" id="multiple"></a></h2>

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
          <su-tabset class="top tabular">
            <su-tab title="1A">1A</su-tab>
            <su-tab title="1B" active="true">1B</su-tab>
            <su-tab title="1C">1C</su-tab>
          </su-tabset>
        </su-tab>
        <su-tab title="Second">
          <su-tabset class="top tabular">
            <su-tab title="2A">2A</su-tab>
            <su-tab title="2B">2B</su-tab>
            <su-tab title="2C">2C</su-tab>
          </su-tabset>
        </su-tab>
        <su-tab title="Third">
          <su-tabset class="top tabular">
            <su-tab title="3A">3A</su-tab>
            <su-tab title="3B">3B</su-tab>
            <su-tab title="3C">3C</su-tab>
          </su-tabset>
        </su-tab>
      </su-tabset>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
          <su-tabset class="secondary">
            <su-tab title="First">
              <su-tabset class="top tabular">
                <su-tab title="1A">1A</su-tab>
                <su-tab title="1B" active="true">1B</su-tab>
                <su-tab title="1C">1C</su-tab>
              </su-tabset>
            </su-tab>
            <su-tab title="Second">
              <su-tabset class="top tabular">
                <su-tab title="2A">2A</su-tab>
                <su-tab title="2B">2B</su-tab>
                <su-tab title="2C">2C</su-tab>
              </su-tabset>
            </su-tab>
            <su-tab title="Third">
              <su-tabset class="top tabular">
                <su-tab title="3A">3A</su-tab>
                <su-tab title="3B">3B</su-tab>
                <su-tab title="3C">3C</su-tab>
              </su-tabset>
            </su-tab>
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
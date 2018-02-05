<demo-popup>
  <h1 class="ui header">
    Popup
    <div class="sub header">A popup displays additional information on top of a page </div>
  </h1>

  <!-- =================================================================================== -->
  <!--                                                                               Types -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <!-- ====================================================== -->
  <!--                                                  Popup -->
  <!--                                                  ===== -->
  <h3 class="ui header">Popup</h3>
  <p>An element can specify popup content to appear</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-popup class="ui icon button" tooltip="Add users to your feed" position="top left">Top Left</su-popup>
      <su-popup class="ui icon button" tooltip="Add users to your feed" position="top center">Top Center</su-popup>
      <su-popup class="ui icon button" tooltip="Add users to your feed" position="top right">Top Right</su-popup>
      <div class="ui divider"></div>
      <su-popup class="ui icon button" tooltip="Add users to your feed" position="bottom left">Bottom Left</su-popup>
      <su-popup class="ui icon button" tooltip="Add users to your feed" position="bottom center">Bottom Center</su-popup>
      <su-popup class="ui icon button" tooltip="Add users to your feed" position="bottom right">Bottom Right</su-popup>
      <div class="ui divider"></div>
      <su-popup class="ui icon button" tooltip="Add users to your feed" position="right center">Right Center</su-popup>
      <su-popup class="ui icon button" tooltip="Add users to your feed" position="left center">Left Center</su-popup>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-popup class="ui icon button" tooltip="Add users to your feed" position="top left">Top Left</su-popup>
        <su-popup class="ui icon button" tooltip="Add users to your feed" position="top center">Top Center</su-popup>
        <su-popup class="ui icon button" tooltip="Add users to your feed" position="top right">Top Right</su-popup>
        <div class="ui divider"></div>
        <su-popup class="ui icon button" tooltip="Add users to your feed" position="bottom left">Bottom Left</su-popup>
        <su-popup class="ui icon button" tooltip="Add users to your feed" position="bottom center">Bottom Center</su-popup>
        <su-popup class="ui icon button" tooltip="Add users to your feed" position="bottom right">Bottom Right</su-popup>
        <div class="ui divider"></div>
        <su-popup class="ui icon button" tooltip="Add users to your feed" position="right center">Right Center</su-popup>
        <su-popup class="ui icon button" tooltip="Add users to your feed" position="left center">Left Center</su-popup>
      </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                 Titled -->
  <!--                                                 ====== -->
  <h3 class="ui header">Titled</h3>
  <p>An element can specify popup content with a title</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-popup data-title="Elliot Fu" tooltip="Elliot has been a member since July 2012"><img src="/images/avatar/small/elliot.jpg" class="ui avatar image" /></su-popup>
      <su-popup data-title="Stevie Feliciano" tooltip="Stevie has been a member since August 2013"><img src="/images/avatar/small/stevie.jpg" class="ui avatar image" /></su-popup>
      <su-popup data-title="Matt" tooltip="Matt has been a member since July 2014"><img src="/images/avatar/small/matt.jpg" class="ui avatar image" /></su-popup>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-popup data-title="Elliot Fu" tooltip="Elliot has been a member since July 2012"><img src="/images/avatar/small/elliot.jpg" class="ui avatar image" /></su-popup>
        <su-popup data-title="Stevie Feliciano" tooltip="Stevie has been a member since August 2013"><img src="/images/avatar/small/stevie.jpg" class="ui avatar image" /></su-popup>
        <su-popup data-title="Matt" tooltip="Matt has been a member since July 2014"><img src="/images/avatar/small/matt.jpg" class="ui avatar image" /></su-popup>
      </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                   HTML -->
  <!--                                                   ==== -->
  <h3 class="ui header">HTML</h3>
  <p>An element can specify HTML for a popup</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-popup class="ui card">
        <div class="content">
          <div class="header">My Neighbor Totoro</div>
          <div class="description">
            Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding
            trees are inhabited by magical spirits.
          </div>
        </div>
        <div class="ui two bottom attached buttons">
          <div class="ui button">
            <i class="add icon"></i>
            Queue
          </div>
          <div class="ui primary button">
            <i class="play icon"></i>
            Watch
          </div>
        </div>

        <su-popup-content>
          <div class="header">User Rating</div>
          <div class="content">
            <div class="ui star rating">
              <i class="active icon"></i>
              <i class="active icon"></i>
              <i class="active icon"></i>
              <i class="icon"></i>
              <i class="icon"></i>
            </div>
          </div>
        </su-popup-content>
      </su-popup>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-popup class="ui card">
          <div class="content">
            <div class="header">My Neighbor Totoro</div>
            <div class="description">
              Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding
              trees are inhabited by magical spirits.
            </div>
          </div>
          <div class="ui two bottom attached buttons">
            <div class="ui button">
              <i class="add icon"></i>
              Queue
            </div>
            <div class="ui primary button">
              <i class="play icon"></i>
              Watch
            </div>
          </div>
  
          <su-popup-content>
            <div class="header">User Rating</div>
            <div class="content">
              <div class="ui star rating">
                <i class="active icon"></i>
                <i class="active icon"></i>
                <i class="active icon"></i>
                <i class="icon"></i>
                <i class="icon"></i>
              </div>
            </div>
          </su-popup-content>
        </su-popup>
      </code></pre>
    </div>
  </section>

  <!-- =================================================================================== -->
  <!--                                                                          Variations -->
  <!-- =================================================================================== -->
  <h2 class="ui dividing header">Variations<a class="anchor" id="variations"></a></h2>

  <!-- ====================================================== -->
  <!--                                                  Width -->
  <!--                                                  ===== -->
  <h3 class="ui header">Width</h3>
  <p>A popup can be extra wide to allow for longer content</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-popup tooltip="Hello. This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide."
        data-variation="wide">
        <i class="circular heart icon link"></i>
      </su-popup>
      <su-popup tooltip="Hello. This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide."
        data-variation="very wide">
        <i class="circular heart icon link"></i>
      </su-popup>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-popup tooltip="Hello. This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide."
          data-variation="wide">
          <i class="circular heart icon link"></i>
        </su-popup>
        <su-popup tooltip="Hello. This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide."
          data-variation="very wide">
          <i class="circular heart icon link"></i>
        </su-popup>
      </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                                  Fluid -->
  <!--                                                  ===== -->
  <!--
  <h3 class="ui header">Fluid</h3>
  <p>A fluid popup will take up the entire width of its offset container</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-popup data-variation="fluid">
        <div class="ui button">Show fluid popup</div>

        <su-popup-content>
          <div class="ui four column divided center aligned grid">
            <div class="column">1</div>
            <div class="column">2</div>
            <div class="column">3</div>
            <div class="column">4</div>
          </div>
        </su-popup-content>
      </su-popup>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
      </code></pre>
    </div>
  </section>
  -->

  <!-- ====================================================== -->
  <!--                                                   Size -->
  <!--                                                   ==== -->
  <h3 class="ui header">Size</h3>
  <p>A popup can vary in size</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-popup tooltip="Hello. This is a mini popup" data-variation="mini">
        <i class="circular heart icon link"></i>
      </su-popup>
      <su-popup tooltip="Hello. This is a tiny popup" data-variation="tiny">
        <i class="circular heart icon link"></i>
      </su-popup>
      <su-popup tooltip="Hello. This is a small popup" data-variation="small">
        <i class="circular heart icon link"></i>
      </su-popup>
      <su-popup tooltip="Hello. This is a large popup" data-variation="large">
        <i class="circular heart icon link"></i>
      </su-popup>
      <su-popup tooltip="Hello. This is a huge popup" data-variation="huge">
        <i class="circular heart icon link"></i>
      </su-popup>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-popup tooltip="Hello. This is a mini popup" data-variation="mini">
          <i class="circular heart icon link"></i>
        </su-popup>
        <su-popup tooltip="Hello. This is a tiny popup" data-variation="tiny">
          <i class="circular heart icon link"></i>
        </su-popup>
        <su-popup tooltip="Hello. This is a small popup" data-variation="small">
          <i class="circular heart icon link"></i>
        </su-popup>
        <su-popup tooltip="Hello. This is a large popup" data-variation="large">
          <i class="circular heart icon link"></i>
        </su-popup>
        <su-popup tooltip="Hello. This is a huge popup" data-variation="huge">
          <i class="circular heart icon link"></i>
        </su-popup>
      </code></pre>
    </div>
  </section>

  <!-- ====================================================== -->
  <!--                                               Inverted -->
  <!--                                               ======== -->
  <h3 class="ui header">Inverted</h3>
  <p>A popup can have its colors inverted</p>
  <section>
    <div class="ui segment secondary top attached example">
      Example
      <i class="icon code" onclick="{ toggleExample }"></i>
    </div>
    <div class="ui segment bottom attached">
      <su-popup tooltip="Hello. This is a mini popup" data-variation="inverted">
        <i class="circular heart icon link"></i>
      </su-popup>
      <su-popup class="ui icon button" tooltip="Hello. This is an inverted popup" data-variation="inverted">
        <i class="add icon"></i>
      </su-popup>
    </div>
    <div class="ui segment bottom attached inverted transition hidden">
      <pre><code class="prettyprint">
        <su-popup tooltip="Hello. This is a mini popup" data-variation="inverted">
          <i class="circular heart icon link"></i>
        </su-popup>
        <su-popup class="ui icon button" tooltip="Hello. This is an inverted popup" data-variation="inverted">
          <i class="add icon"></i>
        </su-popup>
      </code></pre>
    </div>
  </section>
</demo-popup>
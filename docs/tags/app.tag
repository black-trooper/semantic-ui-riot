<app>
  <div class="ui inverted vertical left fixed menu">
    <div class="item"><strong>Semantic UI Riot</strong></div>

    <div class="item">
      <div class="header">Getting Started</div>
      <div class="menu">
        <a class="item" href="#">Introduction</a>
        <a href="https://github.com/black-trooper/semantic-ui-riot" class="item">
          <i aria-hidden="true" class="github icon"></i>
          GitHub
        </a>
      </div>
    </div>

    <div class="item">
      <div class="header">Module</div>
      <div class="menu">
        <a class="item" href="#demo-checkbox">Checkbox</a>
        <a class="item" href="#demo-dropdown">Dropdown</a>
        <a class="item" href="#demo-modal">Modal</a>
      </div>
    </div>
  </div>
  <div style="margin-left:15.5rem">
    <div class="ui padded one column grid">
      <div class="column">
        <content></content>
      </div>
    </div>
  </div>

  <script>
    route('', () => {
      riot.mount('content', 'root')
    })

    route(collection => {
      riot.mount('content', collection)
    })

    route.start(true)
  </script>
</app>
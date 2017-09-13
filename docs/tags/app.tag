<app>
  <navigation></navigation>
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
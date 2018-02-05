<app>
  <navigation></navigation>
  <div style="margin-left:15.5rem">
    <div class="ui padded one column grid">
      <div class="column">
        <content></content>
      </div>
    </div>
  </div>

  <style>
    pre {
      margin: 0;
    }
  </style>

  <script>
    route('', () => {
      riot.mount('content', 'root')
    })

    route(collection => {
      riot.mount('content', collection)
    })

    route.start(true)

    riot.mixin({
      init() {
        this.on('mount', () => {
          PR.prettyPrint(false)
        })
      },

      toggleExample: event => {
        const childs = event.target.parentElement.parentElement.childNodes
        const segments = Array.from(childs).filter(element => element.classList && element.classList.contains('segment'))
        if (segments[2].classList.contains('hidden')) {
          segments[1].classList.remove('bottom')
          segments[2].classList.remove('hidden')
        } else {
          segments[1].classList.remove('attached')
          segments[1].classList.add('bottom')
          segments[1].classList.add('attached')
          segments[2].classList.add('hidden')
        }
      }
    });
  </script>
</app>
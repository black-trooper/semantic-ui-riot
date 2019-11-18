<su-loading>
  <div class="ui page dimmer inverted {active: counter > 0}">
    <div class="ui huge text loader">Loading</div>
  </div>
  <style>
    .ui.dimmer {
      z-index: 20000
    }
  </style>
  <script>
    const self = this
    self.counter = 0
    this.mixin('semantic-ui')

    this.observable.on('showLoading', visible => {
      if (visible) {
        self.counter++
      } else {
        self.counter--
      }
      this.update()
    })

    riot.mixin({
      suLoading(visible) {
        self.observable.trigger('showLoading', visible)
      }
    })
  </script>
</su-loading>
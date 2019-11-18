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
    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.counter = 0

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    tag.mixin('semantic-ui')
    tag.observable.on('showLoading', showLoading)

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========
    riot.mixin({
      suLoading
    })

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
    function showLoading(visible) {
      if (visible) {
        tag.counter++
      } else {
        tag.counter--
      }
      tag.update()
    }

    function suLoading(visible) {
      tag.observable.trigger('showLoading', visible)
    }
  </script>
</su-loading>
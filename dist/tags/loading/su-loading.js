riot.tag2('su-loading', '<div class="ui page dimmer inverted {active: counter > 0}"> <div class="ui huge text loader">Loading</div> </div>', 'su-loading .ui.dimmer,[data-is="su-loading"] .ui.dimmer{ z-index: 20000 }', '', function(opts) {
    const tag = this

    tag.counter = 0

    tag.mixin('semantic-ui')
    tag.observable.on('showLoading', showLoading)

    riot.mixin({
      suLoading
    })

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
});
<su-modal class="ui dimmer modals page transition { transitionStatus }" onclick="{ dimmerClose }">
  <div class="ui modal transition visible active {opts.class}" onclick="{ clickModal }">
    <i class="close icon" if="{ isFullscreen() }" onclick="{ hide }"></i>
    <div class="ui header { icon: opts.modal.heading.icon }" if="{ opts.modal.heading }">
      <i class="icon { opts.modal.heading.icon }" if="{ opts.modal.heading.icon }"></i>
      { (opts.modal.heading.text) ? opts.modal.heading.text : opts.modal.heading }
    </div>
    <div class="content { image: isImageContent() }" ref="content">
      <yield />
    </div>
    <div class="actions">
      <div each="{ opts.modal.buttons }" class="ui button { type } { labeled: icon && text } { icon: icon } { inverted: isBasic() }"
        onclick="{ parent.click.bind(this, text, action) }">
        { text }
        <i class="icon { icon }" if="{ icon }"></i>
      </div>
    </div>
  </div>
  <style>
    :scope.ui.dimmer.visible.transition {
      display: flex !important;
      align-items: center;
      justify-content: center;
    }

    .ui.modal {
      top: auto;
      left: auto;
      position: relative;
      margin: 0 !important;
    }
  </style>

  <script>
    let image_content = false
    if (!opts.modal) {
      opts.modal = {}
    }

    this.on('mount', () => {
      if (typeof opts.modal.closable === 'undefined') {
        opts.modal.closable = true
      }
    })

    this.on('update', () => {
      if (this.refs.content.getElementsByTagName('img').length > 0) {
        image_content = true
      }
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.show = () => {
      this.transitionStatus = 'animating fade in visible'
      this.update()
      this.trigger('show')

      setTimeout(() => {
        this.transitionStatus = 'visible active'
        this.update()
      }, 500)
    }

    this.click = (text, action) => {
      this.trigger('hide', action || text)
      close()
    }

    this.dimmerClose = () => {
      if (opts.modal.closable && !this.isBasic()) {
        this.trigger('hide')
        close()
      }
    }

    this.clickModal = event => {
      event.stopPropagation()
    }

    this.hide = () => {
      this.trigger('hide')
      close()
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    let close = () => {
      this.transitionStatus = 'animating fade out visible active'
      this.update()

      setTimeout(() => {
        this.transitionStatus = ''
        this.update()
      }, 300)
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.isFullscreen = () => {
      return this.root.classList.contains('fullscreen')
    }

    this.isBasic = () => {
      return this.root.classList.contains('basic')
    }

    this.isImageContent = () => {
      return image_content
    }
  </script>
</su-modal>
<su-modal class="ui dimmer modals page transition { transitionStatus }" onclick="{ dimmerClose }">
  <div class="ui modal transition visible active {opts.class}" onclick="{ clickModal }">
    <i class="close icon" if="{ isFullscreen() }" onclick="{ hide }"></i>
    <div class="ui header { icon: opts.modal.heading.icon }">
      <i class="icon { opts.modal.heading.icon }" if="{ opts.modal.heading.icon }"></i>
      { (opts.modal.heading.text) ? opts.modal.heading.text : opts.modal.heading }
    </div>
    <div class="content { image: isImageContent() }" ref="content">
      <yield />
    </div>
    <div class="actions">
      <div each="{ opts.modal.buttons }" class="ui button { type } { labeled: icon && text } { icon: icon } { inverted: isBasic() }"
        onclick="{ parent.click.bind(this, action) }">
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

    this.on('mount', () => {
      if (!opts.modal) {
        opts.modal = {}
      }
      if (typeof opts.modal.closable === 'undefined') {
        opts.modal.closable = true
      }
    })

    this.on('update', () => {
      if (opts.modal.visible) {
        this.transitionStatus = 'animating fade in visible'
        setTimeout(() => {
          this.transitionStatus = 'visible'
          this.update()
        }, 500)
      }
      if (this.refs.content.getElementsByTagName('img').length > 0) {
        image_content = true
      }
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = action => {
      if (action && toString.call(action).slice(8, -1).toLowerCase() === 'function') {
        action()
      }
      close()
    }

    this.dimmerClose = () => {
      if (opts.modal.closable && !this.isBasic()) {
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
      opts.modal.visible = false
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
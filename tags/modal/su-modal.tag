<su-modal class="ui dimmer modals page transition { transitionStatus }" onclick="{ dimmerClose }">
  <div class="ui modal transition visible active {opts.class}" onclick="{ clickModal }" id="{ getId() }">
    <i class="close icon" if="{ isFullscreen() }" onclick="{ hide }"></i>
    <div class="ui header { icon: opts.modal.header.icon }" if="{ opts.modal.header }">
      <i class="icon { opts.modal.header.icon }" if="{ opts.modal.header.icon }"></i>
      { (opts.modal.header.text) ? opts.modal.header.text : opts.modal.header }
    </div>
    <div class="content { image: isImageContent() }" ref="content">
      <yield />
    </div>
    <div class="actions">
      <div each="{ opts.modal.buttons }" class="ui button { type } { labeled: icon && text } { icon: icon } { inverted: isBasic() } { disabled: disabled }"
        onclick="{ parent.click }">
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

    .ui.fullscreen.modal {
      left: 0!important;
    }
  </style>

  <script>
    let image_content = false
    let openning, closing, visible

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
      if (openning || closing || visible) {
        return
      }
      openning = true
      this.transitionStatus = 'animating fade in visible'
      this.update()
      this.trigger('show')

      setTimeout(() => {
        openning = false
        visible = true
        this.transitionStatus = 'visible active'
        this.update()
      }, 500)
    }

    this.click = event => {
      this.trigger(event.item.action || event.item.text)
      if (typeof event.item.closable === 'undefined' || event.item.closable) {
        this.hide()
      }
    }

    this.dimmerClose = () => {
      if (opts.modal.closable && !this.isBasic()) {
        this.hide()
      }
    }

    this.clickModal = event => {
      event.stopPropagation()
    }

    this.hide = () => {
      if (openning || closing || !visible) {
        return
      }
      closing = true
      this.transitionStatus = 'animating fade out visible active'
      this.update()
      this.trigger('hide')

      setTimeout(() => {
        closing = false
        visible = false
        this.transitionStatus = ''
        this.update()
      }, 300)
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const isContainsClassName = className => {
      const modalElement = document.getElementById(this.getId())
      if (!modalElement) {
        return false
      }
      return modalElement.classList.contains(className)
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.getId = () => {
      return `su-modal-${this._riot_id}`
    }

    this.isFullscreen = () => {
      return isContainsClassName('fullscreen')
    }

    this.isBasic = () => {
      return isContainsClassName('basic')
    }

    this.isImageContent = () => {
      return image_content
    }
  </script>
</su-modal>
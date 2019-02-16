<su-modal onclick="{ dimmerClose }">
  <div class="ui dimmer modals page transition { transitionStatus }">
    <div class="ui modal transition visible active {opts.class}" onclick="{ clickModal }" id="{ getId() }">
      <i class="close icon" if="{ opts.modal.closable && !isBasic() }" onclick="{ hide }"></i>
      <div class="ui header { icon: opts.modal.header.icon }" if="{ opts.modal.header }">
        <i class="icon { opts.modal.header.icon }" if="{ opts.modal.header.icon }"></i>
        { (opts.modal.header.text) ? opts.modal.header.text : opts.modal.header }
      </div>
      <div class="content { image: isImageContent() }" ref="content">
        <yield />
      </div>
      <div class="actions">
        <button each="{ button in opts.modal.buttons }" onclick="{ parent.click }" ref="button_{ button.text }" type="button"
          class="ui button { button.type } { labeled: button.icon && button.text } { icon: button.icon } { inverted: parent.isBasic() } { disabled: button.disabled }">
          { button.text }
          <i class="icon { button.icon }" if="{ button.icon }"></i>
        </button>
      </div>
    </div>
  </div>
  <style>
    .ui.dimmer.visible.transition {
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
      left: 0 !important;
    }

    @media only screen and (min-width: 768px) {
      .ui.modal>.close {
        display: none;
      }

      .ui.fullscreen.modal>.close {
        display: inline;
      }
    }
  </style>

  <script>
    const tag = this
    let image_content = false
    let openning, closing, visible

    if (!opts.modal) {
      opts.modal = {}
    }

    tag.on('mount', () => {
      if (typeof opts.modal.closable === 'undefined') {
        opts.modal.closable = true
      }
    })

    tag.on('update', () => {
      if (tag.refs.content.getElementsByTagName('img').length > 0) {
        image_content = true
      }
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    tag.show = () => {
      if (openning || closing || visible) {
        return
      }
      openning = true
      tag.transitionStatus = 'animating fade in visible'
      tag.update()
      setDefaultFocus()
      tag.trigger('show')

      setTimeout(() => {
        openning = false
        visible = true
        tag.transitionStatus = 'visible active'
        tag.update()
      }, 500)
    }

    tag.click = event => {
      tag.trigger(event.item.action || event.item.text)
      if (typeof event.item.closable === 'undefined' || event.item.closable) {
        tag.hide()
      }
    }

    tag.dimmerClose = () => {
      if (opts.modal.closable && !tag.isBasic()) {
        tag.hide()
      }
    }

    tag.clickModal = event => {
      event.stopPropagation()
    }

    tag.hide = () => {
      if (openning || closing || !visible) {
        return
      }
      closing = true
      tag.transitionStatus = 'animating fade out visible active'
      tag.update()
      tag.trigger('hide')

      setTimeout(() => {
        closing = false
        visible = false
        tag.transitionStatus = ''
        tag.update()
      }, 300)
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const isContainsClassName = className => {
      const modalElement = document.getElementById(tag.getId())
      if (!modalElement) {
        return false
      }
      return modalElement.classList.contains(className)
    }

    const setDefaultFocus = () => {
      if (!opts.modal || !opts.modal.buttons || opts.modal.buttons.length == 0) {
        return
      }
      if (opts.modal.buttons.some(button => button.default)) {
        const text = opts.modal.buttons.filter(button => button.default)[0].text
        tag.refs[`button_${text}`].focus()
      }
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    tag.getId = () => {
      return `su-modal-${tag._riot_id}`
    }

    tag.isBasic = () => {
      return isContainsClassName('basic')
    }

    tag.isImageContent = () => {
      return image_content
    }
  </script>
</su-modal>
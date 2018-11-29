riot.tag2('su-modal', '<div class="ui dimmer modals page transition {transitionStatus}"> <div class="ui modal transition visible active {opts.class}" onclick="{clickModal}" id="{getId()}"> <i class="close icon" if="{opts.modal.closable && !this.isBasic()}" onclick="{hide}"></i> <div class="ui header {icon: opts.modal.header.icon}" if="{opts.modal.header}"> <i class="icon {opts.modal.header.icon}" if="{opts.modal.header.icon}"></i> {(opts.modal.header.text) ? opts.modal.header.text : opts.modal.header} </div> <div class="content {image: isImageContent()}" ref="content"> <yield></yield> </div> <div class="actions"> <button each="{opts.modal.buttons}" class="ui button {type} {labeled: icon && text} {icon: icon} {inverted: isBasic()} {disabled: disabled}" onclick="{parent.click}" ref="button_{text}"> {text} <i class="icon {icon}" if="{icon}"></i> </button> </div> </div> </div>', 'su-modal .ui.dimmer.visible.transition,[data-is="su-modal"] .ui.dimmer.visible.transition{ display: flex !important; align-items: center; justify-content: center; } su-modal .ui.modal,[data-is="su-modal"] .ui.modal{ top: auto; left: auto; position: relative; margin: 0 !important; } su-modal .ui.fullscreen.modal,[data-is="su-modal"] .ui.fullscreen.modal{ left: 0 !important; } @media only screen and (min-width: 768px) { su-modal .ui.modal>.close,[data-is="su-modal"] .ui.modal>.close{ display: none; } su-modal .ui.fullscreen.modal>.close,[data-is="su-modal"] .ui.fullscreen.modal>.close{ display: inline; } }', 'onclick="{dimmerClose}"', function(opts) {
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

    this.show = () => {
      if (openning || closing || visible) {
        return
      }
      openning = true
      this.transitionStatus = 'animating fade in visible'
      this.update()
      setDefaultFocus()
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

    const isContainsClassName = className => {
      const modalElement = document.getElementById(this.getId())
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
        this.refs[`button_${text}`].focus()
      }
    }

    this.getId = () => {
      return `su-modal-${this._riot_id}`
    }

    this.isBasic = () => {
      return isContainsClassName('basic')
    }

    this.isImageContent = () => {
      return image_content
    }
});
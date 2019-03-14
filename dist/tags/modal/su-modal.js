riot.tag2('su-modal', '<div class="ui dimmer modals page transition {transitionStatus}"> <div class="ui modal transition visible active {opts.class}" onclick="{clickModal}" id="{getId()}"> <i class="close icon" if="{opts.modal.closable && !isBasic()}" onclick="{hide}"></i> <div class="ui header {icon: opts.modal.header.icon}" if="{opts.modal.header}"> <i class="icon {opts.modal.header.icon}" if="{opts.modal.header.icon}"></i> {getTitle()} </div> <div class="content {image: isImageContent()}" ref="content"> <yield></yield> </div> <div class="actions"> <button each="{button in opts.modal.buttons}" onclick="{click}" ref="button_{button.text}" type="button" class="ui button {button.type} {labeled: button.icon && button.text} {icon: button.icon} {inverted: isBasic()} {disabled: button.disabled}"> {button.text} <i class="icon {button.icon}" if="{button.icon}"></i> </button> </div> </div> </div>', 'su-modal .ui.dimmer.visible.transition,[data-is="su-modal"] .ui.dimmer.visible.transition{ display: flex !important; align-items: center; justify-content: center; } su-modal .ui.modal,[data-is="su-modal"] .ui.modal{ top: auto; left: auto; position: relative; margin: 0 !important; } su-modal .ui.fullscreen.modal,[data-is="su-modal"] .ui.fullscreen.modal{ left: 0 !important; } @media only screen and (min-width: 768px) { su-modal .ui.modal>.close,[data-is="su-modal"] .ui.modal>.close{ display: none; } su-modal .ui.fullscreen.modal>.close,[data-is="su-modal"] .ui.fullscreen.modal>.close{ display: inline; } }', 'onclick="{dimmerClose}"', function(opts) {
    const tag = this

    tag.click = click
    tag.clickModal = clickModal
    tag.dimmerClose = dimmerClose
    tag.getId = getId
    tag.getTitle = getTitle
    tag.hide = hide
    tag.isBasic = isBasic
    tag.isImageContent = isImageContent
    tag.show = show
    tag.on('before-mount', onBeforeMount)
    tag.on('mount', onMount)
    tag.on('update', onUpdate)

    let image_content = false
    let openning, closing, visible

    function onBeforeMount() {
      if (!opts.modal) {
        opts.modal = {}
      }
    }

    function onMount() {
      if (typeof opts.modal.closable === 'undefined') {
        opts.modal.closable = true
      }
    }

    function onUpdate() {
      if (tag.refs.content.getElementsByTagName('img').length > 0) {
        image_content = true
      }
    }

    function show() {
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

    function click(event) {
      tag.trigger(event.item.action || event.item.text)
      if (typeof event.item.closable === 'undefined' || event.item.closable) {
        tag.hide()
      }
    }

    function dimmerClose() {
      if (opts.modal.closable && !tag.isBasic()) {
        tag.hide()
      }
    }

    function clickModal(event) {
      event.stopPropagation()
    }

    function hide() {
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

    function isContainsClassName(className) {
      const modalElement = document.getElementById(tag.getId())
      if (!modalElement) {
        return false
      }
      return modalElement.classList.contains(className)
    }

    function setDefaultFocus() {
      if (!opts.modal || !opts.modal.buttons || opts.modal.buttons.length == 0) {
        return
      }
      if (opts.modal.buttons.some(button => button.default)) {
        const text = opts.modal.buttons.filter(button => button.default)[0].text
        tag.refs[`button_${text}`].focus()
      }
    }

    function getTitle() {
      if (opts.modal.header.text) {
        return opts.modal.header.text
      }
      return opts.modal.header
    }

    function getId() {
      return `su-modal-${tag._riot_id}`
    }

    function isBasic() {
      return isContainsClassName('basic')
    }

    function isImageContent() {
      return image_content
    }
});
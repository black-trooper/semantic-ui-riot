<su-modal onclick="{ dimmerClose }">
  <div class="ui dimmer modals page transition { transitionStatus } { modeless: isDimmerModeless() }">
    <div class="ui modal transition visible active {opts.class}" onclick="{ clickModal }" id="{ getId() }">
      <div class="ui header { icon: opts.modal.header.icon }" if="{ opts.modal.header }">
        <i class="icon { opts.modal.header.icon }" if="{ opts.modal.header.icon }"></i>
        { getTitle() }
      </div>
      <virtual if="{ isModeless() && !isBasic() }">
        <i class="window minimize icon" onclick="{ toggleMinimize }"></i>
        <i class="window restore icon" if="{ maximized }" onclick="{ toggleSize }"></i>
        <i class="window maximize icon" if="{ !maximized }" onclick="{ toggleSize }"></i>
      </virtual>
      <i class="close icon" if="{ opts.modal.closable && !isBasic() }" onclick="{ hide }"></i>
      <div class="content { image: isImageContent() } { scrolling: isScrollingContent() }" ref="content">
        <yield />
      </div>
      <div class="actions">
        <button each="{ button in opts.modal.buttons }" onclick="{ click.bind(this, button) }" ref="button_{ button.text }" type="button"
          class="ui button { button.type } { labeled: button.icon && button.text } { icon: button.icon } { inverted: isBasic() } { disabled: button.disabled }">
          { button.text }
          <i class="icon { button.icon }" if="{ button.icon }"></i>
        </button>
      </div>
    </div>
  </div>
  <a class="ui grey big label unminimize" if="{ minimized }" onclick="{ toggleMinimize }">
    <i class="angle double up icon"></i>
    { opts.modal.header }
  </a>

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

    /* modeless */
    .ui.dimmer.modeless {
      visibility: hidden !important;
      display: block !important;
    }

    .ui.dimmer.modeless>.ui.modal {
      position: absolute;
      right: 0;
      bottom: 0;
    }

    .ui.modal.modeless>.restore,
    .ui.modal.modeless>.maximize {
      right: 1rem;
    }

    .ui.modal.modeless>.minimize {
      right: 4rem;
    }

    .ui.modal.modeless>.icon {
      display: inline;
      top: 1.0535rem;
      color: rgba(0, 0, 0, .87);
      cursor: pointer;
      position: absolute;
      z-index: 1;
      opacity: 0.8;
      font-size: 1.25em;
      width: 2.25rem;
      height: 2.25rem;
      padding: 0.625rem 0rem 0rem 0rem;
    }

    .unminimize.label {
      position: fixed;
      right: 0;
      bottom: -6px;
      padding-bottom: 1rem;
      z-index: 1000;
    }
  </style>

  <script>
    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.transitionStatus = ''
    tag.minimized = false
    tag.maximized = true

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    tag.click = click
    tag.clickModal = clickModal
    tag.dimmerClose = dimmerClose
    tag.getId = getId
    tag.getTitle = getTitle
    tag.hide = hide
    tag.isBasic = isBasic
    tag.isImageContent = isImageContent
    tag.isModeless = isModeless
    tag.isDimmerModeless = isDimmerModeless
    tag.isScrollingContent = isScrollingContent
    tag.toggleSize = toggleSize
    tag.toggleMinimize = toggleMinimize
    tag.show = show
    tag.on('before-mount', onBeforeMount)
    tag.on('mount', onMount)
    tag.on('update', onUpdate)

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========
    let image_content = false
    let scrolling_content = false
    let modeless = false
    let openning, closing, visible

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
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
      image_content = tag.refs.content.getElementsByTagName('img').length > 0
      scrolling_content = hasClass('scrolling')
      modeless = hasClass('modeless')
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

    function click(item) {
      tag.trigger(item.action || item.text)
      if (typeof item.closable === 'undefined' || item.closable) {
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

    function toggleSize() {
      tag.maximized = !tag.maximized
      tag.update()
      tag.trigger('toggleSize', tag.maximized)
    }

    function toggleMinimize() {
      tag.minimized = !tag.minimized
      tag.transitionStatus = tag.minimized ? '' : 'visible active'
      tag.update()
      tag.trigger('toggleMinimize', tag.minimized)
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

    function isModeless() {
      return !opts.modal.closable && modeless
    }

    function isDimmerModeless() {
      return isModeless() && !tag.minimized && !tag.maximized
    }

    function isScrollingContent() {
      return scrolling_content
    }

    function hasClass(className) {
      return tag.root.classList.contains(className)
    }
  </script>
</su-modal>
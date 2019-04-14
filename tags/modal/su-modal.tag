<su-modal onclick="{ onClickDimmer }">
  <div class="ui dimmer modals page transition { status.transition }">
    <div class="ui modal transition visible active {props.class}" onclick="{ onClickModal }">
      <i class="close icon" if="{ this.closable && !basic }" onclick="{ onClickHide }"></i>
      <div class="ui header { headerClass }" if="{ this.header }">
        <i class="icon { this.header.icon }" if="{ this.header.icon }"></i>
        { title }
      </div>
      <div class="content { contentClass }" ref="content">
        <slot />
      </div>
      <div class="actions">
        <button each="{ button in buttons }" onclick="{ onClickButton }" ref="button_{ button.text }" type="button"
          class="ui button { button.type } { button.class }">
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
    export default {
      status: {
        transition: '',
      },
      image_content: false,
      openning: false,
      closing: false,
      visible: false,
      onBeforeUpdate,
      onClickModal,
      onClickButton,
      onClickHide,
      onClickDimmer,
    }

    // ===================================================================================
    //                                                                           Lifecycle
    //                                                                           =========
    function onBeforeUpdate(props, state) {
      this.basic = this.root.classList.contains('basic')
      this.contentClass = this.$('img') ? 'image' : ''

      if (props.modal) {
        this.header = props.modal.header
        this.closable = typeof props.modal.closable === 'undefined' || props.modal.closable
        this.headerClass = props.modal.header.icon ? 'icon' : ''
        this.title = props.modal.header.text ? props.modal.header.text : props.modal.header

        this.buttons = props.modal.buttons
        buttons.forEach(button => {
          const classes = []
          if (button.icon && button.text) classes.push('labeled')
          if (button.icon) classes.push('icon')
          if (basic) classes.push('inverted')
          if (button.disabled) classes.push('disabled')
          button.class = classes.join(' ')
        })
      }

      if (this.root.getAttribute('show') && !this.visible) {
        show()
      } else if (!this.root.getAttribute('show') && this.visible) {
        onClickHide()
      }
    }

    // ===================================================================================
    //                                                                              Events
    //                                                                              ======
    function onClickButton(event) {
      this.dispatch(event.item.action || event.item.text)
      if (typeof event.item.closable === 'undefined' || event.item.closable) {
        onClickHide()
      }
    }

    function onClickDimmer() {
      if (this.props.modal.closable && !this.basic) {
        onClickHide()
      }
    }

    function onClickModal(event) {
      event.stopPropagation()
    }

    function onClickHide() {
      if (this.openning || this.closing || !this.visible) {
        return
      }
      this.closing = true
      this.update({
        transition: 'animating fade out visible active'
      })
      this.dispatch('hide')

      setTimeout(() => {
        this.closing = false
        this.visible = false
        this.update({
          transition: ''
        })
      }, 300)
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    function show() {
      console.log('show')
      if (this.openning || this.closing || this.visible) {
        return
      }
      console.log('shown')
      this.openning = true
      this.status.transition = ''
      setDefaultFocus()
      // this.dispatch('show')

      setTimeout(() => {
        this.openning = false
        this.visible = true
      }, 500)
    }

    function setDefaultFocus() {
      if (!this.buttons || this.buttons.length == 0) {
        return
      }
      if (this.buttons.some(button => button.default)) {
        const text = this.buttons.filter(button => button.default)[0].text
        // tag.refs[`button_${text}`].focus()
      }
    }
  </script>
</su-modal>
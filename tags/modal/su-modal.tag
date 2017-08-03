<su-modal>
  <div class="ui dimmer modals page transition visible active" if="{ opts.modal.visible }" onclick="{ dimmerClose }" ref="dimmer">
    <div class="ui modal transition visible active {modal_type}" if="{ opts.modal.visible }" ref="modal">
      <i class="close icon" if="{ modal_type == 'fullscreen' }" onclick="{ close }"></i>
      <div class="ui header { icon: opts.modal.heading.icon }">
        <i class="icon { opts.modal.heading.icon }" if="{ opts.modal.heading.icon }"></i>
        { (opts.modal.heading.text) ? opts.modal.heading.text : opts.modal.heading }
      </div>
      <div class="content {opts.modal.content_type}">
        <yield />
      </div>
      <div class="actions">
        <div each="{ opts.modal.buttons }" class="ui button { type } { labeled: icon && text } { icon: icon } { inverted: modal_type == 'basic' }"
          onclick="{ parent.click.bind(this, action) }">
          { text }
          <i class="icon { icon }" if="{ icon }"></i>
        </div>
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
      margin: 0;
      opacity: 0;
    }
  </style>
  <script>
    const self = this
    this.on('mount', () => {
      if (!opts.modal) {
        opts.modal = {}
      }
      if (typeof opts.modal.closable === 'undefined') {
        opts.modal.closable = true
      }
      this.modal_type = opts.modal.type
    })

    this.on('updated', () => {
      let el = this.refs.modal
      if (opts.modal.visible) {
        anime({
          targets: el,
          elasticity: 0,
          opacity: 1
        })
      }
    })

    this.click = action => {
      this.close(action)
    }

    this.dimmerClose = action => {
      if (opts.modal.closable) {
        this.close(action)
      }
    }

    this.close = action => {
      let el = this.refs.dimmer
      if (action) {
        action()
      }
      anime({
        targets: el,
        elasticity: 0,
        opacity: 0,
        complete: () => {
          opts.modal.visible = false
          self.update()
        }
      })
    }
  </script>
</su-modal>
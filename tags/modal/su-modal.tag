<su-modal>
  <div class="ui dimmer modals page transition visible active" if="{ opts.modal.visible }" onclick="{ dimmerClose }"></div>
  <div class="ui modal transition visible active {modal_type}" if="{ opts.modal.visible }">
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
        onclick="{ action }">
        { text }
        <i class="icon { icon }" if="{ icon }"></i>
      </div>
    </div>
  </div>
  <script>
    this.on('mount', () => {
      if (!opts.modal) {
        opts.modal = {}
      }
      this.modal_type = opts.modal.type
    })

    this.dimmerClose = () => {
      if (opts.modal.closable) {
        opts.modal.visible = false
        this.trigger('close')
      }
    }

    this.close = () => {
      opts.modal.visible = false
      this.trigger('close')
    }
  </script>
</su-modal>
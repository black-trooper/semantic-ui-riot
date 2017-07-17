<su-modal>
    <div class="ui dimmer modals page transition visible active" if="{ opts.modal.visible }" onclick="{ dimmerClose }"></div>
    <div class="ui modal transition visible active {opts.modal.size}" if="{ opts.modal.visible }">
        <i class="close icon" if="{ opts.modal.size == 'fullscreen' }" onclick="{ close }"></i>
        <div class="header">
            { opts.modal.heading }
        </div>
        <div class="content">
            <yield />
        </div>
        <div class="actions">
            <div each="{ opts.modal.buttons }" class="ui button { type } { labeled: icon && text } { icon: icon }" onclick="{ action }">
                { text }
                <i class="icon { icon }" if="{ icon }"></i>
            </div>
        </div>
    </div>
    <script>
        this.on('mount', () => {
            if (!opts.modal) opts.modal = {}
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

        this.dimmer
    </script>
</su-modal>
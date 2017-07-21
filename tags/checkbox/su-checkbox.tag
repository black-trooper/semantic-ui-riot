<su-checkbox>
    <div class="ui checkbox { style }">
        <input type="checkbox" checked="{ checked }" onclick="{ click }" />
        <label><yield /></label>
    </div>
    <script>
        const self = this
        this.checked = false
        this.slider = false

        this.on('mount', () => {
            if (!opts.checkbox) {
                opts.checkbox = {
                    checked: false
                }
            }
            if (opts.style) {
                opts.checkbox.style = opts.style
            }
            if (opts.checked) {
                opts.checkbox.checked = opts.checked
            }
            if (opts.action) {
                opts.checkbox.action = opts.action
            }

            self.style = opts.checkbox.style
            self.checked = opts.checkbox.checked

            this.update()
            this.parent.update()
        })

        this.click = (e) => {
            self.checked = e.target.checked
            self.parent.update()
            if (opts.checkbox.action) {
                opts.checkbox.action()
            }
        }
    </script>
</su-checkbox>
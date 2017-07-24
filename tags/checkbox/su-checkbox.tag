<su-checkbox>
  <div class="ui checkbox { type }">
    <input type="checkbox" checked="{ checked }" onclick="{ click }" ref="target" />
    <label onclick="{ labelClick }"><yield /></label>
  </div>
  <script>
    const self = this
    this.checked = false
    this.type = ''

    this.on('mount', () => {
      if (!opts.checkbox) {
        opts.checkbox = {
          checked: false
        }
      }
      if (opts.type) {
        opts.checkbox.type = opts.type
      }
      if (opts.checked) {
        opts.checkbox.checked = opts.checked
      }
      if (opts.action) {
        opts.checkbox.action = opts.action
      }

      self.type = opts.checkbox.type
      self.checked = opts.checkbox.checked

      this.update()
      this.parent.update()
    })

    this.click = event => {
      self.checked = event.target.checked
      self.parent.update()
      if (opts.checkbox.action) {
        opts.checkbox.action()
      }
    }

    this.labelClick = () => {
      self.refs.target.click()
    }
  </script>
</su-checkbox>
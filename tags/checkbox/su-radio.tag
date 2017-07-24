<su-radio>
  <div class="ui radio checkbox { type }">
    <input type="radio" name="{ name }" value="{ value }" checked="{ checked }" onclick="{ click }" ref="target" />
    <label onclick="{ labelClick }"><yield /></label>
  </div>
  <script>
    const self = this
    this.checked = false
    this.type = ''
    this.name = ''

    this.on('mount', () => {
      if (!opts.radio) {
        opts.radio = {
          checked: false
        }
      }
      if (opts.type) {
        opts.radio.type = opts.type
      }
      if (opts.checked) {
        opts.radio.checked = opts.checked
      }
      if (opts.action) {
        opts.radio.action = opts.action
      }
      if (opts.name) {
        opts.radio.name = opts.name
      }
      if (opts.value) {
        opts.radio.value = opts.value
      }

      self.type = opts.radio.type
      self.checked = opts.radio.checked
      self.name = opts.radio.name
      self.value = opts.radio.value

      this.update()
      this.parent.update()
    })

    this.click = event => {
      self.checked = event.target.checked
      self.parent.update()
      if (opts.radio.action) {
        opts.radio.action(event.target.value)
      }
    }

    this.labelClick = () => {
      self.refs.target.click()
    }
  </script>
</su-radio>
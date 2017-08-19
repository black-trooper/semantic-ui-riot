<su-radio>
  <div class="ui {radio: isRadio() } checkbox { opts.class }">
    <input type="radio" name="{ name }" value="{ value }" checked="{ checked }" onclick="{ click }" ref="target" />
    <label onclick="{ labelClick }"><yield /></label>
  </div>

  <script>
    this.checked = false
    this.name = ''

    this.on('mount', () => {
      if (!opts.radio) {
        opts.radio = {
          checked: false
        }
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

      this.checked = opts.radio.checked
      this.name = opts.radio.name
      this.value = opts.radio.value

      this.update()
      this.parent.update()
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
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

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.isRadio = () => {
      return !this.root.classList.contains('slider')
    }
  </script>
</su-radio>
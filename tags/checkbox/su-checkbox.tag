<su-checkbox class="ui checkbox { opts.class }">
  <input type="checkbox" checked="{ checked }" onclick="{ click }" ref="target" />
  <label onclick="{ labelClick }" if="{ !opts.label }"><yield /></label>
  <label onclick="{ labelClick }" if="{ opts.label }">{ opts.label }</label>

  <script>
    this.checked = false

    this.on('mount', () => {
      if (opts.check) {
        this.checked = opts.check
      }
    })

    this.on('update', () => {
      if (typeof opts.check === 'undefined') {
        return
      }
      if (!this.clicked) {
        this.checked = opts.check
      }
      this.clicked = false
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = () => {
      this._click()
    }

    this.labelClick = () => {
      this._click()
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    this._click = () => {
      this.clicked = true
      this.checked = !this.checked
      this.parentUpdate()
      this.trigger('click', this.checked)
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.parentUpdate = () => {
      if (this.parent) {
        this.parent.update()
      }
    }
  </script>
</su-checkbox>
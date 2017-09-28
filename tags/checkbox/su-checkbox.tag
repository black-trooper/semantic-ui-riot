<su-checkbox class="ui checkbox { opts.class }">
  <input type="checkbox" checked="{ checked }" onclick="{ click }" ref="target" />
  <label onclick="{ labelClick }"><yield /></label>

  <script>
    this.checked = false
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
    this.click = event => {
      this.clicked = true
      this.checked = event.target.checked
      this.parentUpdate()
      this.trigger('click', this.checked)
    }

    this.labelClick = () => {
      this.refs.target.click()
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
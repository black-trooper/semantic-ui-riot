<su-checkbox class="ui checkbox { opts.class }">
  <input type="checkbox" checked="{ checked }" onclick="{ click }" ref="target" />
  <label onclick="{ labelClick }"><yield /></label>

  <script>
    this.checked = false

    this.on('mount', () => {
      this.update()
      this.parentUpdate()
    })

    this.on('update', () => {
      this.checked = opts.checked
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = event => {
      this.checked = event.target.checked
      this.parentUpdate()
      if (opts.action) {
        opts.action()
      }
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
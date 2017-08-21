<su-checkbox>
  <div class="ui checkbox { opts.class }">
    <input type="checkbox" checked="{ checked }" onclick="{ click }" ref="target" />
    <label onclick="{ labelClick }"><yield /></label>
  </div>

  <script>
    this.checked = false

    this.on('mount', () => {
      if (!opts.checkbox) {
        opts.checkbox = {
          checked: false
        }
      }
      if (opts.checked) {
        opts.checkbox.checked = opts.checked
      }
      if (opts.action) {
        opts.checkbox.action = opts.action
      }

      this.checked = opts.checkbox.checked

      this.update()
      this.parent.update()
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = event => {
      this.checked = event.target.checked
      this.parent.update()
      if (opts.checkbox.action) {
        opts.checkbox.action()
      }
    }

    this.labelClick = () => {
      this.refs.target.click()
    }
  </script>
</su-checkbox>
<su-checkbox class="ui checkbox { opts.class }">
  <input type="checkbox" checked="{ checked }" onclick="{ click }" ref="target" />
  <label onclick="{ labelClick }"><yield /></label>

  <script>
    this.checked = false

    this.on('mount', () => {
      this.checked = opts.checked

      this.update()
      this.parent.update()
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = event => {
      this.checked = event.target.checked
      this.parent.update()
      if (opts.action) {
        opts.action()
      }
    }

    this.labelClick = () => {
      this.refs.target.click()
    }
  </script>
</su-checkbox>
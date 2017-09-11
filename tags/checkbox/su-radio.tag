<su-radio class="ui {radio: isRadio() } checkbox { opts.class }">
  <input type="radio" name="{ name }" value="{ value }" checked="{ checked }" onclick="{ click }" ref="target" />
  <label onclick="{ labelClick }"><yield /></label>

  <script>
    this.checked = false
    this.name = ''

    this.on('mount', () => {
      this.checked = opts.checked
      this.name = opts.name
      this.value = opts.value

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
        opts.action(event.target.value)
      }
    }

    this.labelClick = () => {
      this.refs.target.click()
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.isRadio = () => {
      return !this.root.classList.contains('slider')
    }
  </script>
</su-radio>
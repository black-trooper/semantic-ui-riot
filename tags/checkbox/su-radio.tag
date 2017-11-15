<su-radio class="ui {radio: isRadio() } checkbox { opts.class }">
  <input type="radio" name="{ name }" value="{ value }" checked="{ checked }" onclick="{ click }" ref="target" />
  <label onclick="{ labelClick }" if="{ !opts.label }"><yield /></label>
  <label onclick="{ labelClick }" if="{ opts.label }">{ opts.label }</label>

  <script>
    this.checked = false
    this.name = ''

    this.on('mount', () => {
      this.update()
      this.parentUpdate()
    })

    this.on('update', () => {
      this.checked = opts.checked
      this.name = opts.name
      this.value = opts.value
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = event => {
      this.checked = event.target.checked
      this.trigger('click', event.target.value)
      this.parentUpdate()
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

    this.parentUpdate = () => {
      if (this.parent) {
        this.parent.update()
      }
    }
  </script>
</su-radio>
<su-radio class="ui {radio: isRadio() } checkbox { opts.class }">
  <input type="radio" name="{ name }" value="{ value }" checked="{ checked }" onclick="{ click }" ref="target" id="{ getId() }"
  />
  <label if="{ !opts.label }" for="{ getId() }"><yield /></label>
  <label if="{ opts.label }" for="{ getId() }">{ opts.label }</label>

  <script>
    this.checked = false
    let lastChecked
    let lastOptsCheck
    this.name = ''

    this.on('mount', () => {
      this.checked = opts.checked === true || opts.checked === 'checked' || opts.checked === 'true'
      lastChecked = this.checked
      lastOptsCheck = opts.checked
      this.update()
    })

    this.on('update', () => {
      this.name = opts.name
      this.value = opts.value
      if (lastChecked != this.checked) {
        opts.checked = this.checked
        lastChecked = this.checked
        this.parentUpdate()
      } else if (lastOptsCheck != opts.checked) {
        this.checked = opts.checked
        lastOptsCheck = opts.checked
        this.parentUpdate()
      }
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = event => {
      this.checked = event.target.checked
      this.trigger('click', event.target.value)
      this.parentUpdate()
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.getId = () => {
      return `su-radio-${this._riot_id}`
    }

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
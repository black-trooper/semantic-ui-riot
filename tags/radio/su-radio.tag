<su-radio class="ui {radio: isRadio() } checkbox { opts.class }">
  <input type="radio" name="{ name }" value="{ value }" checked="{ checked }" onclick="{ click }" ref="target" id="{ getId() }"
  />
  <label if="{ !opts.label }" for="{ getId() }"><yield /></label>
  <label if="{ opts.label }" for="{ getId() }">{ opts.label }</label>

  <style>
    :scope.ui.checkbox label {
      cursor: pointer;
    }

    :scope.ui.read-only input[type="radio"],
    :scope.ui.disabled input[type="radio"] {
      cursor: default!important;
    }
  </style>

  <script>
    this.name = ''
    this.checked = false
    let lastChecked
    let lastOptsCheck

    this.on('mount', () => {
      if (this.checked) {
        opts.checked = this.checked
      } else {
        this.checked = opts.checked === true || opts.checked === 'checked' || opts.checked === 'true'
      }
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
      } else if (lastOptsCheck != opts.checked) {
        this.checked = opts.checked
        lastOptsCheck = opts.checked
      }
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = event => {
      if (isReadOnly() || this.isDisabled()) {
        event.preventDefault()
        return
      }
      this.checked = event.target.checked
      this.trigger('click', event.target.value)
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const isReadOnly = () => {
      return this.root.classList.contains('read-only')
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.getId = () => {
      return `su-radio-${this._riot_id}`
    }

    this.isDisabled = () => {
      return this.root.classList.contains('disabled')
    }

    this.isRadio = () => {
      return !this.root.classList.contains('slider')
    }
  </script>
</su-radio>
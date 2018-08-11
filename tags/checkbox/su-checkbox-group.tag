<su-checkbox-group>
  <yield />

  <script>
    this.label = ''
    this.value = ''
    this.defaultValue = ''
    let lastValue
    let lastOptsValue

    this.on('mount', () => {
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      if (this.value) {
        opts.riotValue = this.value
      } else {
        this.value = opts.riotValue
      }
      lastValue = this.value
      lastOptsValue = this.value

      let checkboxes = this.tags['su-checkbox']
      if (!Array.isArray(checkboxes)) {
        checkboxes = [checkboxes]
      }
      checkboxes.forEach(radio => {
        initializeChild(radio)
      })

      this.value = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
      this.defaultValue = this.value
      this.update()
    })

    this.on('update', () => {
      let changed = false
      if (lastValue.toString() != this.value.toString()) {
        opts.riotValue = this.value
        lastOptsValue = this.value
        lastValue = this.value
        changed = true
      } else if (lastOptsValue.toString() != opts.riotValue.toString()) {
        this.value = opts.riotValue
        lastOptsValue = opts.riotValue
        lastValue = opts.riotValue
        changed = true
      }

      if (changed) {
        let checkboxes = this.tags['su-checkbox']
        if (!Array.isArray(checkboxes)) {
          checkboxes = [checkboxes]
        }
        checkboxes.forEach(radio => {
          updateState(radio)
        })
        this.trigger('change', this.value)
      }
    })

    // ===================================================================================
    //                                                                               State
    //                                                                               =====
    this.reset = () => {
      this.value = this.defaultValue
    }

    this.changed = () => {
      return this.value !== this.defaultValue
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const updateState = checkbox => {
      if (typeof checkbox.opts.value === 'undefined') {
        return
      }
      checkbox.checked = Array.isArray(this.value) ? this.value.some(v => v == checkbox.opts.value) : this.value == checkbox.opts.value
      if (checkbox.checked) {
        this.label = checkbox.root.getElementsByTagName('label')[0].innerText
      }
    }

    const initializeChild = checkbox => {
      checkbox.opts.name = getCheckboxName()
      checkbox.on('click', value => {
        let checkboxes = this.tags['su-checkbox']
        if (!Array.isArray(checkboxes)) {
          checkboxes = [checkboxes]
        }
        this.value = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.opts.value)
        this.update()
      })
    }

    const getCheckboxName = () => {
      return `su-checkbox-name-${this._riot_id}`
    }
  </script>
</su-checkbox-group>
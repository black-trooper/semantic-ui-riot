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
      if (typeof this.value !== 'undefined' && !Array.isArray(this.value)) {
        this.value = this.value.toString().split(/\s+/).join('').split(',')
      }
      lastValue = this.value
      lastOptsValue = this.value

      let checkboxes = this.tags['su-checkbox']
      if (!Array.isArray(checkboxes)) {
        checkboxes = [checkboxes]
      }
      checkboxes.forEach(checkbox => {
        initializeChild(checkbox)
        updateState(checkbox)
      })

      this.defaultValue = this.value
      parentUpdate()
    })

    this.on('update', () => {
      let changed = false
      if (normalizeValue(lastValue) != normalizeValue(this.value)) {
        opts.riotValue = this.value
        lastOptsValue = this.value
        lastValue = this.value
        changed = true
      } else if (normalizeValue(lastOptsValue) != normalizeValue(opts.riotValue)) {
        this.value = opts.riotValue
        lastOptsValue = opts.riotValue
        lastValue = opts.riotValue
        changed = true
      }
      if (typeof this.value !== 'undefined' && !Array.isArray(this.value)) {
        this.value = this.value.toString().split(/\s+/).join('').split(',')
      }

      if (changed) {
        let checkboxes = this.tags['su-checkbox']
        if (!Array.isArray(checkboxes)) {
          checkboxes = [checkboxes]
        }
        checkboxes.forEach(checkbox => {
          updateState(checkbox)
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
      if (typeof checkbox.opts.value === 'undefined' || typeof this.value === 'undefined') {
        return
      }
      checkbox.checked = this.value.some(v => v == checkbox.opts.value)
      if (checkbox.checked) {
        this.label = checkbox.root.getElementsByTagName('label')[0].innerText
      }
    }

    const initializeChild = checkbox => {
      checkbox.opts.name = getCheckboxName()
      checkbox.on('click', () => {
        let checkboxes = this.tags['su-checkbox']
        if (!Array.isArray(checkboxes)) {
          checkboxes = [checkboxes]
        }
        this.value = checkboxes.filter(_checkbox => _checkbox.checked).map(_checkbox => _checkbox.opts.value)
        this.update()
      })
    }

    const parentUpdate = () => {
      if (this.parent) {
        this.parent.update()
      } else {
        this.update()
      }
    }

    const normalizeValue = value => {
      if (typeof value === 'undefined') {
        return value
      }
      if (!Array.isArray(value)) {
        return [value].toString()
      }
      return value.toString()
    }

    const getCheckboxName = () => {
      return `su-checkbox-name-${this._riot_id}`
    }
  </script>
</su-checkbox-group>
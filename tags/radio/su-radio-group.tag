<su-radio-group>
  <yield />

  <script>
    this.label = ''
    this.value = ''
    let lastValue
    let lastOptsValue

    this.on('mount', () => {
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      this.value = opts.riotValue
      lastValue = this.value
      lastOptsValue = this.value

      const radios = this.tags['su-radio']
      if (Array.isArray(radios)) {
        for (const radio of radios) {
          initializeChild(radio)
        }
      } else {
        initializeChild(radios)
      }

      this.update()
    })

    this.on('update', () => {
      let changed = false
      if (lastValue != this.value) {
        opts.riotValue = this.value
        lastOptsValue = this.value
        lastValue = this.value
        changed = true
      } else if (lastOptsValue != opts.riotValue) {
        this.value = opts.riotValue
        lastOptsValue = opts.riotValue
        lastValue = opts.riotValue
        changed = true
      }

      const radios = this.tags['su-radio']
      if (Array.isArray(radios)) {
        for (const radio of radios) {
          updateState(radio)
        }
      } else {
        updateState(radios)
      }

      if (changed) {
        this.trigger('change', this.value)
      }
    })

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    let updateState = radio => {
      if (typeof radio.opts.value === 'undefined') {
        return
      }
      radio.checked = this.value == radio.opts.value
      if (radio.checked) {
        this.label = radio.root.getElementsByTagName('label')[0].innerText
      }
    }

    let initializeChild = radio => {
      radio.opts.name = getRadioName()
      radio.on('click', value => {
        this.value = value
        this.update()
      })
    }

    let getRadioName = () => {
      return `su-radio-name-${this._riot_id}`
    }
  </script>
</su-radio-group>
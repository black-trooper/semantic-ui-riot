<su-radio-group>
  <yield />

  <script>
    const tag = this
    tag.label = ''
    tag.value = ''
    tag.defaultValue = ''
    let lastValue
    let lastOptsValue

    tag.on('mount', () => {
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      if (tag.value) {
        opts.riotValue = tag.value
      } else {
        tag.value = opts.riotValue
      }
      lastValue = tag.value
      lastOptsValue = tag.value

      let radios = tag.tags['su-radio']
      if (!Array.isArray(radios)) {
        radios = [radios]
      }
      radios.forEach(radio => {
        initializeChild(radio)
      })

      tag.defaultValue = tag.value
      tag.update()
    })

    tag.on('update', () => {
      let changed = false
      if (lastValue != tag.value) {
        opts.riotValue = tag.value
        lastOptsValue = tag.value
        lastValue = tag.value
        changed = true
      } else if (lastOptsValue != opts.riotValue) {
        tag.value = opts.riotValue
        lastOptsValue = opts.riotValue
        lastValue = opts.riotValue
        changed = true
      }

      let radios = tag.tags['su-radio']

      if (!Array.isArray(radios)) {
        radios = [radios]
      }
      radios.forEach(radio => {
        updateState(radio)
      })

      if (changed) {
        tag.trigger('change', tag.value)
      }
    })

    // ===================================================================================
    //                                                                               State
    //                                                                               =====
    tag.reset = () => {
      tag.value = tag.defaultValue
    }

    tag.changed = () => {
      return tag.value !== tag.defaultValue
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const updateState = radio => {
      if (typeof radio.opts.value === 'undefined') {
        return
      }
      radio.checked = tag.value == radio.opts.value
      if (radio.checked) {
        tag.label = radio.root.getElementsByTagName('label')[0].innerText
      }
    }

    const initializeChild = radio => {
      radio.opts.name = getRadioName()
      radio.on('click', value => {
        tag.value = value
        tag.update()
      })
    }

    const getRadioName = () => {
      return `su-radio-name-${tag._riot_id}`
    }
  </script>
</su-radio-group>
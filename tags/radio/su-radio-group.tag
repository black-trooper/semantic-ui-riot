<su-radio-group>
  <yield />

  <script>
    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.defaultValue = ''
    tag.label = ''
    tag.value = ''

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    tag.changed = changed
    tag.on('mount', onMount)
    tag.on('update', onUpdate)
    tag.reset = reset

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========
    let lastOptsValue
    let lastValue

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
    function onMount() {
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
      if (radios) {
        if (!Array.isArray(radios)) {
          radios = [radios]
        }
        radios.forEach(radio => {
          initializeChild(radio)
        })
      }

      tag.defaultValue = tag.value
      tag.update()
    }

    function onUpdate() {
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
      if (radios) {
        if (!Array.isArray(radios)) {
          radios = [radios]
        }
        radios.forEach(radio => {
          updateState(radio)
        })
      }

      if (changed) {
        tag.trigger('change', tag.value)
      }
    }

    function reset() {
      tag.value = tag.defaultValue
    }

    function changed() {
      return tag.value !== tag.defaultValue
    }

    function updateState(radio) {
      if (typeof radio.opts.value === 'undefined') {
        return
      }
      radio.checked = tag.value == radio.opts.value
      if (radio.checked) {
        tag.label = radio.root.getElementsByTagName('label')[0].innerText
      }
    }

    function initializeChild(radio) {
      radio.opts.name = getRadioName()
      radio.on('click', value => {
        tag.value = value
        tag.update()
      })
    }

    function getRadioName() {
      return `su-radio-name-${tag._riot_id}`
    }
  </script>
</su-radio-group>
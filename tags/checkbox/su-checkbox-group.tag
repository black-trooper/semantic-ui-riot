<su-checkbox-group>
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
      if (typeof tag.value !== 'undefined' && !Array.isArray(tag.value)) {
        tag.value = tag.value.toString().split(/\s+/).join('').split(',')
      }
      lastValue = tag.value
      lastOptsValue = tag.value

      let checkboxes = tag.tags['su-checkbox']
      if (!Array.isArray(checkboxes)) {
        checkboxes = [checkboxes]
      }
      checkboxes.forEach(checkbox => {
        initializeChild(checkbox)
        updateState(checkbox)
      })

      tag.defaultValue = tag.value
      parentUpdate()
    })

    tag.on('update', () => {
      let changed = false
      if (normalizeValue(lastValue) != normalizeValue(tag.value)) {
        opts.riotValue = tag.value
        lastOptsValue = tag.value
        lastValue = tag.value
        changed = true
      } else if (normalizeValue(lastOptsValue) != normalizeValue(opts.riotValue)) {
        tag.value = opts.riotValue
        lastOptsValue = opts.riotValue
        lastValue = opts.riotValue
        changed = true
      }
      if (typeof tag.value !== 'undefined' && !Array.isArray(tag.value)) {
        tag.value = tag.value.toString().split(/\s+/).join('').split(',')
      }

      if (changed) {
        let checkboxes = tag.tags['su-checkbox']
        if (!Array.isArray(checkboxes)) {
          checkboxes = [checkboxes]
        }
        checkboxes.forEach(checkbox => {
          updateState(checkbox)
        })
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
    const updateState = checkbox => {
      if (typeof checkbox.opts.value === 'undefined' || typeof tag.value === 'undefined') {
        return
      }
      checkbox.checked = tag.value.some(v => v == checkbox.opts.value)
      if (checkbox.checked) {
        tag.label = checkbox.root.getElementsByTagName('label')[0].innerText
      }
    }

    const initializeChild = checkbox => {
      checkbox.opts.name = getCheckboxName()
      checkbox.on('click', () => {
        let checkboxes = tag.tags['su-checkbox']
        if (!Array.isArray(checkboxes)) {
          checkboxes = [checkboxes]
        }
        tag.value = checkboxes.filter(_checkbox => _checkbox.checked).map(_checkbox => _checkbox.opts.value)
        tag.update()
      })
    }

    const parentUpdate = () => {
      if (tag.parent) {
        tag.parent.update()
      } else {
        tag.update()
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
      return `su-checkbox-name-${tag._riot_id}`
    }
  </script>
</su-checkbox-group>
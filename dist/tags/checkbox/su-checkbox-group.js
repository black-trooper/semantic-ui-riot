riot.tag2('su-checkbox-group', '<yield></yield>', '', '', function(opts) {
    const tag = this

    tag.label = ''
    tag.value = ''
    tag.defaultValue = ''

    tag.changed = changed
    tag.on('mount', onMount)
    tag.on('update', onUpdate)
    tag.reset = reset

    let lastValue
    let lastOptsValue

    function onMount() {
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
      if (checkboxes) {
        if (!Array.isArray(checkboxes)) {
          checkboxes = [checkboxes]
        }
        checkboxes.forEach(checkbox => {
          initializeChild(checkbox)
          updateState(checkbox)
        })
      }

      tag.defaultValue = tag.value
      parentUpdate()
    }

    function onUpdate() {
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

      let checkboxes = tag.tags['su-checkbox']
      if (checkboxes) {
        if (!Array.isArray(checkboxes)) {
          checkboxes = [checkboxes]
        }
        checkboxes.forEach(checkbox => {
          initializeChild(checkbox)
        })
        if (changed) {
          checkboxes.forEach(checkbox => {
            updateState(checkbox)
          })
          tag.trigger('change', tag.value)
        }
      }
    }

    function reset() {
      tag.value = tag.defaultValue
    }

    function changed() {
      return tag.value !== tag.defaultValue
    }

    function updateState(checkbox) {
      if (typeof checkbox.opts.value === 'undefined' || typeof tag.value === 'undefined') {
        return
      }
      checkbox.checked = tag.value.some(v => v == checkbox.opts.value)
      if (checkbox.checked) {
        tag.label = checkbox.root.getElementsByTagName('label')[0].innerText
      }
    }

    function initializeChild(checkbox) {
      if (checkbox.opts.name) {
        return
      }
      checkbox.opts.name = getCheckboxName()
      checkbox.on('click', () => {
        let checkboxes = tag.tags['su-checkbox']
        if (!Array.isArray(checkboxes)) {
          checkboxes = [checkboxes]
        }
        tag.value = checkboxes.filter(_checkbox => _checkbox.checked).map(_checkbox => _checkbox.opts.riotValue || _checkbox.opts.value)
        tag.update()
      })
    }

    function parentUpdate() {
      if (tag.parent) {
        tag.parent.update()
      } else {
        tag.update()
      }
    }

    function normalizeValue(value) {
      if (typeof value === 'undefined') {
        return value
      }
      if (!Array.isArray(value)) {
        return [value].toString()
      }
      return value.toString()
    }

    function getCheckboxName() {
      return `su-checkbox-name-${tag._riot_id}`
    }
});
<su-checkbox class="ui checkbox { opts.class }">
  <input type="checkbox" checked="{ checked }" onclick="{ click }" ref="target" disabled="{ isDisabled() }" id="{ getId() }"
  />
  <label if="{ !opts.label }" for="{ getId() }"><yield /></label>
  <label if="{ opts.label }" for="{ getId() }">{ opts.label }</label>

  <style>
    :scope.ui.checkbox label {
      cursor: pointer;
    }

    :scope.ui.read-only input[type="checkbox"],
    :scope.ui.disabled input[type="checkbox"] {
      cursor: default !important;
    }
  </style>

  <script>
    const tag = this
    tag.checked = false
    tag.defaultChecked = false
    let lastChecked
    let lastOptsChecked

    tag.on('mount', () => {
      supportTraditionalOptions()
      if (tag.checked) {
        opts.checked = tag.checked
      } else {
        tag.checked = normalizeOptChecked()
      }
      lastChecked = tag.checked
      lastOptsChecked = tag.checked
      tag.defaultChecked = tag.checked
      tag.update()
    })

    tag.on('update', () => {
      supportTraditionalOptions()
      if (lastChecked != tag.checked) {
        opts.checked = tag.checked
        lastChecked = tag.checked
        lastOptsChecked = tag.checked
        parentUpdate()
      } else if (lastOptsChecked != normalizeOptChecked()) {
        tag.checked = normalizeOptChecked()
        lastChecked = tag.checked
        lastOptsChecked = tag.checked
        parentUpdate()
      }
    })

    // ===================================================================================
    //                                                                               State
    //                                                                               =====
    tag.reset = () => {
      tag.checked = tag.defaultChecked
    }

    tag.changed = () => {
      return tag.checked !== tag.defaultChecked
    }

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    tag.click = () => {
      if (isReadOnly() || tag.isDisabled()) {
        event.preventDefault()
        return
      }
      tag.checked = !tag.checked
      parentUpdate()
      tag.trigger('click', tag.checked)
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    tag.getId = () => {
      return `su-checkbox-${tag._riot_id}`
    }

    tag.isDisabled = () => {
      return tag.root.classList.contains('disabled')
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const isReadOnly = () => {
      return tag.root.classList.contains('read-only')
    }

    const parentUpdate = () => {
      if (tag.parent) {
        tag.parent.update()
      }
    }

    let shownMessage = false
    const supportTraditionalOptions = () => {
      if (typeof opts.check !== 'undefined') {
        if (!shownMessage) {
          console.warn('\'check\' attribute is deprecated. Please use \'checked\'.')
        }
        shownMessage = true
        opts.checked = opts.check
        opts.check = undefined
      }
    }

    const normalizeOptChecked = () => {
      return opts.checked === true || opts.checked === 'checked' || opts.checked === 'true'
    }
  </script>
</su-checkbox>
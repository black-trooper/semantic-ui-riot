<su-checkbox-group value="{ state.value }">
  <slot />

  <script>
    export default {
      state: {
        value: '',
        lastValue: '',
        lastOptsValue: '',
      },
      changed: false,
      defaultValue: '',
      onMounted,
      onBeforeUpdate,
      onUpdated,
      reset,
    }

    // ===================================================================================
    //                                                                           Lifecycle
    //                                                                           =========
    function onMounted(props, state) {
      if (!state.value) {
        state.value = props.riotValue
      }
      if (typeof state.value !== 'undefined' && !Array.isArray(state.value)) {
        state.value = state.value.toString().split(/\s+/).join('').split(',')
      }
      state.lastValue = state.value
      state.lastOptsValue = state.value

      let checkboxes = this.$$('su-checkbox')
      checkboxes.forEach(checkbox => {
        initializeChild(checkbox, this.uid)
        updateState(checkbox)
      })
      this.obs.on(`su-checkbox-name-${this.uid}-click`, () => {
        this.update({
          value: checkboxes.filter(_checkbox => _checkbox.checked).map(_checkbox => {
            return _checkbox.getAttribute('value')
          })
        })
      })

      this.defaultValue = state.value
      // parentUpdate()
    }

    function onBeforeUpdate(props, state) {
      this.changed = state.value !== this.defaultValue

      if (normalizeValue(state.lastOptsValue) != normalizeValue(props.value)) {
        state.value = props.value
        state.lastOptsValue = props.value
      }
    }

    function onUpdated(props, state) {
      let changed = false
      if (normalizeValue(state.lastValue) != normalizeValue(state.value)) {
        state.lastValue = state.value
        changed = true
      }
      if (typeof state.value !== 'undefined' && !Array.isArray(state.value)) {
        state.value = state.value.toString().split(/\s+/).join('').split(',')
      }

      if (changed) {
        let checkboxes = this.$$('su-checkbox')
        checkboxes.forEach(checkbox => {
          updateState(checkbox, state.value)
        })
        this.dispatch && this.dispatch('change', state.value)
      }
    }

    function reset() {
      this.update({
        value: this.defaultValue
      })
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    function updateState(checkbox, value) {
      if (typeof checkbox.getAttribute('value') === 'undefined' || typeof value === 'undefined') {
        return
      }
      if (value.some(v => v == checkbox.getAttribute('value'))) {
        checkbox.setAttribute('checked', true)
      } else {
        checkbox.removeAttribute('checked')
      }
    }

    function initializeChild(checkbox, uid) {
      checkbox.setAttribute('name', `su-checkbox-name-${uid}`)
    }

    // function parentUpdate() {
    //   if (this.parent) {
    //     this.parent.update()
    //   } else {
    //     this.update()
    //   }
    // }

    function normalizeValue(value) {
      if (typeof value === 'undefined') {
        return value
      }
      if (!Array.isArray(value)) {
        return [value].toString()
      }
      return value.toString()
    }
  </script>
</su-checkbox-group>
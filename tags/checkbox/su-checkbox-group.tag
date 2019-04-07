<su-checkbox-group value="{ state.value }">
  <slot />

  <script>
    import observable from 'riot-observable'

    export default {
      state: {
        value: '',
        defaultValue: '',
        label: '',
        lastValue: '',
        lastOptsValue: '',
      },
      changed: false,
      onMounted,
      onBeforeUpdate,
      onUpdated,
      reset,
    }

    // ===================================================================================
    //                                                                           Lifecycle
    //                                                                           =========
    function onMounted(props, state) {
      this.observable = observable(this)
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

      this.defaultValue = state.value
      // parentUpdate()
    }

    function onBeforeUpdate(props, state) {
      this.changed = state.value !== state.defaultValue

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
        this.observable.trigger('change', state.value)
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
      // if (checkbox.checked) {
      //   this.label = checkbox.root.getElementsByTagName('label')[0].innerText
      // }
    }

    function initializeChild(checkbox, uid) {
      checkbox.setAttribute('name', `su-checkbox-name-${uid}`)
      // checkbox.on('click', () => {
      //   let checkboxes = this.$$['su-checkbox']
      //   if (!Array.isArray(checkboxes)) {
      //     checkboxes = [checkboxes]
      //   }
      //   state.value = checkboxes.filter(_checkbox => _checkbox.checked).map(_checkbox => _checkbox.props.value)
      //   this.update()
      // })
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
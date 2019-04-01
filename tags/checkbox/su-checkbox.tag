<su-checkbox checked="{ state.checked }">
  <input type="checkbox" checked="{ state.checked }" onclick="{ onClick }" ref="target" disabled="{ state.disabled }" id="{ getId() }"
  />
  <label if="{ !props.label }" for="{ getId() }"><slot /></label>
  <label if="{ props.label }" for="{ getId() }">{ props.label }</label>

  <style>
    :host.ui.checkbox label {
      cursor: pointer;
    }

    :host.ui.read-only input[type="checkbox"],
    :host.ui.disabled input[type="checkbox"] {
      cursor: default !important;
    }
  </style>

  <script>
    import observable from 'riot-observable'

    export default {
      state: {
        checked: false,
        defaultChecked: false,
        observable: null,
        lastChecked: false,
        lastOptsChecked: false,
      },
      onBeforeUpdate,
      onMounted,
      onUpdated,
      onClick,
      getId,
      changed,
      reset,
    }

    // ===================================================================================
    //                                                                           Lifecycle
    //                                                                           =========
    function onMounted(props, state) {
      state.observable = observable(this)
      this.root.classList.add('ui', 'checkbox')

      state.checked = normalizeOptChecked(props.checked)
      state.lastChecked = state.checked
      state.lastOptsChecked = state.checked
      state.defaultChecked = state.checked
      this.update()
    }

    function onBeforeUpdate(props, state) {
      state.disabled = this.root.classList.contains('disabled')
      state.readOnly = this.root.classList.contains('read-only')

      if (state.lastOptsChecked != normalizeOptChecked(props.checked)) {
        state.checked = normalizeOptChecked(props.checked)
        state.lastOptsChecked = state.checked
      }
    }

    function onUpdated(props, state) {
      if (state.lastChecked != state.checked) {
        state.lastChecked = state.checked
        state.lastOptsChecked = state.checked
      }
    }

    function changed() {
      return this.state.checked !== this.state.defaultChecked
    }

    function reset() {
      this.update({
        checked: this.state.defaultChecked
      })
    }

    // ===================================================================================
    //                                                                              Events
    //                                                                              ======
    function onClick() {
      if (this.state.readOnly || this.state.disabled) {
        event.preventDefault()
        return
      }

      this.update({
        checked: !this.state.checked
      })
      this.state.observable.trigger('click', this.checked)
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    function getId() {
      return `su-checkbox-${this.uid}`
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    function normalizeOptChecked(checked) {
      return checked === true || checked === 'checked' || checked === 'true'
    }
  </script>
</su-checkbox>
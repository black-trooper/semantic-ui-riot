<su-checkbox class="ui checkbox { props.class }" checked="{ state.checked }" changed="{ changed }">
  <input type="checkbox" checked="{ state.checked }" onclick="{ onClick }" disabled="{ disabled }" id="su-checkbox-{ uid }" />
  <label if="{ !props.label }" for="su-checkbox-{ uid }"><slot /></label>
  <label if="{ props.label }" for="su-checkbox-{ uid }">{ props.label }</label>

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
    export default {
      state: {
        checked: false,
        defaultChecked: false,
        observable: null,
        lastChecked: false,
        lastOptsChecked: false,
      },
      changed: false,
      onBeforeUpdate,
      onMounted,
      onUpdated,
      onClick,
      reset,
    }

    // ===================================================================================
    //                                                                           Lifecycle
    //                                                                           =========
    function onMounted(props, state) {
      state.checked = normalizeOptChecked(props.checked)
      state.lastChecked = state.checked
      state.lastOptsChecked = state.checked
      state.defaultChecked = state.checked
      this.update()
    }

    function onBeforeUpdate(props, state) {
      this.disabled = this.root.classList.contains('disabled')
      this.changed = state.checked !== state.defaultChecked

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
      this.dispatch && this.dispatch('click', this.checked)
      if (this.obs && this.root.getAttribute('name')) {
        this.obs.trigger(`${this.root.getAttribute('name')}-click`, this.props.value)
      }
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    function normalizeOptChecked(checked) {
      return checked === true || checked === 'checked' || checked === 'true'
    }
  </script>
</su-checkbox>
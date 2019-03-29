<su-checkbox>
  <input type="checkbox" checked="{ checked }" onclick="{ click }" ref="target" disabled="{ state.disabled }" id="{ getId() }"
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
    let tag

    export default {
      checked: false,
      // changed,
      click,
      getId,
      onMounted,
      onUpdated,
      // reset,
    }

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========
    let lastChecked
    let lastOptsChecked
    let shownMessage = false
    let defaultChecked = false

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
    function onMounted(props) {
      this.root.classList.add('ui', 'checkbox')
  lastChecked = this.checked
      lastOptsChecked = this.checked
      defaultChecked = this.checked
      this.update({
        checked: normalizeOptChecked(props.checked)
      })
    }

    function onUpdated(props) {
      this.state.disabled = this.root.classList.contains('disabled')
      this.state.readOnly = this.root.classList.contains('read-only')

      // if (lastChecked != tag.checked) {
      //   props.checked = tag.checked
      //   lastChecked = tag.checked
      //   lastOptsChecked = tag.checked
      //   parentUpdate()
      // } else if (lastOptsChecked != normalizeOptChecked(props.checked)) {
      //   tag.checked = normalizeOptChecked(props.checked)
      //   lastChecked = tag.checked
      //   lastOptsChecked = tag.checked
      //   parentUpdate()
      // }
    }

    // function reset() {
    //   tag.checked = defaultChecked
    // }

    // function changed() {
    //   return tag.checked !== defaultChecked
    // }

    function click() {
      if (this.state.readOnly || this.state.disabled) {
        event.preventDefault()
        return
      }
      this.checked = !this.checked
      // parentUpdate()
      // this.trigger('click', this.checked)
    }

    function getId() {
      return `su-checkbox-${this.uid}`
    }

    function parentUpdate() {
      if (tag.parent) {
        // tag.parent.update()
      }
    }

    function normalizeOptChecked(checked) {
      return checked === true || checked === 'checked' || checked === 'true'
    }
  </script>
</su-checkbox>
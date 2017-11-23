<su-checkbox class="ui checkbox { opts.class }">
  <input type="checkbox" checked="{ checked }" onclick="{ click }" ref="target" disabled="{ isDisabled() }" id="{ getId() }"
  />
  <label if="{ !opts.label }" for="{ getId() }"><yield /></label>
  <label if="{ opts.label }" for="{ getId() }">{ opts.label }</label>

  <script>
    this.checked = false
    let lastChecked
    let lastOptsCheck

    this.on('mount', () => {
      this.checked = opts.check === true || opts.check === 'true'
      lastChecked = this.checked
      lastOptsCheck = opts.check
    })

    this.on('update', () => {
      if (lastChecked != this.checked) {
        opts.check = this.checked
        lastChecked = this.checked
        this.parentUpdate()
      } else if (lastOptsCheck != opts.check) {
        this.checked = opts.check
        lastOptsCheck = opts.check
        this.parentUpdate()
      }
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = () => {
      if (this.isReadOnly() || this.isDisabled()) {
        this.refs.target.checked = this.checked
        this.update()
        return
      }
      this.checked = !this.checked
      this.parentUpdate()
      this.trigger('click', this.checked)
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.getId = () => {
      return `su-checkbox-${this._riot_id}`
    }

    this.isReadOnly = () => {
      return this.root.classList.contains('read-only')
    }

    this.isDisabled = () => {
      return this.root.classList.contains('disabled')
    }

    this.parentUpdate = () => {
      if (this.parent) {
        this.parent.update()
      }
    }
  </script>
</su-checkbox>
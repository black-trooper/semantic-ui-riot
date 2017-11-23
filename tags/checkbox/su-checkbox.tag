<su-checkbox class="ui checkbox { opts.class }">
  <input type="checkbox" checked="{ checked }" onclick="{ click }" ref="target" disabled="{ isDisabled() }" id="{ getId() }"
  />
  <label if="{ !opts.label }" for="{ getId() }"><yield /></label>
  <label if="{ opts.label }" for="{ getId() }">{ opts.label }</label>

  <script>
    this.checked = false

    this.on('mount', () => {
      if (opts.check) {
        this.checked = opts.check
      }
    })

    this.on('update', () => {
      if (typeof opts.check === 'undefined') {
        return
      }
      if (!this.clicked) {
        this.checked = opts.check
      }
      this.clicked = false
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
      this.clicked = true
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
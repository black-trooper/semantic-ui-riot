<su-radio-group>
  <yield />

  <script>
    this.label = ''
    this.value = ''
    let lastValue

    this.on('mount', () => {
      lastValue = opts.value
      this.update()
    })

    this.on('update', () => {
      if (lastValue != opts.value) {
        this.value = opts.value
        lastValue = opts.value
      }
      for (const radio of this.tags['su-radio']) {
        radio.opts.name = this.getId()
        radio.checked = opts.value === radio.opts.value
        if (radio.checked) {
          this.label = radio.root.getElementsByTagName('label')[0].innerText
        }
      }
    })

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.getId = () => {
      return `su-radio-${this._riot_id}`
    }
  </script>
</su-radio-group>
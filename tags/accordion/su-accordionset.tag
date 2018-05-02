<su-accordionset class="ui accordion { opts.class }">

  <yield />

  <style>
    :scope {
      display: block;
    }
  </style>

  <script>
    this.accordions = []

    this.on('mount', () => {
      this.accordions = this.tags['su-accordion']

      if (!Array.isArray(this.accordions)) {
        this.accordions = [this.accordions]
      }
      let defaultActive = false
      this.accordions.forEach(accordion => {

        initializeChild(accordion)
        if (accordion.opts.active) {
          defaultActive = true
          accordion.active = true
        }
      })
      if (!defaultActive) {
        this.accordions[0].active = true
      }

      this.update()
    })

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const initializeChild = child => {
      child.on('click', target => {
        this.accordions.forEach(accordion => {
          accordion.active = false
        })
        target.active = true
        this.update()
        this.trigger('click', target)
      })
    }

  </script>
</su-accordionset>
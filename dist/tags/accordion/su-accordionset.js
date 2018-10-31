riot.tag2('su-accordionset', '<yield></yield>', 'su-accordionset,[data-is="su-accordionset"]{ display: block; } su-accordionset.ui.accordion .title~.content:not(.ui).close,[data-is="su-accordionset"].ui.accordion .title~.content:not(.ui).close{ padding-top: 0; padding-bottom: 0; } su-accordionset .content.close *,[data-is="su-accordionset"] .content.close *{ line-height: 0 !important; opacity: 0 !important; visibility: hidden !important; padding-top:0 !important; padding-bottom:0 !important; margin-top: 0 !important; margin-bottom: 0 !important; min-height: 0!important; transition: all 300ms 0s linear !important; } su-accordionset .content.close .dropdown.icon,[data-is="su-accordionset"] .content.close .dropdown.icon{ height: 0 !important; transition: height 300ms 0s linear !important; } su-accordionset .content.open *,[data-is="su-accordionset"] .content.open *{ line-height: 1.4285; opacity: 1; visibility: visible; transition: all 300ms 0s linear !important; } su-accordionset .content.open .dropdown.icon,[data-is="su-accordionset"] .content.open .dropdown.icon{ height: 1.4285 !important; transition: height 300ms 0s linear !important; }', 'class="ui accordion {opts.class}"', function(opts) {
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

    const initializeChild = child => {
      child.on('click', target => {
        const active = target.active
        this.accordions.forEach(accordion => {
          if (accordion.active) {
            accordion.active = false
          }
        })
        target.active = !active
        this.update()
        this.trigger('click', target)
      })
    }

});
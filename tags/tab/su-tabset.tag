<su-tabset>
  <div class="ui { opts.class } { getClass() } menu" if="{ !isBottom() && !hasTitle() }">
    <a each="{ tab, i in tabs }" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{ click.bind(this, i) }">{ tab.opts.title }</a>
  </div>
  <yield />
  <div class="ui { opts.class } { getClass() } menu" if="{ isBottom() && !hasTitle() }">
    <a each="{ tab, i in tabs }" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{ click.bind(this, i) }">{ tab.opts.title }</a>
  </div>

  <script>
    this.tabs = []

    this.on('mount', () => {
      if (this.tags['su-tab-header']) {
        this.tags['su-tab-header'].opts.class = getTitleClass()
      }

      this.tabs = this.tags['su-tab']

      if (!Array.isArray(this.tabs)) {
        this.tabs = [this.tabs]
      }
      let defaultActive = false
      for (const tab of this.tabs) {
        initializeChild(tab)
        if (tab.opts.active) {
          defaultActive = true
          tab.active = true
        }
      }
      if (!defaultActive) {
        const titles = this.hasTitle()
        if (titles) {
          titles[0].active = true
        }
        this.tabs[0].active = true
      }

      this.update()
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = index => {
      for (const tab of this.tabs) {
        tab.active = false
      }
      this.tabs[index].active = true
      this.update()
      this.trigger('click', this.tabs[index])
    }


    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.isBottom = () => {
      return hasClass('bottom')
    }

    this.hasTitle = () => {
      if (!this.tags['su-tab-header']) {
        return false
      }
      const titles = this.tags['su-tab-header'].tags['su-tab-title']
      if (!titles) {
        return false
      }

      if (!Array.isArray(titles)) {
        return [titles]
      }
      return titles
    }

    this.getClass = () => {
      if (hasClass('tabular') && !hasClass('attached')) {
        return 'attached'
      }
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    let initializeChild = tab => {
      if (tab.opts.class) {
        return
      }
      let classList = ['segment']
      if (hasClass('tabular')) {
        classList.push('tabular')
      }
      if ((hasClass('attached') || hasClass('tabular')) && !hasClass('left') && !hasClass('right')) {
        if (hasClass('bottom')) {
          classList.push('top')
        } else {
          classList.push('bottom')
        }
        classList.push('attached')
      }
      tab.opts.class = classList.join(' ')
    }

    const getTitleClass = () => {
      const classList = []
      if (hasClass('left') || hasClass('right')) {
        classList.push('vertical')
        classList.push('fluid')
      }
      if (hasClass('left')) {
        classList.push('left')
      }
      if (hasClass('right')) {
        classList.push('right')
      }
      if (hasClass('tabular')) {
        classList.push('tabular')
      }
      return classList.join(' ')
    }

    let hasClass = className => {
      return this.root.classList.contains(className)
    }

  </script>
</su-tabset>
<su-tabset>
  <div class="ui { opts.class } { getClass() } menu" if="{ !isBottom() }">
    <a each="{ tab, i in tabs }" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{ click }">{ tab.opts.title }</a>
  </div>
  <yield />
  <div class="ui { opts.class } { getClass() } menu" if="{ isBottom() }">
    <a each="{ tab, i in tabs }" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{ click }">{ tab.opts.title }</a>
  </div>

  <script>
    this.tabs = []

    this.on('mount', () => {
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
        this.tabs[0].active = true
      }

      this.update()
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = event => {
      const index = event.item.i

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
      if (hasClass('attached') || hasClass('tabular')) {
        if (hasClass('bottom')) {
          classList.push('top')
        } else {
          classList.push('bottom')
        }
        classList.push('attached')
      }
      tab.opts.class = classList.join(' ')
    }

    let hasClass = className => {
      return this.root.classList.contains(className)
    }

  </script>
</su-tabset>
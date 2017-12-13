<su-tabset>
  <div class="ui { opts.class } { getClass() } menu" if="{ !isBottomTabular() }">
    <a each="{ tab, i in tabs }" class="{active: tab.opts.active} item" onclick="{ click }">{ tab.opts.title }</a>
  </div>
  <yield />
  <div class="ui { opts.class } { getClass() } menu" if="{ isBottomTabular() }">
    <a each="{ tab, i in tabs }" class="{active: tab.opts.active} item" onclick="{ click }">{ tab.opts.title }</a>
  </div>

  <script>
    this.tabs = []

    this.on('mount', () => {
      this.tabs = this.tags['su-tab']

      if (Array.isArray(this.tabs)) {
        let defaultActive = false
        for (const tab of this.tabs) {
          initializeChild(tab)
          if (tab.opts.active) {
            defaultActive = true
          }
        }
        if (!defaultActive) {
          this.tabs[0].opts.active = true
        }
      } else {
        initializeChild(this.tabs)
      }

      this.update()
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = event => {
      const index = event.item.i

      for (const tab of this.tabs) {
        tab.opts.active = false
      }
      this.tabs[index].opts.active = true
      this.update()
    }


    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.isBottomTabular = () => {
      const classList = this.root.classList
      return classList.contains('tabular') && classList.contains('bottom')
    }

    this.getClass = () => {
      if (isTabular()) {
        return this.isBottomTabular() ? 'tabular attached' : 'top tabular attached'
      }
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    let initializeChild = tab => {
      if (tab.opts.class) {
        return
      }
      if (isTabular()) {
        if (this.isBottomTabular()) {
          tab.opts.class = 'segment top attached'
        } else {
          tab.opts.class = 'segment bottom attached'
        }
      } else {
        tab.opts.class = 'segment'
      }
    }

    let isTabular = () => {
      if (typeof opts.class === 'undefined') {
        return true
      }
      return this.root.classList.contains('tabular')
    }

  </script>
</su-tabset>
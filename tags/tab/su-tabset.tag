<su-tabset>
  <div class="ui top attached tabular menu">
    <a each="{ tab, i in tabs }" class="{active: active[i]} item" onclick="{ click }">{ tab.opts.title }</a>
  </div>
  <yield />

  <script>
    this.tabs = []
    this.active = []

    this.on('mount', () => {
      this.tabs = this.tags['su-tab']

      if (Array.isArray(this.tabs)) {
        let index = 0
        for (const tab of this.tabs) {
          initializeChild(tab, index++)
        }
      } else {
        initializeChild(this.tabs, 0)
      }

      this.update()
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = event => {
      const index = event.item.i
      this.active = []
      this.active[index] = true

      for (const tab of this.tabs) {
        tab.opts.active = this.active
      }
      this.update()
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    let initializeChild = (tab, index) => {
      tab.opts.active = this.active
      tab.opts.index = index
    }

  </script>
</su-tabset>
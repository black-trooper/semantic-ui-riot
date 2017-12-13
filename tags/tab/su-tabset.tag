<su-tabset>
  <div class="ui top attached tabular menu">
    <a each="{ tab, i in tabs }" class="{active: tab.opts.active} item" onclick="{ click }">{ tab.opts.title }</a>
  </div>
  <yield />

  <script>
    this.tabs = []

    this.on('mount', () => {
      this.tabs = this.tags['su-tab']

      if (Array.isArray(this.tabs)) {
        let defaultActive = false
        for (const tab of this.tabs) {
          if (tab.opts.active) {
            defaultActive = true
          }
        }
        if (!defaultActive) {
          this.tabs[0].opts.active = true
        }
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
  </script>
</su-tabset>
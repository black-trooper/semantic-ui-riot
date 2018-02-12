<su-tab-title>
  <a class="{opts.class} {active: active} item" onclick="{ click }">
    <yield />
  </a>

  <script>
    this.active = false
    let index = 0
    let tabs
    this.on('mount', () => {
      tabs = this.parent.tags['su-tab-title']

      if (!Array.isArray(tabs)) {
        tabs = [tabs]
      }
      tabs.forEach((tab, i) => {
        if (tab._riot_id == this._riot_id) {
          index = i
        }
      })
    })

    this.click = () => {
      tabs.forEach(tab => {
        tab.active = false
      })
      this.parent.parent.click(index)
      tabs[index].active = true
      this.update()
      this.trigger('click', this.parent.parent.tabs[index])
    }
  </script>
</su-tab-title>
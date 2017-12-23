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
      for (const tab of tabs) {
        if (tab._riot_id == this._riot_id) {
          break
        } else {
          index++
        }
      }
    })

    this.click = () => {
      for (const tab of tabs) {
        tab.active = false
      }
      this.parent.click(index)
      tabs[index].active = true
      this.update()
      this.trigger('click', this.parent.tabs[index])
    }
  </script>
</su-tab-title>
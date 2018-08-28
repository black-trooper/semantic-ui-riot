<su-tab-title>
  <a class="{opts.class} {active: active} item" onclick="{ click }" ref="item">
    <yield />
  </a>

  <script>
    this.active = false

    this.click = () => {
      this.parent.parent.clickForTitle(this.refs.item.innerText)
    }
  </script>
</su-tab-title>
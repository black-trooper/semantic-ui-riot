riot.tag2('su-tab-title', '<a class="{opts.class} {active: active} item" onclick="{click}" ref="item"> <yield></yield> </a>', '', '', function(opts) {
    this.active = false

    this.click = () => {
      this.parent.parent.clickForTitle(this.refs.item.innerText)
    }
});
riot.tag2('su-tab-title', '<a class="{opts.class} {active: active} item" onclick="{click}" ref="item"> <yield></yield> </a>', '', '', function(opts) {
    const tag = this
    tag.active = false

    tag.click = () => {
      tag.parent.parent.clickForTitle(tag.refs.item.innerText)
    }
});
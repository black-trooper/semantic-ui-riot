riot.tag2('su-accordion', '<div class="title {active: active}" onclick="{click}"> <i class="dropdown icon"></i> {opts.title} </div> <div class="content active {open : active} {close : !active}"> <yield></yield> </div>', '', '', function(opts) {
    const tag = this
    tag.active = false

    tag.click = () => {
      tag.trigger('click', tag)
    }
});
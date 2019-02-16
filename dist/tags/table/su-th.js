riot.tag2('su-th', '', '', 'onclick="{click}" class="{sorted: sorted} {ascending: sorted && !reverse} {descending: sorted && reverse}"', function(opts) {
    const tag = this
    tag.click = () => {
      tag.trigger('click', opts.field)
    }
});
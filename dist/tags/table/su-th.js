riot.tag2('su-th', '', '', 'onclick="{click}" class="{sorted: sorted} {ascending: sorted && !reverse} {descending: sorted && reverse}"', function(opts) {
    this.click = () => {
      this.trigger('click', opts.field)
    }
});
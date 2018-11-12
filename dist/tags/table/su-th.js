riot.tag2('su-th', '', '', 'onclick="{click}" class="{sorted: sorted} {ascending: !reverse} {descending: reverse}"', function(opts) {
    this.click = () => {
      this.trigger('click', opts.name)
    }
});
riot.tag2('su-tab', '<virtual if="{mounted}"><yield></yield></virtual>', 'su-tab.ui.segment,[data-is="su-tab"].ui.segment{ margin-top: 0; margin-bottom: 0; } su-tab.ui.segment.top.attached,[data-is="su-tab"].ui.segment.top.attached{ margin-top: 0 } su-tab.ui.segment.bottom.attached,[data-is="su-tab"].ui.segment.bottom.attached{ margin-bottom: 0 }', 'class="ui {opts.class} {active: active} tab"', function(opts) {
    this.active = false
    this.mounted = false
    this.on('mount', () => {
      this.update()
    })
    this.on('update', () => {
      if (this.active && !this.mounted) {
        this.mounted = true
      }
    })
});
riot.tag2('su-tab', '<virtual if="{mounted}"><yield></yield></virtual>', 'su-tab.ui.segment,[data-is="su-tab"].ui.segment{ margin-top: 0; margin-bottom: 0; } su-tab.ui.segment.top.attached,[data-is="su-tab"].ui.segment.top.attached{ margin-top: 0 } su-tab.ui.segment.bottom.attached,[data-is="su-tab"].ui.segment.bottom.attached{ margin-bottom: 0 }', 'class="ui {opts.class} {active: active} tab"', function(opts) {
    const tag = this

    tag.active = false
    tag.mounted = false

    tag.on('mount', onMount)
    tag.on('update', onUpdate)

    function onMount() {
      tag.update()
    }
    function onUpdate() {
      if (tag.active && !tag.mounted) {
        tag.mounted = true
      }
    }
});
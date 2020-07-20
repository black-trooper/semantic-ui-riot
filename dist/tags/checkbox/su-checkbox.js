riot.tag2('su-checkbox', '<input type="checkbox" checked="{checked}" onclick="{click}" ref="target" disabled="{isDisabled()}" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', 'su-checkbox.ui.checkbox label,[data-is="su-checkbox"].ui.checkbox label{ cursor: pointer; } su-checkbox.ui.read-only input[type="checkbox"],[data-is="su-checkbox"].ui.read-only input[type="checkbox"],su-checkbox.ui.disabled input[type="checkbox"],[data-is="su-checkbox"].ui.disabled input[type="checkbox"]{ cursor: default !important; }', 'class="ui checkbox {opts.class}"', function(opts) {
    const tag = this

    tag.checked = false
    tag.defaultChecked = false

    tag.changed = changed
    tag.click = click
    tag.getId = getId
    tag.isDisabled = isDisabled
    tag.on('mount', onMount)
    tag.on('update', onUpdate)
    tag.reset = reset

    let lastChecked
    let lastOptsChecked
    let shownMessage = false

    function onMount() {
      supportTraditionalOptions()
      if (tag.checked) {
        opts.checked = tag.checked
      } else {
        tag.checked = normalizeOptChecked()
      }
      lastChecked = tag.checked
      lastOptsChecked = tag.checked
      tag.defaultChecked = tag.checked
      tag.update()
    }

    function onUpdate() {
      supportTraditionalOptions()
      if (lastChecked != tag.checked) {
        opts.checked = tag.checked
        lastChecked = tag.checked
        lastOptsChecked = tag.checked
        parentUpdate()
      } else if (lastOptsChecked != normalizeOptChecked()) {
        tag.checked = normalizeOptChecked()
        lastChecked = tag.checked
        lastOptsChecked = tag.checked
        parentUpdate()
      }
    }

    function reset() {
      tag.checked = tag.defaultChecked
    }

    function changed() {
      return tag.checked !== tag.defaultChecked
    }

    function click() {
      if (isReadOnly() || tag.isDisabled()) {
        event.preventDefault()
        return
      }
      tag.checked = !tag.checked
      parentUpdate()
      tag.trigger('click', tag.checked)
    }

    function getId() {
      return `su-checkbox-${tag._riot_id}`
    }

    function isDisabled() {
      return tag.root.classList.contains('disabled')
    }

    function isReadOnly() {
      return tag.root.classList.contains('read-only')
    }

    function parentUpdate() {
      if (tag.parent && !tag.opts.deterParentUpdate) {
        tag.parent.update()
      }
    }

    function supportTraditionalOptions() {
      if (typeof opts.check !== 'undefined') {
        if (!shownMessage) {
          console.warn('\'check\' attribute is deprecated. Please use \'checked\'.')
        }
        shownMessage = true
        opts.checked = opts.check
        opts.check = undefined
      }
    }

    function normalizeOptChecked() {
      return opts.checked === true || opts.checked === 'checked' || opts.checked === 'true'
    }
});
riot.tag2('su-checkbox', '<input type="checkbox" checked="{checked}" onclick="{click}" ref="target" disabled="{isDisabled()}" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', 'su-checkbox.ui.checkbox label,[data-is="su-checkbox"].ui.checkbox label{ cursor: pointer; } su-checkbox.ui.read-only input[type="checkbox"],[data-is="su-checkbox"].ui.read-only input[type="checkbox"],su-checkbox.ui.disabled input[type="checkbox"],[data-is="su-checkbox"].ui.disabled input[type="checkbox"]{ cursor: default !important; }', 'class="ui checkbox {opts.class}"', function(opts) {
    const tag = this
    tag.checked = false
    tag.defaultChecked = false
    let lastChecked
    let lastOptsChecked

    tag.on('mount', () => {
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
    })

    tag.on('update', () => {
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
    })

    tag.reset = () => {
      tag.checked = tag.defaultChecked
    }

    tag.changed = () => {
      return tag.checked !== tag.defaultChecked
    }

    tag.click = () => {
      if (isReadOnly() || tag.isDisabled()) {
        event.preventDefault()
        return
      }
      tag.checked = !tag.checked
      parentUpdate()
      tag.trigger('click', tag.checked)
    }

    tag.getId = () => {
      return `su-checkbox-${tag._riot_id}`
    }

    tag.isDisabled = () => {
      return tag.root.classList.contains('disabled')
    }

    const isReadOnly = () => {
      return tag.root.classList.contains('read-only')
    }

    const parentUpdate = () => {
      if (tag.parent) {
        tag.parent.update()
      }
    }

    let shownMessage = false
    const supportTraditionalOptions = () => {
      if (typeof opts.check !== 'undefined') {
        if (!shownMessage) {
          console.warn('\'check\' attribute is deprecated. Please use \'checked\'.')
        }
        shownMessage = true
        opts.checked = opts.check
        opts.check = undefined
      }
    }

    const normalizeOptChecked = () => {
      return opts.checked === true || opts.checked === 'checked' || opts.checked === 'true'
    }
});
riot.tag2('su-radio', '<input type="radio" name="{name}" riot-value="{value}" checked="{checked}" onclick="{click}" ref="target" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', 'su-radio.ui.checkbox label,[data-is="su-radio"].ui.checkbox label{ cursor: pointer; } su-radio.ui.read-only input[type="radio"],[data-is="su-radio"].ui.read-only input[type="radio"],su-radio.ui.disabled input[type="radio"],[data-is="su-radio"].ui.disabled input[type="radio"]{ cursor: default !important; }', 'class="ui {radio: isRadio()} checkbox {opts.class}"', function(opts) {
    const tag = this
    tag.name = ''
    tag.checked = false
    let lastChecked
    let lastOptsCheck

    tag.on('mount', () => {
      if (tag.checked) {
        opts.checked = tag.checked
      } else {
        tag.checked = opts.checked === true || opts.checked === 'checked' || opts.checked === 'true'
      }
      lastChecked = tag.checked
      lastOptsCheck = opts.checked
      tag.update()
    })

    tag.on('update', () => {
      tag.name = opts.name
      tag.value = opts.value
      if (lastChecked != tag.checked) {
        opts.checked = tag.checked
        lastChecked = tag.checked
      } else if (lastOptsCheck != opts.checked) {
        tag.checked = opts.checked
        lastOptsCheck = opts.checked
      }
    })

    tag.click = event => {
      if (isReadOnly() || tag.isDisabled()) {
        event.preventDefault()
        return
      }
      tag.checked = event.target.checked
      tag.trigger('click', event.target.value)
    }

    const isReadOnly = () => {
      return tag.root.classList.contains('read-only')
    }

    tag.getId = () => {
      return `su-radio-${tag._riot_id}`
    }

    tag.isDisabled = () => {
      return tag.root.classList.contains('disabled')
    }

    tag.isRadio = () => {
      return !tag.root.classList.contains('slider')
    }
});
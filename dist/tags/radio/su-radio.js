riot.tag2('su-radio', '<input type="radio" name="{name}" riot-value="{value}" checked="{checked}" onclick="{click}" ref="target" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', 'su-radio.ui.checkbox label,[data-is="su-radio"].ui.checkbox label{ cursor: pointer; } su-radio.ui.read-only input[type="radio"],[data-is="su-radio"].ui.read-only input[type="radio"],su-radio.ui.disabled input[type="radio"],[data-is="su-radio"].ui.disabled input[type="radio"]{ cursor: default !important; }', 'class="ui {radio: isRadio()} checkbox {opts.class}"', function(opts) {
    const tag = this

    tag.checked = false
    tag.name = ''

    tag.click = click
    tag.getId = getId
    tag.isDisabled = isDisabled
    tag.isRadio = isRadio
    tag.on('mount', onMount)
    tag.on('update', onUpdate)

    let lastChecked
    let lastOptsCheck

    function onMount() {
      if (tag.checked) {
        opts.checked = tag.checked
      } else {
        tag.checked = opts.checked === true || opts.checked === 'checked' || opts.checked === 'true'
      }
      lastChecked = tag.checked
      lastOptsCheck = opts.checked
      tag.update()
    }

    function onUpdate() {
      tag.name = opts.name
      tag.value = opts.value
      if (lastChecked != tag.checked) {
        opts.checked = tag.checked
        lastChecked = tag.checked
      } else if (lastOptsCheck != opts.checked) {
        tag.checked = opts.checked
        lastOptsCheck = opts.checked
      }
    }

    function click(event) {
      if (isReadOnly() || tag.isDisabled()) {
        event.preventDefault()
        return
      }
      tag.checked = event.target.checked
      tag.trigger('click', event.target.value)
    }

    function isReadOnly() {
      return tag.root.classList.contains('read-only')
    }

    function getId() {
      return `su-radio-${tag._riot_id}`
    }

    function isDisabled() {
      return tag.root.classList.contains('disabled')
    }

    function isRadio() {
      return !tag.root.classList.contains('slider')
    }
});
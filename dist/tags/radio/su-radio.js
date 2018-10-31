riot.tag2('su-radio', '<input type="radio" name="{name}" riot-value="{value}" checked="{checked}" onclick="{click}" ref="target" id="{getId()}"> <label if="{!opts.label}" for="{getId()}"><yield></yield></label> <label if="{opts.label}" for="{getId()}">{opts.label}</label>', 'su-radio.ui.checkbox label,[data-is="su-radio"].ui.checkbox label{ cursor: pointer; } su-radio.ui.read-only input[type="radio"],[data-is="su-radio"].ui.read-only input[type="radio"],su-radio.ui.disabled input[type="radio"],[data-is="su-radio"].ui.disabled input[type="radio"]{ cursor: default!important; }', 'class="ui {radio: isRadio()} checkbox {opts.class}"', function(opts) {
    this.name = ''
    this.checked = false
    let lastChecked
    let lastOptsCheck

    this.on('mount', () => {
      if (this.checked) {
        opts.checked = this.checked
      } else {
        this.checked = opts.checked === true || opts.checked === 'checked' || opts.checked === 'true'
      }
      lastChecked = this.checked
      lastOptsCheck = opts.checked
      this.update()
    })

    this.on('update', () => {
      this.name = opts.name
      this.value = opts.value
      if (lastChecked != this.checked) {
        opts.checked = this.checked
        lastChecked = this.checked
      } else if (lastOptsCheck != opts.checked) {
        this.checked = opts.checked
        lastOptsCheck = opts.checked
      }
    })

    this.click = event => {
      if (isReadOnly() || this.isDisabled()) {
        event.preventDefault()
        return
      }
      this.checked = event.target.checked
      this.trigger('click', event.target.value)
    }

    const isReadOnly = () => {
      return this.root.classList.contains('read-only')
    }

    this.getId = () => {
      return `su-radio-${this._riot_id}`
    }

    this.isDisabled = () => {
      return this.root.classList.contains('disabled')
    }

    this.isRadio = () => {
      return !this.root.classList.contains('slider')
    }
});
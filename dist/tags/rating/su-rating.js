riot.tag2('su-rating', '<i class="icon {active: item.active} {selected: item.selected}" each="{item in items}" onclick="{parent.click.bind(this, item)}" onmouseover="{parent.mouseover.bind(this, item)}" onmouseout="{parent.mouseout}"></i>', '', 'class="ui rating {opts.class}"', function(opts) {
    this.items = []

    this.on('mount', () => {
      init(opts.max, opts.value)
    })

    this.on('update', () => {
      updateView()
    })

    this.reset = () => {
      this.value = this.defaultValue
    }

    this.changed = () => {
      return this.value != this.defaultValue
    }

    this.click = target => {
      if (isReadOnly()) {
        return
      }
      let valueChanged = false
      let beforeValue
      if (this.value != target.value) {
        beforeValue = this.value
        valueChanged = true
      }
      this.value = target.value
      updateView()
      parentUpdate()
      this.trigger('click', target.value)
      if (valueChanged) {
        this.trigger('change', { value: this.value, beforeValue: beforeValue })
      }
    }

    this.mouseover = target => {
      if (isReadOnly()) {
        return
      }
      this.items.forEach(item => {
        item.selected = item.value <= target.value
      })
    }

    this.mouseout = () => {
      this.items.forEach(item => {
        item.selected = false
      })
    }

    const isReadOnly = () => {
      return this.root.classList.contains('read-only')
    }

    const init = (max = 5, value = 0) => {
      this.value = value
      this.defaultValue = value
      this.items.length = 0
      for (let i = 0; i < max; i++) {
        this.items[i] = { value: i + 1, active: false, selected: false }
      }
      updateView()
      parentUpdate()
    }

    const updateView = () => {
      this.items.forEach(item => {
        item.active = item.value <= this.value
      })
    }

    const parentUpdate = () => {
      if (this.parent) {
        this.parent.update()
      } else {
        this.update()
      }
    }
});
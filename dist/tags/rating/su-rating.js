riot.tag2('su-rating', '<i class="icon {active: item.active} {selected: item.selected}" each="{item in items}" onclick="{parent.click.bind(this, item)}" onmouseover="{parent.mouseover.bind(this, item)}" onmouseout="{parent.mouseout}"></i>', '', 'class="ui rating {opts.class}"', function(opts) {
    const tag = this
    tag.items = []

    tag.on('mount', () => {
      init(opts.max, opts.value)
    })

    tag.on('update', () => {
      updateView()
    })

    tag.reset = () => {
      tag.value = tag.defaultValue
    }

    tag.changed = () => {
      return tag.value != tag.defaultValue
    }

    tag.click = target => {
      if (isReadOnly()) {
        return
      }
      let valueChanged = false
      let beforeValue
      if (tag.value != target.value) {
        beforeValue = tag.value
        valueChanged = true
      }
      tag.value = target.value
      updateView()
      parentUpdate()
      tag.trigger('click', target.value)
      if (valueChanged) {
        tag.trigger('change', { value: tag.value, beforeValue: beforeValue })
      }
    }

    tag.mouseover = target => {
      if (isReadOnly()) {
        return
      }
      tag.items.forEach(item => {
        item.selected = item.value <= target.value
      })
    }

    tag.mouseout = () => {
      tag.items.forEach(item => {
        item.selected = false
      })
    }

    const isReadOnly = () => {
      return tag.root.classList.contains('read-only')
    }

    const init = (max = 5, value = 0) => {
      tag.value = value
      tag.defaultValue = value
      tag.items.length = 0
      for (let i = 0; i < max; i++) {
        tag.items[i] = { value: i + 1, active: false, selected: false }
      }
      updateView()
      parentUpdate()
    }

    const updateView = () => {
      tag.items.forEach(item => {
        item.active = item.value <= tag.value
      })
    }

    const parentUpdate = () => {
      if (tag.parent) {
        tag.parent.update()
      } else {
        tag.update()
      }
    }
});
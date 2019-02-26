<su-rating class="ui rating { opts.class }">
  <i class="icon { active: item.active } { selected: item.selected }" each="{ item in items }"
    onclick="{ parent.click.bind(this, item) }" onmouseover="{ parent.mouseover.bind(this, item) }"
    onmouseout="{ parent.mouseout }"></i>

  <script>
    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.items = []

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    tag.reset = reset
    tag.changed = changed
    tag.click = click
    tag.mouseout = mouseout
    tag.mouseover = mouseover
    tag.on('mount', onMount)
    tag.on('update', onUpdate)

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
    function onMount() {
      init(opts.max, opts.value)
    }

    function onUpdate() {
      updateView()
    }

    function reset() {
      tag.value = tag.defaultValue
    }

    function changed() {
      return tag.value != tag.defaultValue
    }

    function click(target) {
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

    function mouseover(target) {
      if (isReadOnly()) {
        return
      }
      tag.items.forEach(item => {
        item.selected = item.value <= target.value
      })
    }

    function mouseout() {
      tag.items.forEach(item => {
        item.selected = false
      })
    }

    function isReadOnly() {
      return tag.root.classList.contains('read-only')
    }

    function init(max = 5, value = 0) {
      tag.value = value
      tag.defaultValue = value
      tag.items.length = 0
      for (let i = 0; i < max; i++) {
        tag.items[i] = { value: i + 1, active: false, selected: false }
      }
      updateView()
      parentUpdate()
    }

    function updateView() {
      tag.items.forEach(item => {
        item.active = item.value <= tag.value
      })
    }

    function parentUpdate() {
      if (tag.parent) {
        tag.parent.update()
      } else {
        tag.update()
      }
    }
  </script>
</su-rating>
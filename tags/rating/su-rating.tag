<su-rating class="ui rating { opts.class }">
  <i class="icon { active: active } { selected: selected }" each="{ items }" onclick="{ click }" onmouseover="{ mouseover }"
    onmouseout="{ mouseout }"></i>

  <script>
    this.items = []

    this.on('mount', () => {
      init(opts.max, opts.value)
    })

    // ===================================================================================
    //                                                                               State
    //                                                                               =====
    this.reset = () => {
      this.checked = this.defaultChecked
    }

    this.changed = () => {
      return this.checked !== this.defaultChecked
    }

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = event => {
      if (isReadOnly) {
        return
      }
      this.value = event.item.value
      updateView()
    }

    this.mouseover = event => {
      if (isReadOnly) {
        return
      }
      this.items.forEach(item => {
        item.selected = item.value <= event.item.value
      })
    }

    this.mouseout = () => {
      this.items.forEach(item => {
        item.selected = false
      })
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const isReadOnly = () => {
      return this.root.classList.contains('read-only')
    }

    const init = (max = 5, value = 0) => {
      this.value = value
      this.items.length = 0
      for (let i = 0; i < max; i++) {
        this.items[i] = { value: i + 1, active: false, selected: false }
      }
      updateView()
      this.update()
    }

    const updateView = () => {
      this.items.forEach(item => {
        item.active = item.value <= this.value
      })
    }
  </script>
</su-rating>
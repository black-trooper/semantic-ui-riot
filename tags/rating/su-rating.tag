<su-rating class="ui rating">
  <i class="icon { active: active }" each="{ items }" onclick="{ click }"></i>

  <script>
    this.items = []
    this.on('mount', () => {
      init(opts.max, opts.value)
    })

    this.click = event => {
      this.value = event.item.value
      updateView()
    }

    const init = (max = 5, value = 0) => {
      this.value = value
      this.items.length = 0
      for (let i = 0; i < max; i++) {
        this.items[i] = { value: i + 1, active: false }
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
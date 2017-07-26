<su-dropdown>
  <div class="ui selection dropdown { active: visible } { visible: visible }" onclick="{ click }" onblur="{ blur }">
    <i class="dropdown icon"></i>
    <div class="{ default: default} text">
      { label }
    </div>
    <div class="menu transition { visible: visible }" tabindex="-1">
      <div class="item {default: item.default}" each="{ item in items }" value="{ item.value }" default="{ item.default }" onclick="{ itemClick }">
        { item.label }
      </div>
    </div>
  </div>

  <style>
    .ui.dropdown .menu>.item.default {
      color: rgba(0, 0, 0, 0.4)
    }
  </style>

  <script>
    const self = this
    this.visible = false
    this.value = ''
    this.label = ''
    this.items = []

    this.on('mount', () => {
      if (!opts.dropdown) {
        opts.dropdown = {}
      }
      if (opts.items) {
        opts.dropdown.items = opts.items
      }
      if (opts.action) {
        opts.dropdown.action = opts.action
      }
      this.items = opts.dropdown.items
      this.label = this.items[0].label
      this.value = this.items[0].value
      this.default = this.items[0].default
      this.update()
    })

    this.click = () => {
      this.visible = !this.visible
      this.update()
    }

    this.itemClick = event => {
      self.value = event.target.value
      self.label = event.target.textContent
      self.default = event.target.attributes['default']
      this.update()
      self.parent.update()
      if (opts.dropdown.action) {
        opts.dropdown.action()
      }
    }

    this.blur = () => {
      this.visibile = false
    }
  </script>
</su-dropdown>
<su-dropdown>
  <div class="ui selection { search: search } dropdown { active: visible } { visible: visible }" onclick="{ click }">
    <i class="dropdown icon"></i>
    <input class="search" autocomplete="off" tabindex="0" ref="search" if="{ search }" onkeydown="{keydown}" onkeyup="{ keyup }"
    />
    <div class="{ default: default} text { filtered: filtered }">
      { label }
    </div>
    <div class="menu transition { transitionStatus }" tabindex="-1">
      <div class="item {default: item.default}" each="{ item in items }" if="{ item.select }" value="{ item.value }" default="{ item.default }"
        onclick="{ itemClick }">
        { item.label }
      </div>
      <div class="message" if="{ filtered && filteredCount == 0 }">No results found.</div>
    </div>
  </div>

  <style>
    .ui.dropdown .menu>.item.default {
      color: rgba(0, 0, 0, 0.4)
    }
  </style>

  <script>
    const self = this
    this.search = false
    this.visible = false
    this.filtered = false
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
      if (opts.search) {
        opts.dropdown.search = opts.search
      }
      this.items = opts.dropdown.items
      this.search = opts.dropdown.search

      this.label = this.items[0].label
      this.value = this.items[0].value
      this.default = this.items[0].default
      this.update()
      this.parent.update()
    })

    this.click = () => {
      this.select('')
      this.visible = !this.visible
      if (this.visible) {
        this.transitionStatus = 'visible animating in slide down'
        setTimeout(() => {
          this.transitionStatus = 'visible'
          this.update()
        }, 300)
      } else {
        this.transitionStatus = 'visible animating out slide up'
        setTimeout(() => {
          this.transitionStatus = 'hidden'
          this.update()
        }, 300)
      }

      if (this.search) {
        if (this.visible) {
          this.refs.search.focus()
        }
        else {
          this.refs.search.blur()
        }
      }
      this.update()
    }

    this.itemClick = event => {
      self.value = event.target.value
      self.label = event.target.textContent
      self.default = event.target.attributes['default']
      if (this.search) {
        this.refs.search.value = ''
        this.filtered = false
      }
      this.update()
      self.parent.update()
      if (opts.dropdown.action) {
        opts.dropdown.action()
      }
    }

    this.keydown = () => {
      this.filtered = true
      this.update()
    }

    this.keyup = event => {
      const value = event.target.value.toLowerCase()
      this.filtered = value.length > 0
      this.select(value)
    }

    this.select = target => {
      this.items.forEach(item => {
        item.select = item.label.toLowerCase().indexOf(target) >= 0
      })
      this.filteredCount = this.items.filter(item => {
        return item.select
      })
      this.update()
    }
  </script>
</su-dropdown>
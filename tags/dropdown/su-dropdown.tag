<su-dropdown>
  <div class="ui selection { search: search } dropdown { active: visible } { visible: visible }" onclick="{ click }">
    <i class="dropdown icon"></i>
    <input class="search" autocomplete="off" tabindex="0" ref="search" if="{ search }" onkeydown="{keydown}" onkeyup="{ keyup }"
    />
    <div class="{ default: default} text { filtered: filtered }">
      { label }
    </div>
    <div class="menu transition { transitionStatus }" tabindex="-1">
      <div class="{ item: !item.header } { header: item.header} {default: item.default}" each="{ item in items }" if="{ item.select }"
        value="{ item.value }" default="{ item.default }" onclick="{ itemClick }">
        { item.label }
      </div>
      <div class="message" if="{ filtered && filteredItems.length == 0 }">No results found.</div>
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

      document.addEventListener('click', this.handleClickOutside)
      this.update()
      this.parent.update()
    })

    this.on('unmount', () => {
      document.removeEventListener('click', this.handleClickOutside)
    })

    this.click = () => {
      this.visible = !this.visible
      if (this.visible) {
        this.open()
      } else {
        this.close()
      }
    }

    this.open = () => {
      this.select('')
      this.transitionStatus = 'visible animating in slide down'
      setTimeout(() => {
        this.transitionStatus = 'visible'
        this.update()
      }, 300)

      if (this.search) {
        this.refs.search.focus()
      }
      this.update()
    }

    this.close = () => {
      this.visible = false
      this.transitionStatus = 'visible animating out slide down'
      setTimeout(() => {
        this.transitionStatus = 'hidden'
        this.update()
      }, 300)

      if (this.search) {
        this.refs.search.blur()
        if (this.filtered && this.filteredItems.length > 0) {
          this.selectTarget(this.filteredItems[0])
        } else {
          this.refs.search.value = ''
          this.filtered = false
        }
      }
      this.update()
    }

    this.itemClick = event => {
      event.stopPropagation()
      if (event.target.classList.contains('header')) {
        return
      }
      this.selectTarget({
        value: event.target.value,
        label: event.target.textContent,
        default: event.target.attributes['default']
      })
      this.close()
    }

    this.selectTarget = target => {
      self.value = target.value
      self.label = target.label
      self.default = target.default
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
      this.filteredItems = this.items.filter(item => {
        return item.select
      })
      this.update()
    }

    this.handleClickOutside = e => {
      if (!this.root.contains(e.target) && this.visible) {
        this.close()
      }
    }
  </script>
</su-dropdown>
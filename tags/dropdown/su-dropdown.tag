<su-dropdown>
  <div class="ui selection {opts.class} { search: searchFlg } { multiple: multipleFlg} dropdown { active: visibleFlg } { visible: visibleFlg }"
    onclick="{ click }">
    <i class="dropdown icon"></i>
    <input class="search" autocomplete="off" tabindex="0" ref="condition" if="{ searchFlg }" onkeydown="{keydown}" onkeyup="{ keyup }"
    />
    <a each="{item in items}" class="ui label transition visible" style="display: inline-block !important;" if="{ item.selected }">
      { item.label }
      <i class="delete icon" onclick="{ unselect }"></i>
    </a>
    <div class="{ default: default} text { filtered: filtered }" if="{ !multipleFlg || !selectedFlg }">
      { label }
    </div>
    <div class="menu transition { transitionStatus }" tabindex="-1">
      <virtual each="{item in items}">
        <div class="item { default: item.default }" if="{ isVisible(item) }" value="{ item.value }" default="{ item.default }" onclick="{ itemClick }">
          <i class="{ item.icon } icon" if="{ item.icon }"></i>
          <img class="ui avatar image" src="{ item.image }" if="{ item.image }" />
          <span class="description" if="{ item.description }">{ item.description }</span>
          <span class="text">{ item.label }</span>
        </div>
        <div class="header" if="{ item.header && !filtered}">
          <i class="{ item.icon } icon" if="{ item.icon }"></i>
          { item.label }
        </div>
        <div class="divider" if="{ item.divider && !filtered}"></div>
      </virtual>
      <div class="message" if="{ filtered && filteredItems.length == 0 }">No results found.</div>
    </div>
  </div>

  <style>
    .ui.dropdown .menu>.item.default {
      color: rgba(0, 0, 0, 0.4)
    }
  </style>

  <script>
    this.searchFlg = false
    this.multipleFlg = false
    this.visibleFlg = false
    this.selectedFlg = false
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
      if (opts.multiple) {
        opts.dropdown.multiple = opts.multiple
      }
      this.items = opts.dropdown.items
      this.searchFlg = opts.dropdown.search
      this.multipleFlg = opts.dropdown.multiple

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

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = () => {
      this.visibleFlg = !this.visibleFlg
      if (this.visibleFlg) {
        this.open()
      } else {
        this.close()
      }
    }

    this.itemClick = event => {
      event.stopPropagation()
      if (this.multipleFlg) {
        if (!event.item.item.default) {
          event.item.item.selected = true
        }
        this.value = this.items.filter(item => item.selected).map(item => item.value)
        this.selectedFlg = this.items.some(item => item.selected)
        this.update()
        return
      }
      this.selectTarget({
        value: event.target.value,
        label: event.target.textContent,
        default: event.target.attributes['default']
      })
      this.close()
    }

    this.handleClickOutside = e => {
      if (!this.root.contains(e.target) && this.visibleFlg) {
        this.close()
      }
    }

    // -----------------------------------------------------
    //                                         search option
    //                                         -------------
    this.keydown = () => {
      this.filtered = true
      this.update()
    }

    this.keyup = event => {
      const value = event.target.value.toLowerCase()
      this.filtered = value.length > 0
      this.search(value)
    }

    // -----------------------------------------------------
    //                                       multiple option
    //                                       ---------------
    this.unselect = event => {
      event.stopPropagation()
      event.item.item.selected = false
      this.value = this.items.filter(item => item.selected).map(item => item.value)
      this.selectedFlg = this.items.some(item => item.selected)
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    this.open = () => {
      this.search('')
      this.transitionStatus = 'visible animating in slide down'
      setTimeout(() => {
        this.transitionStatus = 'visible'
        this.update()
      }, 300)

      if (this.searchFlg) {
        this.refs.condition.focus()
      }
      this.update()
    }

    this.close = () => {
      this.visibleFlg = false
      this.transitionStatus = 'visible animating out slide down'
      setTimeout(() => {
        this.transitionStatus = 'hidden'
        this.update()
      }, 300)

      if (this.searchFlg) {
        this.refs.condition.blur()
        if (this.filtered && this.filteredItems.length > 0) {
          this.selectTarget(this.filteredItems[0])
        } else {
          this.refs.condition.value = ''
          this.filtered = false
        }
      }
      this.update()
    }

    this.selectTarget = target => {
      this.value = target.value
      this.label = target.label
      this.default = target.default
      if (this.searchFlg) {
        this.refs.condition.value = ''
        this.filtered = false
      }
      this.update()
      this.parent.update()
      if (opts.dropdown.action) {
        opts.dropdown.action()
      }
    }

    this.search = target => {
      this.items.forEach(item => {
        item.searched = item.label && item.label.toLowerCase().indexOf(target) >= 0
      })
      this.filteredItems = this.items.filter(item => {
        return item.searched
      })
      this.update()
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.isVisible = item => {
      if (this.multipleFlg && (item.default || item.selected)) {
        return false
      }
      return item.searched && !item.header && !item.divider
    }
  </script>
</su-dropdown>
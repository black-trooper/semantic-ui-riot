<su-dropdown class="ui selection {opts.class} { search: opts.search } { multiple: opts.multiple} dropdown { active: isActive() } { visible: isActive() }"
  onclick="{ toggle }" onfocus="{ focus }" onblur="{ blur }" onkeydown="{ keydown }" onkeyup="{ keyup }" tabindex="{ opts.search ? -1 : getTabindex() }">
  <i class="dropdown icon"></i>
  <input class="search" autocomplete="off" tabindex="{ getTabindex() }" ref="condition" if="{ opts.search }" oninput="{ input }"
    onclick="{ clickSearch }" onfocus="{ focus }" onblur="{ blur }" />
  <a each="{item in opts.items}" class="ui label transition visible" style="display: inline-block !important;" if="{ item.selected }">
  { item.label }
  <i class="delete icon" onclick="{ unselect }"></i>
</a>
  <div class="{ default: default} text { filtered: filtered }" if="{ !opts.multiple || !selectedFlg }">
    { label }
  </div>
  <div class="menu transition { transitionStatus }" onmousedown="{ mousedown }" onmouseup="{ mouseup }" onblur="{ blur }" tabindex="-1">
    <div each="{item in opts.items}" value="{ item.value }" default="{ item.default }" onmousedown="{ mousedown }" onmouseup="{ mouseup }"
      class="{ item: isItem(item) } { header: item.header && !filtered} { divider: item.divider && !filtered} { default: item.default } { active: item.active } { selected: item.active }"
      onclick="{ itemClick }">
      <i class="{ item.icon } icon" if="{ item.icon }"></i>
      <img class="ui avatar image" src="{ item.image }" if="{ item.image }" />
      <span class="description" if="{ item.description }">{ item.description }</span>
      <span class="text">{ item.label }</span>
    </div>
    <div class="message" if="{ filtered && filteredItems.length == 0 }">No results found.</div>
  </div>

  <style>
    :scope.ui.dropdown .menu>.item.default {
      color: rgba(0, 0, 0, 0.4)
    }
  </style>

  <script>
    this.visibleFlg = false
    this.selectedFlg = false
    this.filtered = false
    this.transitionStatus = 'hidden'
    this.value = ''
    this.label = ''
    this.keys = {
      enter: 13,
      escape: 27,
      upArrow: 38,
      downArrow: 40,
    }

    if (opts.items && opts.items.length > 0) {
      this.label = opts.items[0].label
      this.value = opts.items[0].value
      this.default = opts.items[0].default
    }

    this.on('update', () => {
      if (opts.multiple) {
        opts.items.forEach(item => item.selected = false)
        opts.items.filter(item => this.value && this.value.indexOf(item.value) >= 0).forEach(item => item.selected = true)
        selectMultiTarget(true)
      } else if (opts.items) {
        const selected = opts.items.filter(item => item.value === this.value)
        if (selected && selected.length > 0) {
          const target = selected[0]
          if (this.label !== target.label) {
            selectTarget(target, true)
          }
        } else if (opts.items && opts.items.length > 0) {
          if (this.value != opts.items[0].value) {
            this.value = opts.items[0].value
          }
          if (this.label != opts.items[0].label) {
            this.label = opts.items[0].label
            this.default = opts.items[0].default
          }
        }
      }
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.toggle = () => {
      if (!this.visibleFlg) {
        open()
      } else {
        close()
      }
    }

    this.focus = () => {
      open()
    }

    this.mousedown = () => {
      this.itemActivated = true
    }

    this.mouseup = () => {
      this.itemActivated = false
    }

    this.blur = () => {
      if (!this.itemActivated) {
        close()
      }
    }

    this.itemClick = event => {
      event.stopPropagation()
      if (!this.isItem(event.item.item)) {
        return
      }
      if (opts.multiple) {
        if (!event.item.item.default) {
          event.item.item.selected = true
        }
        selectMultiTarget()
        return
      }
      selectTarget(event.item.item)
      close()
    }

    this.keydown = event => {
      const keyCode = event.keyCode
      if (keyCode == this.keys.escape) {
        close()
      }
      if (keyCode == this.keys.downArrow) {
        open()
      }
      if (keyCode != this.keys.upArrow && keyCode != this.keys.downArrow) {
        return true
      }

      event.preventDefault()
      const searchedItems = opts.items.filter(item => {
        if (opts.search && !item.searched) {
          return false
        }
        if (opts.multiple && (item.default || item.selected)) {
          return false
        }
        return true
      })
      if (searchedItems.length == 0) {
        return true
      }
      if (searchedItems.every(item => !item.active)) {
        searchedItems[0].active = true
        return true
      }

      const activeIndex = parseInt(searchedItems.map((item, index) => item.active ? index : -1).filter(index => index >= 0))
      if (keyCode == this.keys.upArrow) {
        const nextActiveItem = searchedItems.filter((item, index) => index < activeIndex && !item.header && !item.divider)
        if (nextActiveItem.length > 0) {
          searchedItems[activeIndex].active = false
          nextActiveItem[nextActiveItem.length - 1].active = true
        }
      }
      else if (keyCode == this.keys.downArrow) {
        const nextActiveItem = searchedItems.filter((item, index) => index > activeIndex && !item.header && !item.divider)

        if (nextActiveItem.length > 0) {
          searchedItems[activeIndex].active = false
          nextActiveItem[0].active = true
        }
      }
      this.update()
      scrollPosition()
    }

    this.keyup = event => {
      const keyCode = event.keyCode
      if (keyCode != this.keys.enter) {
        return
      }
      const searchedItems = opts.items.filter(item => item.searched && !item.selected)
      const index = parseInt(searchedItems.map((item, index) => item.active ? index : -1).filter(index => index >= 0))
      const activeItem = searchedItems[index]
      if (!activeItem) {
        return
      }

      if (opts.multiple) {
        activeItem.selected = true
        activeItem.active = false
        if (index < searchedItems.length - 1) {
          searchedItems[index + 1].active = true
        } else if (index > 0) {
          searchedItems[index - 1].active = true
        }
        selectMultiTarget()
      } else {
        activeItem.active = false
        selectTarget(activeItem)
        close()
      }
    }

    this.clickSearch = event => {
      event.stopPropagation()
    }

    // -----------------------------------------------------
    //                                         search option
    //                                         -------------
    this.input = event => {
      const value = event.target.value.toLowerCase()
      this.filtered = value.length > 0
      search(value)
    }

    // -----------------------------------------------------
    //                                       multiple option
    //                                       ---------------
    this.unselect = event => {
      event.stopPropagation()
      event.item.item.selected = false
      this.value = opts.items.filter(item => item.selected).map(item => item.value)
      this.selectedFlg = opts.items.some(item => item.selected)
      parentUpdate()
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    let open = () => {
      if (this.openning || this.closing || this.visibleFlg) {
        return
      }
      this.openning = true
      search('')
      this.transitionStatus = 'visible animating in slide down'
      opts.items.forEach(item => item.active = false)
      setTimeout(() => {
        this.openning = false
        this.visibleFlg = true
        this.transitionStatus = 'visible'
        this.update()
      }, 300)

      if (opts.search) {
        this.refs.condition.focus()
      }
      this.update()
      scrollPosition()
      this.trigger('open')
    }

    let close = () => {
      if (this.closing || !this.visibleFlg) {
        return
      }
      this.closing = true
      this.transitionStatus = 'visible animating out slide down'
      setTimeout(() => {
        this.closing = false
        this.visibleFlg = false
        this.transitionStatus = 'hidden'
        this.update()
      }, 300)

      if (opts.search) {
        this.refs.condition.blur()
        if (this.filtered && this.filteredItems.length > 0) {
          selectTarget(this.filteredItems[0])
        } else {
          this.refs.condition.value = ''
          this.filtered = false
        }
      }
      this.update()
      this.trigger('close')
    }

    let selectTarget = (target, updating) => {
      if (this.value === target.value &&
        this.label === target.label &&
        this.default === target.default) {
        if (!updating) {
          this.trigger('select', target)
        }
        return
      }
      this.value = target.value
      this.label = target.label
      this.default = target.default
      if (opts.search) {
        this.refs.condition.value = ''
        this.filtered = false
      }
      if (!updating) {
        this.update()
        parentUpdate()
        this.trigger('select', target)
        this.trigger('change', target)
      }
    }

    let selectMultiTarget = (updating) => {
      if (JSON.stringify(this.value) == JSON.stringify(opts.items.filter(item => item.selected).map(item => item.value))
        && this.selectedFlg == opts.items.some(item => item.selected)) {
        if (!updating) {
          this.trigger('select', opts.items.filter(item => item.selected))
        }
        return
      }
      this.value = opts.items.filter(item => item.selected).map(item => item.value)
      this.selectedFlg = opts.items.some(item => item.selected)
      if (!updating) {
        this.update()
        parentUpdate()
        this.trigger('select', opts.items.filter(item => item.selected))
        this.trigger('change', opts.items.filter(item => item.selected))
      }
    }

    let search = target => {
      opts.items.forEach(item => {
        item.searched = item.label && item.label.toLowerCase().indexOf(target) >= 0
      })
      this.filteredItems = opts.items.filter(item => {
        return item.searched
      })
      this.update()
      this.trigger('search')
    }

    let scrollPosition = () => {
      const menu = this.root.querySelector('.menu')
      const item = this.root.querySelector('.item.active')

      if (menu && item) {
        const menuScroll = menu.scrollTop
        const itemOffset = item.offsetTop
        const itemHeight = parseInt(document.defaultView.getComputedStyle(item, null).height.replace('px', ''))
        const menuHeight = parseInt(document.defaultView.getComputedStyle(menu, null).height.replace('px', ''))
        const belowPage = menuScroll + menuHeight < itemOffset + itemHeight
        const abovePage = itemOffset < menuScroll
        if (abovePage || belowPage) {
          menu.scrollTop = itemOffset
        }
      }
    }

    let parentUpdate = () => {
      if (this.parent) {
        this.parent.update()
      }
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.isItem = item => {
      if (opts.multiple && (item.default || item.selected)) {
        return false
      }
      return item.searched && !item.header && !item.divider
    }

    this.isActive = () => {
      if (this.closing) {
        return false
      }
      return this.openning || this.visibleFlg
    }

    this.getTabindex = () => {
      if (opts.tabindex) {
        return opts.tabindex
      }
      return 0
    }
  </script>
</su-dropdown>
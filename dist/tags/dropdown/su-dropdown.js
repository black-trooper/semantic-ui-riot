riot.tag2('su-dropdown', '<i class="dropdown icon"></i> <input class="search" autocomplete="off" tabindex="{getTabindex()}" ref="condition" if="{opts.search}" oninput="{input}" onclick="{stopPropagation}" onfocus="{focus}" onblur="{blur}" readonly="{isReadOnly()}"> <a each="{item in opts.items}" class="ui label transition visible" style="display: inline-block !important;" if="{item.selected}" onclick="{stopPropagation}"> {item.label} <i class="delete icon" onclick="{unselect}"></i> </a> <div class="{default: default} text {filtered: filtered}" if="{!opts.multiple || !selectedFlg}"> {label} </div> <div class="menu transition {transitionStatus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" tabindex="-1"> <div each="{item in opts.items}" riot-value="{item.value}" default="{item.default}" onmousedown="{mousedown}" onmouseup="{mouseup}" class="{item: isItem(item)} {header: item.header && !filtered} {divider: item.divider && !filtered} {default: item.default} {hover: item.active} {active: item.value == value} {selected: item.value == value}" onclick="{itemClick}" if="{isVisible(item)}"> <i class="{item.icon} icon" if="{item.icon}"></i> <img class="ui avatar image" riot-src="{item.image}" if="{item.image}"> <span class="description" if="{item.description}">{item.description}</span> <span class="text">{item.label}</span> </div> <div class="message" if="{filtered && filteredItems.length == 0}">No results found.</div> </div>', 'su-dropdown.ui.dropdown .menu>.item.default,[data-is="su-dropdown"].ui.dropdown .menu>.item.default{ color: rgba(0, 0, 0, 0.4) } su-dropdown.ui.dropdown .menu>.item.hover,[data-is="su-dropdown"].ui.dropdown .menu>.item.hover{ background: rgba(0, 0, 0, .05); color: rgba(0, 0, 0, .95); } su-dropdown.ui.dropdown .menu,[data-is="su-dropdown"].ui.dropdown .menu{ display: block; }', 'class="ui selection {opts.class} {search: opts.search} {multiple: opts.multiple} dropdown {active: isActive()} {visible: isActive()} {upward: upward}" onclick="{toggle}" onfocus="{focus}" onmousedown="{mousedown}" onmouseup="{mouseup}" onblur="{blur}" onkeydown="{keydown}" onkeyup="{keyup}" tabindex="{opts.search ? -1 : getTabindex()}"', function(opts) {
    const tag = this

    tag.defaultValue = ''
    tag.filtered = false
    tag.label = ''
    tag.selectedFlg = false
    tag.transitionStatus = 'hidden'
    tag.value = ''

    tag.blur = blur
    tag.changed = changed
    tag.focus = focus
    tag.getTabindex = getTabindex
    tag.isActive = isActive
    tag.isDisabled = isDisabled
    tag.input = input
    tag.isItem = isItem
    tag.isReadOnly = isReadOnly
    tag.isVisible = isVisible
    tag.itemClick = itemClick
    tag.keydown = keydown
    tag.keyup = keyup
    tag.mousedown = mousedown
    tag.mouseup = mouseup
    tag.on('before-mount', onBeforeMount)
    tag.on('mount', onMount)
    tag.on('update', onUpdate)
    tag.reset = reset
    tag.stopPropagation = stopPropagation
    tag.toggle = toggle
    tag.unselect = unselect

    let visibleFlg = false
    const keys = {
      enter: 13,
      escape: 27,
      upArrow: 38,
      downArrow: 40,
    }

    function onBeforeMount() {
      if (opts.items && opts.items.length > 0) {
        tag.label = opts.items[0].label
        tag.value = opts.items[0].value
        tag.default = opts.items[0].default
      }
    }

    function onMount() {
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      if (typeof opts.riotValue !== 'undefined') {
        tag.value = opts.riotValue
        tag.defaultValue = tag.value
        tag.update()
        parentUpdate()
      } else {
        tag.defaultValue = tag.value
      }
    }

    function onUpdate() {
      if (opts.multiple) {
        opts.items.forEach(item => item.selected = false)
        opts.items.filter(item => tag.value && tag.value.indexOf(item.value) >= 0).forEach(item => item.selected = true)
        selectMultiTarget(true)
      } else if (opts.items) {
        const selected = opts.items.filter(item => item.value === tag.value)
        if (selected && selected.length > 0) {
          const target = selected[0]
          if (tag.label !== target.label) {
            selectTarget(target, true)
          }
        } else if (opts.items && opts.items.length > 0) {
          if (tag.value != opts.items[0].value) {
            tag.value = opts.items[0].value
          }
          if (tag.label != opts.items[0].label) {
            tag.label = opts.items[0].label
            tag.default = opts.items[0].default
          }
        }
      }
    }

    function reset() {
      tag.value = tag.defaultValue
    }

    function changed() {
      if (opts.multiple) {
        const value = tag.value ? tag.value : []
        const defaultValue = tag.defaultValue ? tag.defaultValue : []
        return value.toString() !== defaultValue.toString()
      }
      return tag.value !== tag.defaultValue
    }

    function toggle() {
      if (!visibleFlg) {
        open()
      } else {
        close()
      }
    }

    function focus() {
      open()
    }

    function mousedown() {
      tag.itemActivated = true
    }

    function mouseup() {
      tag.itemActivated = false
    }

    function blur() {
      if (!tag.itemActivated) {
        if (!tag.closing && visibleFlg) {
          const target = opts.multiple ? opts.items.filter(item => item.selected) : { value: tag.value, label: tag.label, default: tag.default }
          tag.trigger('blur', target)
        }
        close()
      }
    }

    function itemClick(event) {
      event.stopPropagation()
      if (!tag.isItem(event.item.item)) {
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

    function keydown(event) {
      const keyCode = event.keyCode
      if (keyCode == keys.escape) {
        close()
      }
      if (keyCode == keys.downArrow) {
        open()
      }
      if (keyCode != keys.upArrow && keyCode != keys.downArrow) {
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
      if (keyCode == keys.upArrow) {
        const nextActiveItem = searchedItems.filter((item, index) => index < activeIndex && !item.header && !item.divider)
        if (nextActiveItem.length > 0) {
          searchedItems[activeIndex].active = false
          nextActiveItem[nextActiveItem.length - 1].active = true
        }
      }
      else if (keyCode == keys.downArrow) {
        const nextActiveItem = searchedItems.filter((item, index) => index > activeIndex && !item.header && !item.divider)

        if (nextActiveItem.length > 0) {
          searchedItems[activeIndex].active = false
          nextActiveItem[0].active = true
        }
      }
      tag.update()
      scrollPosition()
    }

    function keyup(event) {
      const keyCode = event.keyCode
      if (keyCode != keys.enter) {
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

    function stopPropagation(event) {
      event.stopPropagation()
    }

    function input(event) {
      const value = event.target.value.toLowerCase()
      tag.filtered = value.length > 0
      search(value)
    }

    function unselect(event) {
      event.stopPropagation()
      event.item.item.selected = false
      tag.value = opts.items.filter(item => item.selected).map(item => item.value)
      tag.selectedFlg = opts.items.some(item => item.selected)
      parentUpdate()
    }

    function open() {
      if (tag.openning || tag.closing || visibleFlg || tag.isReadOnly() || tag.isDisabled()) {
        return
      }
      tag.openning = true
      search('')
      tag.upward = isUpward()
      tag.transitionStatus = `visible animating in slide ${tag.upward ? 'up' : 'down'}`
      opts.items.forEach(item => item.active = false)
      setTimeout(() => {
        tag.openning = false
        visibleFlg = true
        tag.transitionStatus = 'visible'
        tag.update()
      }, 300)

      if (opts.search) {
        tag.refs.condition.focus()
      }
      tag.update()
      scrollPosition()
      tag.trigger('open')
    }

    function close() {
      if (tag.closing || !visibleFlg) {
        return
      }
      tag.closing = true
      tag.transitionStatus = `visible animating out slide ${tag.upward ? 'up' : 'down'}`
      setTimeout(() => {
        tag.closing = false
        visibleFlg = false
        tag.transitionStatus = 'hidden'
        tag.update()
      }, 300)

      if (opts.search) {
        tag.refs.condition.blur()
        if (tag.filtered && tag.filteredItems.length > 0) {
          selectTarget(tag.filteredItems[0])
        } else {
          tag.refs.condition.value = ''
          tag.filtered = false
        }
      }
      tag.update()
      tag.trigger('close')
    }

    function selectTarget(target, updating) {
      if (tag.value === target.value &&
        tag.label === target.label &&
        tag.default === target.default) {
        if (!updating) {
          tag.trigger('select', target)
        }
        return
      }
      tag.value = target.value
      tag.label = target.label
      tag.default = target.default
      if (opts.search) {
        tag.refs.condition.value = ''
        tag.filtered = false
      }
      if (!updating) {
        tag.update()
        parentUpdate()
        tag.trigger('select', target)
        tag.trigger('change', target)
      }
    }

    function selectMultiTarget(updating) {
      if (JSON.stringify(tag.value) == JSON.stringify(opts.items.filter(item => item.selected).map(item => item.value))
        && tag.selectedFlg == opts.items.some(item => item.selected)) {
        if (!updating) {
          tag.trigger('select', opts.items.filter(item => item.selected))
        }
        return
      }
      tag.value = opts.items.filter(item => item.selected).map(item => item.value)
      tag.selectedFlg = opts.items.some(item => item.selected)
      if (!updating) {
        tag.update()
        parentUpdate()
        tag.trigger('select', opts.items.filter(item => item.selected))
        tag.trigger('change', opts.items.filter(item => item.selected))
      }
    }

    function search(target) {
      opts.items.forEach(item => {
        item.searched = item.label && item.label.toLowerCase().indexOf(target) >= 0
      })
      tag.filteredItems = opts.items.filter(item => {
        return item.searched
      })
      tag.update()
      tag.trigger('search')
    }

    function scrollPosition() {
      const menu = tag.root.querySelector('.menu')
      const item = tag.root.querySelector('.item.hover')

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

    function parentUpdate() {
      if (tag.parent) {
        tag.parent.update()
      }
    }

    function isUpward() {
      if (opts.direction == 'upward') {
        return true
      }
      if (opts.direction == 'downward') {
        return false
      }
      const dropdown = tag.root.getBoundingClientRect()
      const windowHeight = document.documentElement.offsetHeight || document.body.offsetHeight
      const menuHeight = tag.root.querySelector('.menu').getBoundingClientRect().height
      const above = menuHeight <= dropdown.top
      const below = windowHeight >= dropdown.top + dropdown.height + menuHeight

      if (below) {
        return false
      }
      if (!below && !above) {
        return false
      }
      return true
    }

    function isItem(item) {
      return item.searched && !item.header && !item.divider
    }

    function isActive() {
      if (tag.closing) {
        return false
      }
      return tag.openning || visibleFlg
    }

    function getTabindex() {
      if (opts.tabindex) {
        return opts.tabindex
      }
      return 0
    }

    function isReadOnly() {
      return tag.root.classList.contains('read-only')
    }

    function isDisabled() {
      return tag.root.classList.contains('disabled')
    }

    function isVisible(item) {
      if (opts.multiple && item.default) {
        return false
      }
      if (item.selected) {
        return false
      }
      return item.searched || item.divider || item.header
    }
});
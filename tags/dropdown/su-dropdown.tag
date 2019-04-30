<su-dropdown
  class="ui selection {props.class} { props.search && 'search' } { props.multiple && 'multiple'} dropdown { isActive() && 'active visible' } { upward && 'upward' }"
  onclick="{ onToggle }" onfocus="{ onFocus }" onmousedown="{ onMousedown }" onmouseup="{ onMouseup }"
  onblur="{ onBlur }" onkeydown="{ onKeydown }" onkeyup="{ onKeyup }" tabindex="{ props.search ? -1 : getTabindex() }">
  <i class="dropdown icon"></i>あiuee
  <input class="search" autocomplete="off" tabindex="{ getTabindex() }" ref="condition" if="{ props.search }" oninput="{ onInput }"
    onclick="{ stopPropagation }" onfocus="{ onFocus }" onblur="{ onBlur }" readonly="{ readonly }" />
  <a each="{item in props.items}" class="ui label transition visible" style="display: inline-block !important;" if="{ item.selected }"
    onclick="{ stopPropagation }">
    { item.label }
    <i class="delete icon" onclick="{ onUnselect }"></i>
  </a>
  <div class="{ defaultFlg && 'default'} text { filtered && 'filtered' }" if="{ !props.multiple || !selectedFlg }">
    { label }
  </div>

  <div class="menu transition { transitionStatus }" onmousedown="{ onMousedown }" onmouseup="{ onMouseup }"
    onblur="{ onBlur }" tabindex="-1">
    <div each="{item in props.items}" value="{ item.value }" default="{ item.default }" onmousedown="{ onMousedown }"
      onmouseup="{ onMouseup }"
      class="{ isItem(item) && 'item' } { item.header && !filtered && 'header' } { item.divider && !filtered && 'divider' } { item.default && 'default'  } { item.active && 'hover'  } { item.value == value && 'active selected'  }"
      onclick="{ event => onItemClick(event, item) }" if="{ isVisible(item) }">
      <i class="{ item.icon } icon" if="{ item.icon }"></i>
      <img class="ui avatar image" src="{ item.image }" if="{ item.image }" />
      <span class="description" if="{ item.description }">{ item.description }</span>
      <span class="text">{ item.label }</span>
    </div>
    <div class="message" if="{ filtered && filteredItems.length == 0 }">No results found.</div>
  </div>

  <style>
    :host.ui.dropdown .menu>.item.default {
      color: rgba(0, 0, 0, 0.4)
    }

    :host.ui.dropdown .menu>.item.hover {
      background: rgba(0, 0, 0, .05);
      color: rgba(0, 0, 0, .95);
    }

    :host.ui.dropdown .menu {
      display: block;
    }
  </style>

  <script>
    export default {
      state: {
        defaultValue: '',
        filtered: false,
        label: '',
        selectedFlg: false,
        transitionStatus: 'hidden',
        value: '',
      },
      changed: false,
      visibleFlg: false,
      keys: {
        enter: 13,
        escape: 27,
        upArrow: 38,
        downArrow: 40,
      },
      onBlur,
      onFocus,
      onInput,
      onItemClick,
      onKeydown,
      onKeyup,
      onMousedown,
      onMouseup,
      onToggle,
      onUnselect,
      stopPropagation,

      getTabindex,
      isActive,
      isDisabled,
      isItem,
      isReadOnly,
      isVisible,
      reset,
    }

    // ===================================================================================
    //                                                                           Lifecycle
    //                                                                           =========
    function onBeforeMount() {
      if (props.items && props.items.length > 0) {
        this.label = props.items[0].label
        this.value = props.items[0].value
        this.defaultFlg = props.items[0].default
      }
    }

    function onMounted(props, state) {
      if (typeof props.riotValue === 'undefined' && typeof props.value !== 'undefined') {
        props.riotValue = props.value
      }
      if (typeof props.riotValue !== 'undefined') {
        this.value = props.riotValue
        this.defaultValue = this.value
        this.update()
        parentUpdate()
      } else {
        this.defaultValue = this.value
      }
    }

    function onBeforeUpdate(props, state) {
      if (props.multiple) {
        const value = this.value ? this.value : []
        const defaultValue = this.defaultValue ? this.defaultValue : []
        return value.toString() !== defaultValue.toString()
      }
      this.changed = this.value !== this.defaultValue
      this.readonly = this.root.classList.contains('read-only')
      this.disabled = this.root.classList.contains('disabled')
    }

    function onUpdated(props, state) {
      if (props.multiple) {
        props.items.forEach(item => item.selected = false)
        props.items.filter(item => this.value && this.value.indexOf(item.value) >= 0).forEach(item => item.selected = true)
        selectMultiTarget(true)
      } else if (props.items) {
        const selected = props.items.filter(item => item.value === this.value)
        if (selected && selected.length > 0) {
          const target = selected[0]
          if (this.label !== target.label) {
            selectTarget(this, target, true)
          }
        } else if (props.items && props.items.length > 0) {
          if (this.value != props.items[0].value) {
            this.value = props.items[0].value
          }
          if (this.label != props.items[0].label) {
            this.label = props.items[0].label
            this.defaultFlg = props.items[0].default
          }
        }
      }
    }

    function reset() {
      this.value = this.defaultValue
    }

    // ===================================================================================
    //                                                                              Events
    //                                                                              ======
    function onToggle() {
      if (!this.visibleFlg) {
        open(this)
      } else {
        close(this)
      }
    }

    function onFocus() {
      open(this)
    }

    function onMousedown() {
      this.itemActivated = true
    }

    function onMouseup() {
      this.itemActivated = false
    }

    function onBlur() {
      if (!this.itemActivated) {
        if (!this.closing && visibleFlg) {
          const target = props.multiple ? props.items.filter(item => item.selected) : { value: this.value, label: this.label, default: this.defaultFlg }
          this.trigger('blur', target)
        }
        close()
      }
    }

    function onItemClick(event, item) {
      event.stopPropagation()
      if (!this.isItem(event.item.item)) {
        return
      }
      if (props.multiple) {
        if (!event.item.item.default) {
          event.item.item.selected = true
        }
        selectMultiTarget()
        return
      }
      selectTarget(this, event.item.item)
      close()
    }

    function onKeydown(event) {
      const keyCode = event.keyCode
      if (keyCode == keys.escape) {
        close(this)
      }
      if (keyCode == keys.downArrow) {
        open(this)
      }
      if (keyCode != keys.upArrow && keyCode != keys.downArrow) {
        return true
      }

      event.preventDefault()
      const searchedItems = props.items.filter(item => {
        if (props.search && !item.searched) {
          return false
        }
        if (props.multiple && (item.default || item.selected)) {
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
      this.update()
      scrollPosition()
    }

    function onKeyup(event) {
      const keyCode = event.keyCode
      if (keyCode != keys.enter) {
        return
      }
      const searchedItems = props.items.filter(item => item.searched && !item.selected)
      const index = parseInt(searchedItems.map((item, index) => item.active ? index : -1).filter(index => index >= 0))
      const activeItem = searchedItems[index]
      if (!activeItem) {
        return
      }

      if (props.multiple) {
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
        selectTarget(this, activeItem)
        close()
      }
    }

    function stopPropagation(event) {
      event.stopPropagation()
    }

    // -----------------------------------------------------
    //                                         search option
    //                                         -------------
    function onInput(event) {
      const value = event.target.value.toLowerCase()
      this.filtered = value.length > 0
      search(value)
    }

    // -----------------------------------------------------
    //                                       multiple option
    //                                       ---------------
    function onUnselect(event) {
      event.stopPropagation()
      event.item.item.selected = false
      this.value = props.items.filter(item => item.selected).map(item => item.value)
      this.selectedFlg = props.items.some(item => item.selected)
      parentUpdate()
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    function open(tag) {
      if (tag.openning || tag.closing || visibleFlg || tag.readonly || tag.disabled) {
        return
      }
      tag.openning = true
      search('')
      tag.upward = isUpward()
      tag.transitionStatus = `visible animating in slide ${tag.upward ? 'up' : 'down'}`
      props.items.forEach(item => item.active = false)
      setTimeout(() => {
        tag.openning = false
        visibleFlg = true
        tag.transitionStatus = 'visible'
        tag.update()
      }, 300)

      if (props.search) {
        tag.refs.condition.focus()
      }
      tag.update()
      scrollPosition()
      tag.trigger('open')
    }

    function close(tag) {
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

      if (props.search) {
        tag.refs.condition.blur()
        if (tag.filtered && tag.filteredItems.length > 0) {
          selectTarget(tag, tag.filteredItems[0])
        } else {
          tag.refs.condition.value = ''
          tag.filtered = false
        }
      }
      tag.update()
      tag.trigger('close')
    }

    function selectTarget(tag, target, updating) {
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
      if (props.search) {
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

    function selectMultiTarget(tag, updating) {
      if (JSON.stringify(tag.value) == JSON.stringify(props.items.filter(item => item.selected).map(item => item.value))
        && tag.selectedFlg == props.items.some(item => item.selected)) {
        if (!updating) {
          tag.trigger('select', props.items.filter(item => item.selected))
        }
        return
      }
      tag.value = props.items.filter(item => item.selected).map(item => item.value)
      tag.selectedFlg = props.items.some(item => item.selected)
      if (!updating) {
        tag.update()
        parentUpdate()
        tag.trigger('select', props.items.filter(item => item.selected))
        tag.trigger('change', props.items.filter(item => item.selected))
      }
    }

    function search(tag, target) {
      props.items.forEach(item => {
        item.searched = item.label && item.label.toLowerCase().indexOf(target) >= 0
      })
      tag.filteredItems = props.items.filter(item => {
        return item.searched
      })
      tag.update()
      tag.trigger('search')
    }

    function scrollPosition(tag) {
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

    function parentUpdate(tag) {
      if (tag.parent) {
        tag.parent.update()
      }
    }

    function isUpward() {
      if (props.direction == 'upward') {
        return true
      }
      if (props.direction == 'downward') {
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
      if (this.closing) {
        return false
      }
      return this.openning || visibleFlg
    }

    function getTabindex() {
      if (props.tabindex) {
        return props.tabindex
      }
      return 0
    }

    function isVisible(item) {
      if (props.multiple && item.default) {
        return false
      }
      if (item.selected) {
        return false
      }
      return item.searched || item.divider || item.header
    }
  </script>
</su-dropdown>
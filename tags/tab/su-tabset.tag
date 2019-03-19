<su-tabset>
  <div class="ui { opts.class } { getClass() } menu" if="{ !isBottom() && !hasTitle() }">
    <a each="{ tab, i in tabs }" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{ click }">{ tab.opts.label }</a>
  </div>
  <yield />
  <div class="ui { opts.class } { getClass() } menu" if="{ isBottom() && !hasTitle() }">
    <a each="{ tab, i in tabs }" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{ click }">{ tab.opts.label }</a>
  </div>

  <script>
    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.tabs = []

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    tag.click = click
    tag.clickForTitle = clickForTitle
    tag.getClass = getClass
    tag.hasTitle = hasTitle
    tag.isBottom = isBottom
    tag.on('mount', onMount)
    tag.on('update', onUpdate)

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========
    let lastOptsActive, lastActive, active
    let shownMessage = false

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
    function onMount() {
      if (tag.tags['su-tab-header']) {
        tag.tags['su-tab-header'].opts.class = getTitleClass()
      }

      tag.tabs = tag.tags['su-tab']
      if (typeof tag.tabs === 'undefined') {
        return
      }
      if (!Array.isArray(tag.tabs)) {
        tag.tabs = [tag.tabs]
      }
      supportTraditionalOptions()

      if (typeof opts.active === 'undefined') {
        const titles = tag.hasTitle()
        if (titles) {
          opts.active = titles[0].root.innerText.trim()
        } else {
          opts.active = tag.tabs[0].opts.label
        }
      }

      tag.tabs.forEach(tab => {
        initializeChild(tab)
      })

      tag.update()
    }

    function onUpdate() {
      supportTraditionalOptions()
      let changed = false
      if (lastOptsActive != opts.active) {
        lastOptsActive = opts.active
        active = opts.active
        changed = true
      }
      if (lastActive != active) {
        lastActive = active
        changed = true
      }

      if (changed) {
        const titles = tag.hasTitle()
        if (titles) {
          let index
          titles.forEach((title, i) => {
            title.active = false
            if (title.root.innerText.trim() === active.trim()) {
              title.active = true
              index = i
            }
          })
          if (!titles.some(title => title.active)) {
            titles[0].active = true
            index = 0
          }
          tag.tabs.forEach((tab, i) => {
            tab.active = index == i
          })
        } else {
          tag.tabs.forEach(tab => {
            tab.active = tab.opts.label == active
          })
          if (!tag.tabs.some(tab => tab.active)) {
            tag.tabs[0].active = true
          }
        }
      }
    }

    function click(event) {
      active = event.item.tab.opts.label
      tag.update()
      tag.trigger('click', active)
    }

    function clickForTitle(title) {
      active = title
      tag.update()
      tag.trigger('click', active)
    }

    function isBottom() {
      return hasClass('bottom')
    }

    function hasTitle() {
      if (!tag.tags['su-tab-header']) {
        return false
      }
      const titles = tag.tags['su-tab-header'].tags['su-tab-title']
      if (!titles) {
        return false
      }

      if (!Array.isArray(titles)) {
        return [titles]
      }
      return titles
    }

    function getClass() {
      if (hasClass('tabular') && !hasClass('attached')) {
        return 'attached'
      }
    }

    function initializeChild(tab) {
      tab.mounted = !opts.lazyMount
      if (tab.opts.class) {
        return
      }
      let classList = hasClass('no-segment') ? [] : ['segment']
      if (hasClass('tabular')) {
        classList.push('tabular')
      }
      if ((hasClass('attached') || hasClass('tabular')) && !hasClass('left') && !hasClass('right')) {
        if (hasClass('bottom')) {
          classList.push('top')
        } else {
          classList.push('bottom')
        }
        classList.push('attached')
      }
      tab.opts.class = classList.join(' ')
    }

    function getTitleClass() {
      const classList = []
      if (hasClass('left') || hasClass('right')) {
        classList.push('vertical')
        classList.push('fluid')
      }
      if (hasClass('left')) {
        classList.push('left')
      }
      if (hasClass('right')) {
        classList.push('right')
      }
      if (hasClass('tabular')) {
        classList.push('tabular')
      }
      return classList.join(' ')
    }

    function hasClass(className) {

      return tag.root.classList.contains(className)
    }

    function supportTraditionalOptions() {
      tag.tabs.forEach(tab => {
        if (typeof tab.opts.title !== 'undefined') {
          if (!shownMessage) {
            console.warn('\'title\' attribute is deprecated. Please use \'label\'.')
          }
          shownMessage = true
          tab.opts.label = tab.opts.title
          tab.opts.title = undefined
        }
      })
    }
  </script>
</su-tabset>
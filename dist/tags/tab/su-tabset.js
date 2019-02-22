riot.tag2('su-tabset', '<div class="ui {opts.class} {getClass()} menu" if="{!isBottom() && !hasTitle()}"> <a each="{tab, i in tabs}" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{click}">{tab.opts.label}</a> </div> <yield></yield> <div class="ui {opts.class} {getClass()} menu" if="{isBottom() && !hasTitle()}"> <a each="{tab, i in tabs}" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{click}">{tab.opts.label}</a> </div>', '', '', function(opts) {
    this.tabs = []
    let lastOptsActive, lastActive, active

    this.on('mount', () => {
      if (this.tags['su-tab-header']) {
        this.tags['su-tab-header'].opts.class = getTitleClass()
      }

      this.tabs = this.tags['su-tab']
      if (typeof this.tabs === 'undefined') {
        return
      }
      if (!Array.isArray(this.tabs)) {
        this.tabs = [this.tabs]
      }
      supportTraditionalOptions()

      if (typeof opts.active === 'undefined') {
        const titles = this.hasTitle()
        if (titles) {
          opts.active = titles[0].root.innerText.trim()
        } else {
          opts.active = this.tabs[0].opts.label
        }
      }

      this.tabs.forEach(tab => {
        initializeChild(tab)
      })

      this.update()
    })

    this.on('update', () => {
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
        const titles = this.hasTitle()
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
          this.tabs.forEach((tab, i) => {
            tab.active = index == i
          })
        } else {
          this.tabs.forEach(tab => {
            tab.active = tab.opts.label == active
          })
          if (!this.tabs.some(tab => tab.active)) {
            this.tabs[0].active = true
          }
        }
      }
    })

    this.click = event => {
      active = event.item.tab.opts.label
      this.update()
      this.trigger('click', active)
    }

    this.clickForTitle = title => {
      active = title
      this.update()
      this.trigger('click', active)
    }

    this.isBottom = () => {
      return hasClass('bottom')
    }

    this.hasTitle = () => {
      if (!this.tags['su-tab-header']) {
        return false
      }
      const titles = this.tags['su-tab-header'].tags['su-tab-title']
      if (!titles) {
        return false
      }

      if (!Array.isArray(titles)) {
        return [titles]
      }
      return titles
    }

    this.getClass = () => {
      if (hasClass('tabular') && !hasClass('attached')) {
        return 'attached'
      }
    }

    const initializeChild = tab => {
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

    const getTitleClass = () => {
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

    const hasClass = className => {
      return this.root.classList.contains(className)
    }

    let shownMessage = false
    const supportTraditionalOptions = () => {
      this.tabs.forEach(tab => {
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

});
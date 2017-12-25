<su-tabset>
  <div class="ui { opts.class } { getClass() } menu" if="{ !isBottom() && !hasTitle() }">
    <a each="{ tab, i in tabs }" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{ click.bind(this, i) }">{ tab.opts.title }</a>
  </div>
  <yield />
  <div class="ui { opts.class } { getClass() } menu" if="{ isBottom() && !hasTitle() }">
    <a each="{ tab, i in tabs }" class="{tab.opts.titleClass} {active: tab.active} item" onclick="{ click.bind(this, i) }">{ tab.opts.title }</a>
  </div>

  <script>
    this.tabs = []

    // this.on('before-mount', () => {
    //   console.log(this.root.innerHTML)
    //   console.log(this.root.querySelector('su-tab-title'))
    //   if (this.root.querySelector('su-tab-title')) {
    //     const parentElement = this.root.querySelector('su-tab-title').parentElement
    //     parentElement.innerHTML
    //       = '<div class="ui { opts.class } { getClass() } menu">' + parentElement.innerHTML + '</div>'
    //   }
    // })

    this.on('mount', () => {
      this.tabs = this.tags['su-tab']

      if (!Array.isArray(this.tabs)) {
        this.tabs = [this.tabs]
      }
      let defaultActive = false
      for (const tab of this.tabs) {
        initializeChild(tab)
        if (tab.opts.active) {
          defaultActive = true
          tab.active = true
        }
      }
      if (!defaultActive) {
        const titles = this.hasTitle()
        if (titles) {
          titles[0].active = true
        }
        this.tabs[0].active = true
      }

      this.update()
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.click = index => {
      for (const tab of this.tabs) {
        tab.active = false
      }
      this.tabs[index].active = true
      this.update()
      this.trigger('click', this.tabs[index])
    }


    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.isBottom = () => {
      return hasClass('bottom')
    }

    this.hasTitle = () => {
      return this.tags['su-tab-title']
    }

    this.getClass = () => {
      if (hasClass('tabular') && !hasClass('attached')) {
        return 'attached'
      }
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    let initializeChild = tab => {
      if (tab.opts.class) {
        return
      }
      let classList = ['segment']
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

    let hasClass = className => {
      return this.root.classList.contains(className)
    }

  </script>
</su-tabset>
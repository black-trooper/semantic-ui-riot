riot.tag2('su-pagination', '<div class="ui pagination menu {opts.class}"> <a class="icon item {disabled: activePage <= 1}" onclick="{clickPage.bind(this,1)}"> <i aria-hidden="true" class="angle double left icon"></i> </a> <a class="icon item {disabled: activePage <= 1}" onclick="{clickPage.bind(this,activePage - 1)}"> <i class="angle left icon"></i> </a> <virtual each="{page in pages}"> <a class="item" onclick="{clickPage.bind(this,page.number)}" if="{!page.active && !page.disabled}"> {page.number} </a> <a class="active item" if="{page.active}">{page.number}</a> <div class="disabled icon item" if="{page.disabled}"> <i class="ellipsis horizontal icon"></i> </div> </virtual> <a class="icon item {disabled: activePage >= totalPages}" onclick="{clickPage.bind(this,activePage + 1)}"> <i class="angle right icon"></i> </a> <a class="icon item {disabled: activePage >= totalPages}" onclick="{clickPage.bind(this,totalPages )}"> <i aria-hidden="true" class="angle double right icon"></i> </a> </div>', '', '', function(opts) {
    this.activePage = 1
    this.totalPages = 1
    this.pages = []
    let lastOptsTotalPages = null
    let lastOptsActivePage = null
    let lastTotalPages = null
    let lastActivePage = null

    this.on('mount', () => {
      this.update()
    })

    this.on('update', () => {
      let needsRegenerate = false
      if (opts.activePage != lastOptsActivePage) {
        lastOptsActivePage = opts.activePage
        this.activePage = opts.activePage
        lastActivePage = this.activePage
        needsRegenerate = true
      } else if (this.activePage != lastActivePage) {
        lastActivePage = this.activePage
        needsRegenerate = true
      }
      if (opts.totalPages != lastOptsTotalPages) {
        lastOptsTotalPages = opts.totalPages
        this.totalPages = opts.totalPages
        lastTotalPages = this.totalPages
        needsRegenerate = true
      } else if (this.totalPages != lastTotalPages) {
        lastTotalPages = this.totalPages
        opts.totalPages = this.totalPages
        lastOptsTotalPages = opts.totalPages
        needsRegenerate = true
      }

      if (needsRegenerate) {
        generatePagination()
      }
    })

    this.clickPage = (pageNum, e) => {
      e.preventDefault()
      if (pageNum < 1 || pageNum > this.totalPages) {
        return
      }
      this.activePage = pageNum
      this.update()
      this.trigger('change', pageNum)
    }

    const generatePagination = () => {
      this.pages = []
      const activePage = parseInt(this.activePage || 1)
      const totalPages = parseInt(this.totalPages || 1)
      const pageSize = calcPageSize()
      const index = calcIndex(pageSize)

      if (pageSize < 1) {
        this.update()
        return
      }

      for (let i = 0; i < pageSize; i++) {
        this.pages.push({
          number: i + index,
          active: i + index == activePage,
        })
      }
      this.pages[0].number = 1
      this.pages[pageSize - 1].number = totalPages
      if (pageSize > 1) {
        this.pages[1].disabled = index != 1
      }
      if (pageSize > 2) {
        this.pages[pageSize - 2].disabled = index != totalPages - pageSize + 1
      }

      this.update()
    }

    const calcPageSize = () => {
      const pageSize = parseInt(opts.pageSize || 7)
      return pageSize < this.totalPages ? pageSize : this.totalPages
    }

    const calcIndex = pageSize => {
      const activePage = parseInt(this.activePage || 1)
      const totalPages = parseInt(this.totalPages || 1)
      const prevPageSize = (pageSize - pageSize % 2) / 2
      if (activePage + prevPageSize > totalPages) {
        return totalPages - pageSize + 1
      }
      if (activePage > prevPageSize) {
        return activePage - prevPageSize
      }
      return 1
    }
});
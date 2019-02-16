<su-pagination>
  <div class="ui pagination menu { opts.class }">
    <a class="icon item { disabled: activePage <= 1 }" onclick="{ clickPage.bind(this,1) }">
      <i aria-hidden='true' class='angle double left icon' />
    </a>
    <a class="icon item { disabled: activePage <= 1 }" onclick="{ clickPage.bind(this,activePage - 1) }">
      <i class='angle left icon' />
    </a>

    <virtual each="{ page in pages }">
      <a class="item" onclick="{ clickPage.bind(this,page.number) }" if="{ !page.active && !page.disabled }">
        { page.number }
      </a>
      <a class="active item" if="{ page.active }">{ page.number }</a>
      <div class="disabled icon item" if="{ page.disabled }">
        <i class='ellipsis horizontal icon' />
      </div>
    </virtual>

    <a class="icon item { disabled: activePage >= totalPages }" onclick="{ clickPage.bind(this,activePage + 1) }">
      <i class='angle right icon' />
    </a>
    <a class="icon item { disabled: activePage >= totalPages }" onclick="{ clickPage.bind(this,totalPages ) }">
      <i aria-hidden='true' class='angle double right icon' />
    </a>
  </div>

  <script>
    const tag = this
    tag.activePage = 1
    tag.totalPages = 1
    tag.pages = []
    let lastOptsTotalPages = null
    let lastOptsActivePage = null
    let lastTotalPages = null
    let lastActivePage = null

    tag.on('mount', () => {
      tag.update()
    })

    tag.on('update', () => {
      let needsRegenerate = false
      if (opts.activePage != lastOptsActivePage) {
        lastOptsActivePage = opts.activePage
        tag.activePage = opts.activePage
        lastActivePage = tag.activePage
        needsRegenerate = true
      } else if (tag.activePage != lastActivePage) {
        lastActivePage = tag.activePage
        needsRegenerate = true
      }
      if (opts.totalPages != lastOptsTotalPages) {
        lastOptsTotalPages = opts.totalPages
        tag.totalPages = opts.totalPages
        lastTotalPages = tag.totalPages
        needsRegenerate = true
      } else if (tag.totalPages != lastTotalPages) {
        lastTotalPages = tag.totalPages
        opts.totalPages = tag.totalPages
        lastOptsTotalPages = opts.totalPages
        needsRegenerate = true
      }

      if (needsRegenerate) {
        generatePagination()
      }
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    tag.clickPage = (pageNum, e) => {
      e.preventDefault()
      if (pageNum < 1 || pageNum > tag.totalPages) {
        return
      }
      tag.activePage = pageNum
      tag.update()
      tag.trigger('change', pageNum)
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const generatePagination = () => {
      tag.pages = []
      const activePage = parseInt(tag.activePage || 1)
      const totalPages = parseInt(tag.totalPages || 1)
      const pageSize = calcPageSize()
      const index = calcIndex(pageSize)

      if (pageSize < 1) {
        tag.update()
        return
      }

      for (let i = 0; i < pageSize; i++) {
        tag.pages.push({
          number: i + index,
          active: i + index == activePage,
        })
      }
      tag.pages[0].number = 1
      tag.pages[pageSize - 1].number = totalPages
      if (pageSize > 1) {
        tag.pages[1].disabled = index != 1
      }
      if (pageSize > 2) {
        tag.pages[pageSize - 2].disabled = index != totalPages - pageSize + 1
      }

      tag.update()
    }

    const calcPageSize = () => {
      const pageSize = parseInt(opts.pageSize || 7)
      return pageSize < tag.totalPages ? pageSize : tag.totalPages
    }

    const calcIndex = pageSize => {
      const activePage = parseInt(tag.activePage || 1)
      const totalPages = parseInt(tag.totalPages || 1)
      const prevPageSize = (pageSize - pageSize % 2) / 2
      if (activePage + prevPageSize > totalPages) {
        return totalPages - pageSize + 1
      }
      if (activePage > prevPageSize) {
        return activePage - prevPageSize
      }
      return 1
    }
  </script>
</su-pagination>
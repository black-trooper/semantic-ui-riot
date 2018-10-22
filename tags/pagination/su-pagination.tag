<su-pagination>
  <div class="ui pagination menu { opts.class }">
    <a class="icon item { disabled: currentPageNumber <= 1 }" onclick="{ clickPage.bind(this,1) }">
      <i aria-hidden='true' class='angle double left icon' />
    </a>
    <a class="icon item { disabled: currentPageNumber <= 1 }" onclick="{ clickPage.bind(this,currentPageNumber - 1) }">
      <i class='angle left icon' />
    </a>

    <virtual each="{ page in pages }">
      <a class="item" onclick="{ clickPage.bind(this,page.number) }" if="{ !page.current && !page.disabled }">
        { page.number }
      </a>
      <a class="active item" if="{ page.current }">{ page.number }</a>
      <div class="disabled icon item" if="{ page.disabled }">
        <i class='ellipsis horizontal icon' />
      </div>
    </virtual>

    <a class="icon item { disabled: currentPageNumber >= allPageCount }" onclick="{ clickPage.bind(this,currentPageNumber + 1) }">
      <i class='angle right icon' />
    </a>
    <a class="icon item { disabled: currentPageNumber >= allPageCount }" onclick="{ clickPage.bind(this,allPageCount ) }">
      <i aria-hidden='true' class='angle double right icon' />
    </a>
  </div>

  <script>
    this.currentPageNumber = 1
    this.allPageCount = 1
    this.pages = []
    let lastOptsAllPageCount = null
    let lastOptsCurrentPageNumber = null
    let lastAllPageCount = null
    let lastCurrentPageNumber = null

    this.on('mount', () => {
      this.update()
    })

    this.on('update', () => {
      let needsRegenerate = false
      if (opts.currentPageNumber != lastOptsCurrentPageNumber) {
        lastOptsCurrentPageNumber = opts.currentPageNumber
        this.currentPageNumber = opts.currentPageNumber
        lastCurrentPageNumber = this.currentPageNumber
        needsRegenerate = true
      } else if (this.currentPageNumber != lastCurrentPageNumber) {
        lastCurrentPageNumber = this.currentPageNumber
        opts.currentPageNumber = this.currentPageNumber
        lastOptsCurrentPageNumber = this.currentPageNumber
        needsRegenerate = true
      }
      if (opts.allPageCount != lastOptsAllPageCount) {
        lastOptsAllPageCount = opts.allPageCount
        this.allPageCount = opts.allPageCount
        lastAllPageCount = this.allPageCount
        needsRegenerate = true
      } else if (this.allPageCount != lastAllPageCount) {
        lastAllPageCount = this.allPageCount
        opts.allPageCount = this.allPageCount
        lastOptsAllPageCount = opts.allPageCount
        needsRegenerate = true
      }

      if (needsRegenerate) {
        generatePagination()
      }
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.clickPage = (pageNum, e) => {
      e.preventDefault()
      if (pageNum < 1 || pageNum > this.allPageCount) {
        return
      }
      this.currentPageNumber = pageNum
      generatePagination()
      this.trigger('change', pageNum)
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const generatePagination = () => {
      this.pages = []
      const currentPageNumber = parseInt(this.currentPageNumber || 1)
      const allPageCount = parseInt(this.allPageCount || 1)
      const pageSize = calcPageSize()
      const index = calcIndex(pageSize)

      for (let i = 0; i < pageSize; i++) {
        this.pages.push({
          number: i + index,
          current: i + index == currentPageNumber,
        })
      }
      this.pages[0].number = 1
      this.pages[pageSize - 1].number = allPageCount
      this.pages[1].disabled = index != 1
      this.pages[pageSize - 2].disabled = index != allPageCount - pageSize + 1

      this.update()
    }

    const calcPageSize = () => {
      const pageSize = parseInt(opts.pageSize || 7)
      return pageSize < this.allPageCount ? pageSize : this.allPageCount
    }

    const calcIndex = pageSize => {
      const prevPageSize = (pageSize - pageSize % 2) / 2
      if (this.currentPageNumber + prevPageSize > this.allPageCount) {
        return this.allPageCount - pageSize + 1
      }
      if (this.currentPageNumber > prevPageSize) {
        return this.currentPageNumber - prevPageSize
      }
      return 1
    }
  </script>
</su-pagination>
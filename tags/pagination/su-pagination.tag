<su-pagination>
  <div class="ui pagination menu">
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

    this.on('mount', () => {
      this.currentPageNumber = parseInt(opts.currentPageNumber || 1)
      this.allPageCount = parseInt(opts.allPageCount || 1)
      generatePagination()
    })

    // ===================================================================================
    //                                                                               Event
    //                                                                               =====
    this.clickPage = (pageNum, e) => {
      e.preventDefault()
      this.trigger('click', pageNum)
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
      const pageSize = calcPageSize()
      const index = calcIndex(pageSize)

      for (let i = 0; i < pageSize; i++) {
        this.pages.push({
          number: i + index,
          current: i + index == this.currentPageNumber,
        })
      }
      this.pages[0].number = 1
      this.pages[pageSize - 1].number = this.allPageCount
      this.pages[1].disabled = index != 1
      this.pages[pageSize - 2].disabled = index != this.allPageCount - pageSize + 1

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
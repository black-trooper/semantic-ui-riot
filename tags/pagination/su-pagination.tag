<su-pagination>
  <div class="ui pagination menu">
    <a class="item" onclick="{ clickPage.bind(this,currentPageNumber - 1) }">&lt;</a>
    <a class="item" onclick="{ clickPage.bind(this,1) }" if="{ currentPageNumber > range() + 1 }">1</a>
    <div class="disabled item" if="{ currentPageNumber > range() + 2 }">...</div>
    <a class="item" onclick="{ clickPage.bind(this,pageNum) }" each="{ prevPages }">{ pageNum }</a>
    <a class="active item">{ currentPageNumber }</a>
    <a class="item" onclick="{ clickPage.bind(this,pageNum) }" each="{ nextPages }">{ pageNum }</a>
    <div class="disabled item" if="{ currentPageNumber < allPageCount - (range() + 1) }">...</div>
    <a class="item" onclick="{ clickPage.bind(this,allPageCount ) }" if="{ currentPageNumber < allPageCount - range() }">{ allPageCount }</a>
    <a class="item" onclick="{ clickPage.bind(this,currentPageNumber + 1) }">&gt;</a>
  </div>

  <script>
    this.currentPageNumber = 1
    this.allPageCount = 1
    this.prevPages = []
    this.nextPages = []

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
      this.prevPages = []
      this.nextPages = []

      // set prevPages
      let prevStart = this.currentPageNumber - this.range()
      prevStart = (prevStart <= 1) ? 1 : prevStart
      for (let i = prevStart; i < this.currentPageNumber; i++) {
        this.prevPages.push({ pageNum: i })
      }

      // set nextPages
      let nextEnd = this.currentPageNumber + this.range()
      nextEnd = (nextEnd >= this.allPageCount) ? this.allPageCount : nextEnd
      for (let i = this.currentPageNumber + 1; i <= nextEnd; i++) {
        this.nextPages.push({ pageNum: i })
      }

      this.update()
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.range = () => {
      return parseInt(opts.range || 1)
    }
  </script>
</su-pagination>
<su-progress class="{ opts.class }">
  <div class="ui { indicating : isIndicating() } progress { active: isActive() } { success: isSuccess() }" data-percent="{ percent }">
    <div class="bar" style="transition-duration: 300ms; width: { percent }%;">
      <div if="{ isProgress() }" class="progress">{ percent }%</div>
    </div>
    <div class="label">
      <yield />
    </div>
  </div>

  <script>
    this.percent = 0

    this.on('mount', () => {
      init(opts.prcent, opts.value, opts.total)
    })

    this.increment = () => {
      if (this.value < this.total) {
        this.value += 1
        setPercent()
      }
    }
    this.decrement = () => {
      if (this.value > 0) {
        this.value -= 1
        setPercent()
      }
    }

    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.isActive = () => {
      return hasClass('active') && this.percent > 0 && this.percent < 100
    }

    this.isSuccess = () => {
      return this.percent == 100
    }

    this.isProgress = () => {
      return hasClass('progress')
    }

    this.isIndicating = () => {
      return hasClass('indicating')
    }


    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    const init = (percent, value, total) => {
      if (percent) {
        this.percent = percent
      } else {
        this.total = total ? total : 3
        this.value = value ? value : 0
        setPercent()
      }
    }

    const hasClass = className => {
      return this.root.classList.contains(className)
    }

    const setPercent = () => {
      this.percent = parseInt(this.value / this.total * 100)
    }
  </script>
</su-progress>
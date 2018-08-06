<su-progress class="{ opts.class }">
  <div class="ui { indicating : isIndicating() } progress { active: isActive() }" data-percent="{ this.value }">
    <div class="bar" style="transition-duration: 300ms; width: { this.value }%;">
      <div if="{ isProgress() }" class="progress">{ this.value }%</div>
    </div>
    <div class="label">
      <yield />
    </div>
  </div>

  <script>
    this.value = 50

    this.isActive = () => {
      return hasClass('active') && this.value > 0 && this.value < 100
    }

    this.isProgress = () => {
      return hasClass('progress')
    }

    this.isIndicating = () => {
      return hasClass('indicating')
    }

    const hasClass = className => {
      return this.root.classList.contains(className)
    }


  </script>
</su-progress>
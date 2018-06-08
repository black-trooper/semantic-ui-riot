<su-tab class="ui { opts.class } { active: active } tab">
  <virtual if="{ mounted }">
    <yield />
  </virtual>

  <style>
    :scope.ui.segment {
      margin-top: 0;
      margin-bottom: 0;
    }

    :scope.ui.segment.top.attached {
      margin-top: 0
    }

    :scope.ui.segment.bottom.attached {
      margin-bottom: 0
    }
  </style>

  <script>
    this.active = false
    this.mounted = false
    this.on('mount', () => {
      this.update()
    })
    this.on('update', () => {
      if (this.active && !this.mounted) {
        this.mounted = true
      }
    })
  </script>
</su-tab>
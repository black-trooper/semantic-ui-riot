<su-tab class="ui { opts.class } { active: active } tab">
  <virtual if="{ mounted }"><yield /></virtual>

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
    const tag = this
    tag.active = false
    tag.mounted = false
    tag.on('mount', () => {
      tag.update()
    })
    tag.on('update', () => {
      if (tag.active && !tag.mounted) {
        tag.mounted = true
      }
    })
  </script>
</su-tab>
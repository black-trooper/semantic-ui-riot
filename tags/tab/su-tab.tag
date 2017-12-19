<su-tab class="ui { opts.class } { active: active } tab">
  <yield />

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
  </script>
</su-tab>
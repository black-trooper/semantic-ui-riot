<su-tab class="ui segment bottom attached { active: active() } tab">
  <yield />

  <style>
    :scope.ui.segment.bottom.attached {
      margin-bottom: 0
    }
  </style>

  <script>
    // ===================================================================================
    //                                                                              Helper
    //                                                                              ======
    this.active = () => {
      if (typeof opts.active === 'undefined' || typeof opts.index === 'undefined') {
        return false
      }
      return opts.active[opts.index]
    }
  </script>
</su-tab>
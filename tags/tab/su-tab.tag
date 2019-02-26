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
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.active = false
    tag.mounted = false

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    tag.on('mount', onMount)
    tag.on('update', onUpdate)

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
    function onMount() {
      tag.update()
    }
    function onUpdate() {
      if (tag.active && !tag.mounted) {
        tag.mounted = true
      }
    }
  </script>
</su-tab>
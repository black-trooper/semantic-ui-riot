<su-tab-title>
  <a class="{opts.class} {active: active} item" onclick="{ click }" ref="item">
    <yield />
  </a>

  <script>
    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.active = false

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    tag.click = click

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
    function click() {
      tag.parent.parent.clickForTitle(tag.refs.item.innerText)
    }
  </script>
</su-tab-title>
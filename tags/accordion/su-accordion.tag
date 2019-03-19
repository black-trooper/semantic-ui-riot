<su-accordion>
  <div class="title { active: active }" onclick="{ click }">
    <i class="dropdown icon"></i>
    { opts.title }
  </div>
  <div class="content active {open : active} {close : !active}">
    <yield />
  </div>

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
      tag.trigger('click', tag)
    }
  </script>
</su-accordion>
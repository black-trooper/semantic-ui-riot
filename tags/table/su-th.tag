<su-th onclick="{ click }"
  class="{ sorted: sorted } { ascending: sorted && !reverse } { descending: sorted && reverse }">
  <script>
    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============

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
      tag.trigger('click', opts.field)
    }
  </script>
</su-th>
<su-th onclick="{ click }"
  class="{ sorted: sorted } { ascending: sorted && !reverse } { descending: sorted && reverse }">
  <script>
    const tag = this
    tag.click = () => {
      tag.trigger('click', opts.field)
    }
  </script>
</su-th>
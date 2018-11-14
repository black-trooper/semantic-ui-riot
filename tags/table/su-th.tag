<su-th onclick="{ click }" class="{ sorted: sorted } { ascending: sorted && !reverse } { descending: sorted && reverse }">
  <script>
    this.click = () => {
      this.trigger('click', opts.field)
    }
  </script>
</su-th>
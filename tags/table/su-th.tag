<su-th onclick="{ click }" class="{ sorted: sorted } { ascending: !reverse } { descending: reverse }">
  <script>
    this.click = () => {
      this.trigger('click', opts.name)
    }
  </script>
</su-th>
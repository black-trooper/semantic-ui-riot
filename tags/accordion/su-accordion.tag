<su-accordion>
  <div class="title { active: active }" onclick="{ click }">
    <i class="dropdown icon"></i>
    { opts.title }
  </div>
  <div class="content active {open : active} {close : !active}">
    <yield />
  </div>

  <script>
    this.active = false

    this.click = () => {
      this.trigger('click', this)
    }
  </script>
</su-accordion>
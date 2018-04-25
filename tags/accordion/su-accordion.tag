<su-accordion>
  <div class="title { active: active }" click="{ click }">
    <i class="dropdown icon"></i>
    { opts.title }
  </div>
  <div class="content { active: active }">
    <yield />
  </div>

  <script>
    this.active = false

    this.click = () => {
      this.trigger('click', this)
    }
  </script>
</su-accordion>
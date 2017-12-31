<su-popup onmouseover="{ mouseover }" onmouseout="{ mouseout }">
  <div id="{ getId() }" class="ui flowing popup top left transition { transitionStatus } { tooltip: isTooltip() }"></div>
  <yield />

  <style>
    :scope {
      position: relative;
    }

    .ui.popup {
      /* width: 300px; */
      position: absolute;
    }

    .ui.popup.tooltip {
      white-space: nowrap;
    }

    .ui.popup.top {
      top: auto;
      bottom: 100%;
    }

    .ui.popup.bottom {
      top: 100%;
      bottom: auto;
    }

    .ui.popup.left {
      left: 1em;
      right: auto;
    }

    .ui.popup.right {
      left: auto;
      right: 1em;
    }
  </style>

  <script>
    this.content = ''
    this.on('mount', () => {
      if (this.isTooltip()) {
        this.content = this.isTooltip()
      }
      else if (this.tags['su-popup-content']) {
        this.content = this.tags['su-popup-content'].root.innerHTML
        this.tags['su-popup-content'].unmount()
      }
      document.getElementById(this.getId()).innerHTML = this.content
      this.update()
    })

    this.isTooltip = () => {
      return this.opts.tooltip
    }

    this.mouseover = () => {
      this.transitionStatus = 'visible'
    }
    this.mouseout = () => {
      this.transitionStatus = 'hidden'
    }

    this.getId = () => {
      return `su-checkbox-${this._riot_id}`
    }
  </script>
</su-popup>

<su-popup-content>

</su-popup-content>
<su-popup onmouseover="{ mouseover }" onmouseout="{ mouseout }">
  <div id="{ getId() }" class="ui flowing popup { opts.position } transition { transitionStatus } { tooltip: isTooltip() }"></div>
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

    .ui.popup.top.left {
      top: auto;
      bottom: 100%;
      left: 1em;
      right: auto;
      margin-left: -1rem;
    }

    .ui.popup.bottom.left {
      top: 100%;
      bottom: auto;
      left: 1em;
      right: auto;
      margin-left: -1rem;
    }

    .ui.popup.top.center {
      top: auto;
      bottom: 100%;
      left: 50%;
      right: auto;
      -webkit-transform: translateX(-50%) !important;
      transform: translateX(-50%) !important;
    }

    .ui.popup.bottom.center {
      top: 100%;
      bottom: auto;
      left: 50%;
      right: auto;
      -webkit-transform: translateX(-50%) !important;
      transform: translateX(-50%) !important;
    }

    .ui.popup.top.right {
      top: auto;
      bottom: 100%;
      left: auto;
      right: 1em;
      margin-right: -1rem;
    }

    .ui.popup.bottom.right {
      top: 100%;
      bottom: auto;
      left: auto;
      right: 1em;
      margin-right: -1rem;
    }

    .ui.popup.left.center {
      left: auto;
      right: 100%;
      top: 50%;
      -webkit-transform: translateY(-50%) !important;
      transform: translateY(-50%) !important;
    }

    .ui.popup.right.center {
      left: 100%;
      right: auto;
      top: 50%;
      -webkit-transform: translateY(-50%) !important;
      transform: translateY(-50%) !important;
    }
  </style>

  <script>
    this.content = ''
    this.on('mount', () => {
      if (!this.opts.position) {
        this.opts.position = 'top left'
      }
      if (this.isTooltip()) {
        if (opts.dataTitle) {
          this.content = `<div class="header">${opts.dataTitle}</div><div class="content">${this.isTooltip()}</div>`
        } else {
          this.content = this.isTooltip()
        }
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
      return `su-popup-${this._riot_id}`
    }
  </script>
</su-popup>

<su-popup-content>
</su-popup-content>
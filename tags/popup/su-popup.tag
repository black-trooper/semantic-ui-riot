<su-popup onmouseover="{ mouseover }" onmouseout="{ mouseout }">
  <div id="{ getId() }"
    class="ui popup { position } { dataVariation } transition { transitionStatus } { nowrap: isNowrap() }">
  </div>
  <yield />

  <style>
    :scope {
      position: relative;
    }

    .ui.popup {
      position: absolute;
    }

    .ui.popup.nowrap {
      white-space: nowrap;
    }

    .ui.popup.wide {
      width: 350px;
    }

    .ui.popup.very.wide {
      width: 550px;
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
    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.content = ''
    tag.dataVariation = opts.dataVariation || ''

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    tag.getId = getId
    tag.isNowrap = isNowrap
    tag.mouseover = mouseover
    tag.mouseout = mouseout
    tag.on('mount', onMount)
    tag.on('update', onUpdate)

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
    function onMount() {
      if (opts.tooltip) {
        if (opts.dataTitle) {
          tag.content = `<div class="header">${opts.dataTitle}</div><div class="content">${opts.tooltip}</div>`
        } else {
          tag.content = opts.tooltip
        }
      }
      else if (tag.tags['su-popup-content']) {
        tag.content = tag.tags['su-popup-content'].root.innerHTML
        tag.tags['su-popup-content'].unmount()
      }
      document.getElementById(tag.getId()).innerHTML = tag.content
      tag.update()
    }

    function onUpdate() {
      tag.position = opts.position || 'top left'
    }

    function mouseover() {
      tag.transitionStatus = 'visible'
      tag.trigger('mouseover')
    }

    function mouseout() {
      tag.transitionStatus = 'hidden'
      tag.trigger('mouseout')
    }

    function isNowrap() {
      if (tag.dataVariation.indexOf('wide') >= 0) {
        return false
      }
      return true
    }

    function getId() {
      return `su-popup-${tag._riot_id}`
    }
  </script>
</su-popup>

<su-popup-content>
</su-popup-content>
<su-popup onmouseover="{ mouseover }" onmouseout="{ mouseout }">
  <div id="{ getId() }" onmouseover="{ stopPropagation }" onmouseout="{ stopPropagation }"
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

    .ui.popup.top.center.scale.transition.in,
    .ui.popup.bottom.center.scale.transition.in {
      animation-name: xScaleIn
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

    .ui.popup.left.center.scale.transition.in,
    .ui.popup.right.center.scale.transition.in {
      animation-name: yScaleIn
    }

    @-webkit-keyframes xScaleIn {
      0% {
        opacity: 0;
        -webkit-transform: scale(0.8) translateX(-50%);
        transform: scale(0.8) translateX(-50%);
      }

      100% {
        opacity: 1;
        -webkit-transform: scale(1) translateX(-50%);
        transform: scale(1) translateX(-50%);
      }
    }

    @keyframes xScaleIn {
      0% {
        opacity: 0;
        -webkit-transform: scale(0.8) translateX(-50%);
        transform: scale(0.8) translateX(-50%);
      }

      100% {
        opacity: 1;
        -webkit-transform: scale(1) translateX(-50%);
        transform: scale(1) translateX(-50%);
      }
    }

    @-webkit-keyframes yScaleIn {
      0% {
        opacity: 0;
        -webkit-transform: scale(0.8) translateY(-50%);
        transform: scale(0.8) translateY(-50%);
      }

      100% {
        opacity: 1;
        -webkit-transform: scale(1) translateY(-50%);
        transform: scale(1) translateY(-50%);
      }
    }

    @keyframes yScaleIn {
      0% {
        opacity: 0;
        -webkit-transform: scale(0.8) translateY(-50%);
        transform: scale(0.8) translateY(-50%);
      }

      100% {
        opacity: 1;
        -webkit-transform: scale(1) translateY(-50%);
        transform: scale(1) translateY(-50%);
      }
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
    tag.stopPropagation = stopPropagation

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
      tag.transitionStatus = 'scale in visible'
      tag.trigger('mouseover')
    }

    function mouseout() {
      tag.transitionStatus = 'hidden'
      tag.trigger('mouseout')
    }

    function stopPropagation(event) {
      event.stopPropagation()
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
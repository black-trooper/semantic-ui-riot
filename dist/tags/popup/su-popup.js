riot.tag2('su-popup', '<div id="{getId()}" class="ui popup {opts.position} {opts.dataVariation} transition {transitionStatus} {nowrap: isNowrap()}"> </div> <yield></yield>', 'su-popup,[data-is="su-popup"]{ position: relative; } su-popup .ui.popup,[data-is="su-popup"] .ui.popup{ position: absolute; } su-popup .ui.popup.nowrap,[data-is="su-popup"] .ui.popup.nowrap{ white-space: nowrap; } su-popup .ui.popup.wide,[data-is="su-popup"] .ui.popup.wide{ width: 350px; } su-popup .ui.popup.very.wide,[data-is="su-popup"] .ui.popup.very.wide{ width: 550px; } su-popup .ui.popup.top.left,[data-is="su-popup"] .ui.popup.top.left{ top: auto; bottom: 100%; left: 1em; right: auto; margin-left: -1rem; } su-popup .ui.popup.bottom.left,[data-is="su-popup"] .ui.popup.bottom.left{ top: 100%; bottom: auto; left: 1em; right: auto; margin-left: -1rem; } su-popup .ui.popup.top.center,[data-is="su-popup"] .ui.popup.top.center{ top: auto; bottom: 100%; left: 50%; right: auto; -webkit-transform: translateX(-50%) !important; transform: translateX(-50%) !important; } su-popup .ui.popup.bottom.center,[data-is="su-popup"] .ui.popup.bottom.center{ top: 100%; bottom: auto; left: 50%; right: auto; -webkit-transform: translateX(-50%) !important; transform: translateX(-50%) !important; } su-popup .ui.popup.top.right,[data-is="su-popup"] .ui.popup.top.right{ top: auto; bottom: 100%; left: auto; right: 1em; margin-right: -1rem; } su-popup .ui.popup.bottom.right,[data-is="su-popup"] .ui.popup.bottom.right{ top: 100%; bottom: auto; left: auto; right: 1em; margin-right: -1rem; } su-popup .ui.popup.left.center,[data-is="su-popup"] .ui.popup.left.center{ left: auto; right: 100%; top: 50%; -webkit-transform: translateY(-50%) !important; transform: translateY(-50%) !important; } su-popup .ui.popup.right.center,[data-is="su-popup"] .ui.popup.right.center{ left: 100%; right: auto; top: 50%; -webkit-transform: translateY(-50%) !important; transform: translateY(-50%) !important; }', 'onmouseover="{mouseover}" onmouseout="{mouseout}"', function(opts) {
    const tag = this
    tag.content = ''
    tag.on('mount', () => {
      if (!opts.position) {
        opts.position = 'top left'
      }
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
    })

    tag.mouseover = () => {
      tag.transitionStatus = 'visible'
      tag.trigger('mouseover')
    }

    tag.mouseout = () => {
      tag.transitionStatus = 'hidden'
      tag.trigger('mouseout')
    }

    tag.isNowrap = () => {
      if (opts.dataVariation && opts.dataVariation.indexOf('wide') >= 0) {
        return false
      }
      return true
    }

    tag.getId = () => {
      return `su-popup-${tag._riot_id}`
    }
});

riot.tag2('su-popup-content', '', '', '', function(opts) {
});
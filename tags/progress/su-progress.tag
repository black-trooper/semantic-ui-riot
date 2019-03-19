<su-progress class="{ opts.class }">
  <div class="ui progress { getClass() } { getStates() }" data-percent="{ percent }">
    <div class="bar" style="transition-duration: 300ms; width: { percent }%;">
      <div if="{ isProgress() }" class="progress">{ percent }%</div>
    </div>
    <div class="label">
      <yield />
    </div>
  </div>

  <style>
    .ui.progress:last-child {
      margin: 0 0 2.5em;
    }

    :scope.attached {
      display: block;
      height: 0.2rem;
      padding: 0px;
      overflow: hidden;
      border-radius: 0em 0em 0.28571429rem 0.28571429rem;
      position: absolute;
      left: 0;
      width: 100%;
    }

    :scope.top.attached {
      top: 0px;
      bottom: 100%;
      border-radius: 0.28571429rem 0.28571429rem 0em 0em;
    }

    :scope.bottom.attached {
      top: 100%;
      bottom: auto;
    }
  </style>

  <script>
    const tag = this
    // ===================================================================================
    //                                                                      Tag Properties
    //                                                                      ==============
    tag.defaultValue = null
    tag.value = null

    // ===================================================================================
    //                                                                         Tag Methods
    //                                                                         ===========
    tag.getClass = getClass
    tag.getStates = getStates
    tag.isProgress = isProgress
    tag.on('mount', onMount)
    tag.on('update', onUpdate)

    // ===================================================================================
    //                                                                          Properties
    //                                                                          ==========
    let lastOptsValue = null
    let lastValue = null
    let total = 100

    // ===================================================================================
    //                                                                             Methods
    //                                                                             =======
    function onMount() {
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      init(opts.riotValue, opts.total)

      tag.update()
      tag.defaultValue = tag.value
    }

    function onUpdate() {
      let changed = false
      if (tag.value >= total) {
        tag.value = total
      }
      if (tag.value <= 0) {
        tag.value = 0
      }
      if (lastValue != tag.value) {
        lastValue = tag.value
        changed = true
      } else if (lastOptsValue != opts.riotValue) {
        tag.value = opts.riotValue
        lastOptsValue = opts.riotValue
        lastValue = opts.riotValue
        changed = true
      }

      if (changed) {
        tag.percent = getPercent()
      }
    }

    function getClass() {
      const excludeClasses = ['progress', 'active']
      return Array.apply(null, tag.root.classList).filter(clazz => {
        return !excludeClasses.some(excludeClass => excludeClass == clazz)
      }).join(' ')
    }

    function getStates() {
      if (isSuccess()) {
        return 'success'
      }
      if (isActive()) {
        return 'active'
      }
    }

    function isProgress() {
      return hasClass('progress')
    }

    function init(optsValue, optsTotal) {
      if (tag.value == null) {
        tag.value = optsValue || 0
      }
      if (optsTotal > 0) {
        total = optsTotal
      }
      tag.percent = getPercent()
      lastValue = tag.value
      lastOptsValue = optsValue
    }

    function getPercent() {
      return parseInt(tag.value / total * 100)
    }

    function isActive() {
      return hasClass('active') && tag.percent > 0 && tag.percent < 100
    }

    function isSuccess() {
      return tag.percent == 100
    }

    function hasClass(className) {
      return tag.root.classList.contains(className)
    }
  </script>
</su-progress>
describe('su-dropdown', function () {
  let tag, select
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnSelect = sinon.spy()

  let items = [
    {
      label: 'Gender',
      value: null,
      default: true
    },
    {
      label: 'Male',
      value: 1
    },
    {
      label: 'Female',
      value: 2
    },
  ]

  let keys = {
    enter: 13,
    upArrow: 38,
    downArrow: 40
  }

  let fireKeyEvent = function (el, name, keyCode) {
    let eventObj = document.createEvent("Events")
    eventObj.initEvent(name, true, true);
    eventObj.keyCode = keyCode;
    el.dispatchEvent(eventObj)
  }

  beforeEach(function () {
    $('body').append('<su-dropdown></su-dropdown>')
    tag = riot.mount('su-dropdown', {
      items
    })[0]
    tag.on('open', spyOnOpen)
      .on('close', spyOnClose)
      .on('select', spyOnSelect)
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnOpen.reset()
    spyOnClose.reset()
    spyOnSelect.reset()
    this.clock.restore()
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('has no items visible on load', function () {
    $('su-dropdown .menu .item').length.should.equal(0)
  })

  it('clicking dropdown opens/closes dropdown and triggers open/close event', function () {
    $('su-dropdown .menu').is(':visible').should.equal(false)
    $('su-dropdown').click()
    $('su-dropdown .menu').is(':visible').should.equal(true)
    spyOnOpen.should.have.been.calledOnce
    $('su-dropdown').click()
    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(false)
    spyOnClose.should.have.been.calledOnce
  })

  it('focusing/blurring dropdown opens/closes dropdown and triggers open/close event', function () {
    $('su-dropdown .menu').is(':visible').should.equal(false)

    $('su-dropdown').focus()
    $('su-dropdown .menu').is(':visible').should.equal(true)
    spyOnOpen.should.have.been.calledOnce

    $('su-dropdown').blur()
    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(false)
    spyOnClose.should.have.been.calledOnce
  })

  it('clicking default item', function () {
    $('su-dropdown').click()

    $('su-dropdown .item:first-child').click()
    spyOnSelect.should.have.been.calledOnce
    $('su-dropdown > .text').text().trim().should.equal(items[0].label)
    $('su-dropdown > .text').hasClass('default').should.equal(true)
    this.clock.tick(310)

    $('su-dropdown .menu').is(':visible').should.equal(false)
    spyOnClose.should.have.been.calledOnce
  })

  it('clicking item', function () {
    $('su-dropdown').click()

    $('su-dropdown .item:eq(1)').click()
    spyOnSelect.should.have.been.calledOnce
    $('su-dropdown > .text').text().trim().should.equal(items[1].label)
    $('su-dropdown > .text').hasClass('default').should.equal(false)
    this.clock.tick(310)

    $('su-dropdown .menu').is(':visible').should.equal(false)
    spyOnClose.should.have.been.calledOnce
  })

  it('pressing enter key on item', function () {
    $('su-dropdown').focus()

    let dropdown = $('su-dropdown')[0]
    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    fireKeyEvent(dropdown, 'keyup', keys.enter)

    spyOnSelect.should.have.been.calledOnce
    $('su-dropdown > .text').text().trim().should.equal(items[1].label)
    $('su-dropdown > .text').hasClass('default').should.equal(false)
    this.clock.tick(310)

    $('su-dropdown .menu').is(':visible').should.equal(false)
    spyOnClose.should.have.been.calledOnce
  })

  it('pressing key down will active item', function () {
    $('su-dropdown').focus()

    let dropdown = $('su-dropdown')[0]
    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    $('su-dropdown .active .text').text().should.equal(items[0].label)

    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    $('su-dropdown .active .text').text().should.equal(items[1].label)

    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    $('su-dropdown .active .text').text().should.equal(items[2].label)

    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    $('su-dropdown .active .text').text().should.equal(items[2].label)

    fireKeyEvent(dropdown, 'keydown', keys.upArrow)
    $('su-dropdown .active .text').text().should.equal(items[1].label)

    fireKeyEvent(dropdown, 'keydown', keys.upArrow)
    $('su-dropdown .active .text').text().should.equal(items[0].label)

    fireKeyEvent(dropdown, 'keydown', keys.upArrow)
    $('su-dropdown .active .text').text().should.equal(items[0].label)

    $('su-dropdown').blur()
  })

})

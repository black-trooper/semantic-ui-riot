describe('su-dropdown-multiple', function () {
  let tag, select
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnSelect = sinon.spy()

  let items = [
    {
      label: 'Skills',
      value: null,
      default: true
    },
    { value: 'angular', label: 'Angular' },
    { value: 'css', label: 'CSS' },
    { value: 'design', label: 'Graphic Design' },
    { value: 'ember', label: 'Ember' },
    { value: 'html', label: 'HTML' },
    { value: 'ia', label: 'Information Architecture' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'mech', label: 'Mechanical Engineering' },
    { value: 'meteor', label: 'Meteor' },
    { value: 'node', label: 'NodeJS' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'python', label: 'Python' },
    { value: 'rails', label: 'Rails' },
    { value: 'react', label: 'React' },
    { value: 'repair', label: 'Kitchen Repair' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'ui', label: 'UI Design' },
    { value: 'ux', label: 'User Experience' }
  ]

  let keys = {
    enter: 13,
    escape: 27,
    upArrow: 38,
    downArrow: 40
  }

  let fireEvent = function (el, name) {
    var e = document.createEvent('HTMLEvents')
    e.initEvent(name, false, true)
    el.dispatchEvent(e)
  }

  let fireKeyEvent = function (el, name, keyCode) {
    let eventObj = document.createEvent("Events")
    eventObj.initEvent(name, true, true);
    eventObj.keyCode = keyCode;
    el.dispatchEvent(eventObj)
  }

  beforeEach(function () {
    $('body').append('<su-dropdown multiple="true"></su-dropdown>')
    tag = riot.mount('su-dropdown', {
      items
    })[0]
    tag.on('open', spyOnOpen)
      .on('close', spyOnClose)
      .on('search', spyOnSelect)
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

  it('clicking item', function () {
    $('su-dropdown').click()
    this.clock.tick(310)

    $('su-dropdown .item:eq(0)').click()
    $('su-dropdown > .label').text().trim().should.equal(items[1].label)
    spyOnSelect.should.have.been.calledOnce

    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(true)
    spyOnClose.should.have.been.callCount(0)

    $('su-dropdown').blur()
  })

  it('clicking last item', function () {
    $('su-dropdown').click()
    this.clock.tick(310)

    $('su-dropdown .item:eq(0)').click()
    $('su-dropdown > .label').text().trim().should.equal(items[1].label)
    spyOnSelect.should.have.been.calledOnce

    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(true)
    spyOnClose.should.have.been.callCount(0)

    $('su-dropdown').blur()
  })

  it('pressing enter key on item', function () {
    $('su-dropdown').focus()
    this.clock.tick(310)

    let dropdown = $('su-dropdown')[0]
    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    fireKeyEvent(dropdown, 'keyup', keys.enter)

    $('su-dropdown > .label').text().trim().should.equal(items[1].label)
    $('su-dropdown .active .text').text().should.equal(items[2].label)
    spyOnSelect.should.have.been.calledOnce

    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(true)
    spyOnClose.should.have.been.callCount(0)

    $('su-dropdown').blur()
  })

  it('pressing enter key on last item', function () {
    $('su-dropdown').focus()
    this.clock.tick(310)

    let length = items.length
    let dropdown = $('su-dropdown')[0]
    for (let i = 0; i < length; i++) {
      fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    }
    fireKeyEvent(dropdown, 'keyup', keys.enter)

    $('su-dropdown > .label').text().trim().should.equal(items[length - 1].label)
    $('su-dropdown .active .text').text().should.equal(items[length - 2].label)
    spyOnSelect.should.have.been.calledOnce

    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(true)
    spyOnClose.should.have.been.callCount(0)

    $('su-dropdown').blur()
  })
})

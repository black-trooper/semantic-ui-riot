const fireEvent = require('../../helpers').fireEvent
const fireKeyEvent = require('../../helpers').fireKeyEvent
const keys = require('../../helpers').keys

describe('su-dropdown', function () {
  let tag
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnSelect = sinon.spy()
  let spyOnChange = sinon.spy()

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

  beforeEach(function () {
    $('body').append('<su-dropdown></su-dropdown>')
    tag = riot.mount('su-dropdown', {
      items
    })[0]
    tag.on('open', spyOnOpen)
      .on('close', spyOnClose)
      .on('select', spyOnSelect)
      .on('change', spyOnChange)
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnOpen.reset()
    spyOnClose.reset()
    spyOnSelect.reset()
    spyOnChange.reset()
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
    this.clock.tick(310)
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
    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(true)
    spyOnOpen.should.have.been.calledOnce

    $('su-dropdown').blur()
    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(false)
    spyOnClose.should.have.been.calledOnce
  })

  it('clicking default item', function () {
    $('su-dropdown').click()
    this.clock.tick(310)

    $('su-dropdown .item:first-child').click()
    $('su-dropdown > .text').text().trim().should.equal(items[0].label)
    $('su-dropdown > .text').hasClass('default').should.equal(true)
    spyOnSelect.should.have.been.calledOnce
    spyOnChange.should.have.been.callCount(0)

    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(false)
    spyOnClose.should.have.been.calledOnce

    expect(tag.value).to.be.null
  })

  it('clicking item', function () {
    $('su-dropdown').click()
    this.clock.tick(310)

    fireEvent($('su-dropdown .item:eq(1)')[0], 'mousedown')
    fireEvent($('su-dropdown')[0], 'blur')
    fireEvent($('su-dropdown .item:eq(1)')[0], 'mouseup')
    $('su-dropdown .item:eq(1)').click()
    $('su-dropdown > .text').text().trim().should.equal(items[1].label)
    $('su-dropdown > .text').hasClass('default').should.equal(false)
    spyOnSelect.should.have.been.calledOnce
    spyOnChange.should.have.been.calledOnce

    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(false)
    spyOnClose.should.have.been.calledOnce

    tag.value.should.deep.equal(items[1].value)
  })

  it('pressing enter key on item', function () {
    $('su-dropdown').focus()
    this.clock.tick(310)

    let dropdown = $('su-dropdown')[0]
    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    fireKeyEvent(dropdown, 'keyup', keys.downArrow)
    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    fireKeyEvent(dropdown, 'keyup', keys.downArrow)
    fireKeyEvent(dropdown, 'keyup', keys.enter)

    $('su-dropdown > .text').text().trim().should.equal(items[1].label)
    $('su-dropdown > .text').hasClass('default').should.equal(false)
    spyOnSelect.should.have.been.calledOnce
    spyOnChange.should.have.been.calledOnce

    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(false)
    spyOnClose.should.have.been.calledOnce

    tag.value.should.deep.equal(items[1].value)
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

  it('pressing escape key', function () {
    $('su-dropdown').focus()
    this.clock.tick(310)

    let dropdown = $('su-dropdown')[0]
    fireKeyEvent(dropdown, 'keydown', keys.escape)
    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(false)
    spyOnClose.should.have.been.calledOnce
  })

  it('update value', function () {
    expect(tag.value).to.be.null
    tag.value = items[1].value
    tag.update()
    tag.value.should.deep.equal(items[1].value)
    tag.label.should.deep.equal(items[1].label)
  })

  it('update item value', function () {
    $('su-dropdown .item:eq(1)').click()
    items[1].value = 'M'
    tag.update()
    expect(tag.value).to.be.null
  })

  it('update items', function () {
    $('su-dropdown .menu .item').length.should.equal(3)

    tag.opts.items = [
      {
        label: 'Alphabet',
        value: null,
        default: true
      },
      {
        label: 'A to C',
        header: true
      },
      {
        label: 'a',
        value: 'a'
      },
      {
        label: 'b',
        value: 'b'
      },
      {
        label: 'c',
        value: 'c'
      },
    ]
    $('su-dropdown').focus()
    this.clock.tick(310)

    $('su-dropdown .menu .item').length.should.equal(4)
    $('su-dropdown .header').click()
    spyOnSelect.should.have.been.callCount(0)
    spyOnChange.should.have.been.callCount(0)
  })
})

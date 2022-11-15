const fireEvent = require('../../helpers').fireEvent
const fireKeyEvent = require('../../helpers').fireKeyEvent
const keys = require('../../helpers').keys
require('../../../dist/tags/dropdown/su-dropdown.js')

describe('su-dropdown', function () {
  let tag
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnSelect = sinon.spy()
  let spyOnChange = sinon.spy()
  let spyOnBlur = sinon.spy()

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
      .on('blur', spyOnBlur)
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnOpen.resetHistory()
    spyOnClose.resetHistory()
    spyOnSelect.resetHistory()
    spyOnChange.resetHistory()
    spyOnBlur.resetHistory()
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
    $('su-dropdown .menu').css('visibility').should.equal('hidden')

    $('su-dropdown').click()
    this.clock.tick(310)
    $('su-dropdown .menu').css('visibility').should.equal('visible')
    spyOnOpen.should.have.been.calledOnce

    $('su-dropdown').click()
    this.clock.tick(310)
    $('su-dropdown .menu').css('visibility').should.equal('hidden')
    spyOnClose.should.have.been.calledOnce
  })

  it('focusing/blurring dropdown opens/closes dropdown and triggers open/close event', function () {
    $('su-dropdown .menu').css('visibility').should.equal('hidden')

    $('su-dropdown').focus()
    this.clock.tick(310)
    $('su-dropdown .menu').css('visibility').should.equal('visible')
    spyOnOpen.should.have.been.calledOnce

    $('su-dropdown').blur()
    this.clock.tick(310)
    $('su-dropdown .menu').css('visibility').should.equal('hidden')
    spyOnClose.should.have.been.calledOnce
    spyOnBlur.should.have.been.calledOnce
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
    $('su-dropdown .menu').css('visibility').should.equal('hidden')
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
    $('su-dropdown .menu').css('visibility').should.equal('hidden')
    spyOnClose.should.have.been.calledOnce

    tag.value.should.deep.equal(items[1].value)
  })

  it('clicking disabled item', function () {
    const newItems = [
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
        value: 'b',
        disabled: true
      },
      {
        label: 'c',
        value: 'c'
      },
    ]
    tag.opts.items = newItems
    $('su-dropdown').click()
    this.clock.tick(310)

    fireEvent($('su-dropdown .item:eq(2)')[0], 'mousedown')
    fireEvent($('su-dropdown')[0], 'blur')
    fireEvent($('su-dropdown .item:eq(2)')[0], 'mouseup')
    $('su-dropdown .item:eq(2)').click()
    $('su-dropdown > .text').text().trim().should.equal(newItems[0].label)
    $('su-dropdown > .text').hasClass('default').should.equal(true)
    spyOnSelect.should.have.been.callCount(0)
    spyOnChange.should.have.been.callCount(0)

    this.clock.tick(310)
    $('su-dropdown .menu').css('visibility').should.equal('visible')
    spyOnClose.should.have.been.callCount(0)

    expect(tag.value).to.be.null
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
    $('su-dropdown .menu').css('visibility').should.equal('hidden')
    spyOnClose.should.have.been.calledOnce

    tag.value.should.deep.equal(items[1].value)
  })

  it('pressing key down will active item', function () {
    const newItems = [
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
        value: 'b',
        disabled: true
      },
      {
        label: 'c',
        value: 'c'
      },
    ]
    tag.opts.items = newItems
    $('su-dropdown').focus()
    this.clock.tick(310)

    $('su-dropdown .menu .item').length.should.equal(4)

    let dropdown = $('su-dropdown')[0]
    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    $('su-dropdown .hover .text').text().should.equal(newItems[0].label)

    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    $('su-dropdown .hover .text').text().should.equal(newItems[2].label)

    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    $('su-dropdown .hover .text').text().should.equal(newItems[4].label)

    fireKeyEvent(dropdown, 'keydown', keys.downArrow)
    $('su-dropdown .hover .text').text().should.equal(newItems[4].label)

    fireKeyEvent(dropdown, 'keydown', keys.upArrow)
    $('su-dropdown .hover .text').text().should.equal(newItems[2].label)

    fireKeyEvent(dropdown, 'keydown', keys.upArrow)
    $('su-dropdown .hover .text').text().should.equal(newItems[0].label)

    fireKeyEvent(dropdown, 'keydown', keys.upArrow)
    $('su-dropdown .hover .text').text().should.equal(newItems[0].label)

    $('su-dropdown').blur()
  })

  it('pressing escape key', function () {
    $('su-dropdown').focus()
    this.clock.tick(310)

    let dropdown = $('su-dropdown')[0]
    fireKeyEvent(dropdown, 'keydown', keys.escape)
    this.clock.tick(310)
    $('su-dropdown .menu').css('visibility').should.equal('hidden')
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

  it('reset value', function () {
    expect(tag.value).to.be.null
    expect(tag.defaultValue).to.be.null
    tag.changed().should.deep.equal(false)
    $('su-dropdown').click()
    this.clock.tick(310)

    $('su-dropdown .item:eq(1)').click()

    tag.value.should.deep.equal(items[1].value)
    tag.changed().should.deep.equal(true)
    expect(tag.defaultValue).to.be.null

    tag.reset()
    expect(tag.value).to.be.null
    expect(tag.defaultValue).to.be.null
    tag.changed().should.deep.equal(false)
  })
})

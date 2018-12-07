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

  const mount = opts => {
    opts.items = items
    tag = riot.mount('su-dropdown', opts)[0]
    tag.on('open', spyOnOpen)
      .on('close', spyOnClose)
      .on('select', spyOnSelect)
      .on('change', spyOnChange)
      .on('blur', spyOnBlur)
  }

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
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnOpen.reset()
    spyOnClose.reset()
    spyOnSelect.reset()
    spyOnChange.reset()
    spyOnBlur.reset()
    this.clock.restore()
    tag.unmount()
  })

  it('upward', function () {
    mount({
      direction: 'upward'
    })

    $('su-dropdown .menu').is(':visible').should.equal(false)
    $('su-dropdown').hasClass('upward').should.equal(false)

    $('su-dropdown').click()
    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(true)
    $('su-dropdown').hasClass('upward').should.equal(true)
    spyOnOpen.should.have.been.calledOnce

    $('su-dropdown').click()
    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(false)
    $('su-dropdown').hasClass('upward').should.equal(true)
    spyOnClose.should.have.been.calledOnce
  })

  it('upward', function () {
    mount({
      direction: 'downward'
    })

    $('su-dropdown .menu').is(':visible').should.equal(false)
    $('su-dropdown').hasClass('upward').should.equal(false)

    $('su-dropdown').click()
    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(true)
    $('su-dropdown').hasClass('upward').should.equal(false)
    spyOnOpen.should.have.been.calledOnce

    $('su-dropdown').click()
    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(false)
    $('su-dropdown').hasClass('upward').should.equal(false)
    spyOnClose.should.have.been.calledOnce
  })
})

const fireKeyEvent = require('../../helpers').fireKeyEvent
const keys = require('../../helpers').keys
require('../../../dist/tags/dropdown/su-dropdown.js')

describe('su-dropdown-multiple', function () {
  let tag
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnSelect = sinon.spy()
  let spyOnChange = sinon.spy()
  let spyOnBlur = sinon.spy()

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

  beforeEach(function () {
    $('body').append('<su-dropdown multiple="true"></su-dropdown>')
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

  it('clicking item', function () {
    $('su-dropdown').click()
    this.clock.tick(310)

    $('su-dropdown .item:eq(0)').click()
    $('su-dropdown > .label').text().trim().should.equal(items[1].label)
    spyOnSelect.should.have.been.calledOnce
    spyOnChange.should.have.been.calledOnce

    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(true)
    spyOnClose.should.have.been.callCount(0)

    $('su-dropdown').blur()
  })

  it('clicking two items', function () {
    $('su-dropdown').click()
    this.clock.tick(310)

    $('su-dropdown .item:first').click()
    $('su-dropdown .item:first').click()
    $('su-dropdown > .label:first').text().trim().should.equal(items[1].label)
    $('su-dropdown > .label:eq(1)').text().trim().should.equal(items[2].label)
    tag.value.should.deep.equal(['angular', 'css'])
    spyOnSelect.should.have.been.calledTwice
    spyOnChange.should.have.been.calledTwice

    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(true)
    spyOnClose.should.have.been.callCount(0)

    $('su-dropdown').blur()
  })

  it('unselect item', function () {
    $('su-dropdown').click()
    this.clock.tick(310)

    $('su-dropdown .item:first').click()
    $('su-dropdown .item:first').click()
    $('su-dropdown > .label:first .delete').click()
    $('su-dropdown > .label:first').text().trim().should.equal(items[2].label)
    tag.value.should.deep.equal(['css'])
    spyOnSelect.should.have.been.calledThrice
    spyOnChange.should.have.been.calledThrice

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
    $('su-dropdown .hover .text').text().should.equal(items[2].label)
    spyOnSelect.should.have.been.calledOnce
    spyOnChange.should.have.been.calledOnce

    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(true)
    spyOnClose.should.have.been.callCount(0)

    $('su-dropdown').blur()
    spyOnBlur.should.have.been.calledOnce
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
    $('su-dropdown .hover .text').text().should.equal(items[length - 2].label)
    spyOnSelect.should.have.been.calledOnce
    spyOnChange.should.have.been.calledOnce

    this.clock.tick(310)
    $('su-dropdown .menu').is(':visible').should.equal(true)
    spyOnClose.should.have.been.callCount(0)

    $('su-dropdown').blur()
    spyOnBlur.should.have.been.calledOnce
  })

  it('reset value', function () {
    expect(tag.value).to.be.null
    expect(tag.defaultValue).to.be.null
    tag.changed().should.deep.equal(false)
    $('su-dropdown').click()
    this.clock.tick(310)

    $('su-dropdown .item:first').click()
    $('su-dropdown .item:first').click()

    tag.value.should.deep.equal(['angular', 'css'])
    expect(tag.defaultValue).to.be.null
    tag.changed().should.deep.equal(true)

    tag.reset()
    expect(tag.value).to.be.null
    expect(tag.defaultValue).to.be.null
    tag.changed().should.deep.equal(false)

    $('su-dropdown').blur()
  })
})

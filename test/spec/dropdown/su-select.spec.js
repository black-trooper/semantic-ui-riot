const fireEvent = require('../../helpers').fireEvent
const fireKeyEvent = require('../../helpers').fireKeyEvent
const keys = require('../../helpers').keys

describe('su-select', function () {
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
    $('body').append('<su-select></su-select>')
    tag = riot.mount('su-select', {
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
    spyOnOpen.reset()
    spyOnClose.reset()
    spyOnSelect.reset()
    spyOnChange.reset()
    spyOnBlur.reset()
    this.clock.restore()
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('clicking default item', function () {
    $('su-select select').hasClass('default').should.equal(true)
    $('su-select select').click()

    $('su-select option:first-child').click()
    $('su-select select').hasClass('default').should.equal(true)
    spyOnChange.should.have.been.callCount(0)

    expect(tag.value).to.be.null
  })

  it('clicking item', function () {
    $('su-select select').hasClass('default').should.equal(true)
    $('su-select select').click()

    // TODO riot の onchange イベントを呼び出せないので仕方なく changeValues を実行している
    tag.changeValues(items[1].value)
    $('su-select select').hasClass('default').should.equal(false)
    spyOnChange.should.have.been.calledOnce

    tag.value.should.deep.equal(items[1].value)
    tag.label.should.deep.equal(items[1].label)
  })

  it('update value', function () {
    expect(tag.value).to.be.null
    tag.value = items[1].value
    tag.update()
    tag.value.should.deep.equal(items[1].value)
    tag.label.should.deep.equal(items[1].label)
  })

  it('update item value', function () {
    tag.value = items[1].value
    tag.update()
    items[1].value = 'M'
    tag.update()
    expect(tag.value).to.be.null
  })

  it('update items', function () {
    $('su-select option').length.should.equal(3)

    tag.opts.items = [
      {
        label: 'Alphabet',
        value: null,
        default: true
      },
      {
        label: 'A to C',
        items: [
          {
            label: 'A',
            value: 'a'
          },
          {
            label: 'B',
            value: 'b'
          },
          {
            label: 'C',
            value: 'c'
          }]
      }
    ]
    tag.update()

    $('su-select option').length.should.equal(4)
    spyOnChange.should.have.been.callCount(0)

    // TODO riot の onchange イベントを呼び出せないので仕方なく changeValues を実行している
    tag.changeValues('a')
    $('su-select select').hasClass('default').should.equal(false)
    spyOnChange.should.have.been.calledOnce

    tag.value.should.deep.equal('a')
    tag.label.should.deep.equal('A')
  })

  it('reset value', function () {
    expect(tag.value).to.be.null
    expect(tag.defaultValue).to.be.null
    tag.changed().should.deep.equal(false)

    // TODO riot の onchange イベントを呼び出せないので仕方なく changeValues を実行している
    tag.changeValues(items[1].value)

    tag.value.should.deep.equal(items[1].value)
    tag.changed().should.deep.equal(true)
    expect(tag.defaultValue).to.be.null

    tag.reset()
    expect(tag.value).to.be.null
    expect(tag.defaultValue).to.be.null
    tag.changed().should.deep.equal(false)
  })
})

const fireEvent = require('../../helpers').fireEvent
require('../../../dist/tags/rating/su-rating.js')

describe('su-rating', function () {
  let tag
  const spyOnClick = sinon.spy()
  const spyOnChange = sinon.spy()

  const mount = opts => {
    tag = riot.mount('su-rating', opts)[0]
    tag.on('click', spyOnClick)
    tag.on('change', spyOnChange)
  }


  beforeEach(function () {
    $('body').append('<su-rating></su-rating>')
  })

  afterEach(function () {
    spyOnClick.resetHistory()
    spyOnChange.resetHistory()
    tag.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
  })

  it('click event', function () {
    mount({
      value: 2,
      max: 4
    })
    $('su-rating i').length.should.equal(4)
    tag.value.should.equal(2)
    $('su-rating i:eq(0)').hasClass('active').should.equal(true)
    $('su-rating i:eq(1)').hasClass('active').should.equal(true)
    $('su-rating i:eq(2)').hasClass('active').should.equal(false)
    $('su-rating i:eq(3)').hasClass('active').should.equal(false)

    fireEvent($('su-rating i:eq(2)')[0], 'click')
    tag.value.should.equal(3)
    $('su-rating i:eq(0)').hasClass('active').should.equal(true)
    $('su-rating i:eq(1)').hasClass('active').should.equal(true)
    $('su-rating i:eq(2)').hasClass('active').should.equal(true)
    $('su-rating i:eq(3)').hasClass('active').should.equal(false)

    fireEvent($('su-rating i:eq(0)')[0], 'click')
    tag.value.should.equal(1)
    $('su-rating i:eq(0)').hasClass('active').should.equal(true)
    $('su-rating i:eq(1)').hasClass('active').should.equal(false)
    $('su-rating i:eq(2)').hasClass('active').should.equal(false)
    $('su-rating i:eq(3)').hasClass('active').should.equal(false)
  })

  it('read only', function () {
    mount({
      class: 'read-only',
      value: 2,
      max: 4
    })
    $('su-rating i').length.should.equal(4)
    tag.value.should.equal(2)
    $('su-rating i:eq(0)').hasClass('active').should.equal(true)
    $('su-rating i:eq(1)').hasClass('active').should.equal(true)
    $('su-rating i:eq(2)').hasClass('active').should.equal(false)
    $('su-rating i:eq(3)').hasClass('active').should.equal(false)
    $('su-rating i:eq(0)').hasClass('selected').should.equal(false)
    $('su-rating i:eq(1)').hasClass('selected').should.equal(false)
    $('su-rating i:eq(2)').hasClass('selected').should.equal(false)
    $('su-rating i:eq(3)').hasClass('selected').should.equal(false)

    fireEvent($('su-rating i:eq(2)')[0], 'click')
    tag.value.should.equal(2)
    $('su-rating i:eq(0)').hasClass('active').should.equal(true)
    $('su-rating i:eq(1)').hasClass('active').should.equal(true)
    $('su-rating i:eq(2)').hasClass('active').should.equal(false)
    $('su-rating i:eq(3)').hasClass('active').should.equal(false)

    fireEvent($('su-rating i:eq(2)')[0], 'mouseover')
    tag.value.should.equal(2)
    $('su-rating i:eq(0)').hasClass('selected').should.equal(false)
    $('su-rating i:eq(1)').hasClass('selected').should.equal(false)
    $('su-rating i:eq(2)').hasClass('selected').should.equal(false)
    $('su-rating i:eq(3)').hasClass('selected').should.equal(false)

    spyOnClick.should.have.been.callCount(0)
    spyOnChange.should.have.been.callCount(0)
  })

  it('reset value', function () {
    mount({
      value: 2,
      max: 4
    })

    tag.value.should.equal(2)
    tag.defaultValue.should.equal(2)
    tag.changed().should.deep.equal(false)

    fireEvent($('su-rating i:eq(2)')[0], 'click')
    tag.value.should.equal(3)
    tag.defaultValue.should.equal(2)
    tag.changed().should.deep.equal(true)

    tag.reset()
    tag.value.should.equal(2)
    tag.defaultValue.should.equal(2)
    tag.changed().should.deep.equal(false)
  })
})

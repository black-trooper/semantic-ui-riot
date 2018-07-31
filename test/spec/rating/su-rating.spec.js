const fireEvent = require('../../helpers').fireEvent

describe('su-rating', function () {
  let tag
  const spyOnClick = sinon.spy()

  const mount = opts => {
    tag = riot.mount('su-rating', opts)[0]
    tag.on('click', spyOnClick)
  }


  beforeEach(function () {
    $('body').append('<su-rating></su-rating>')
  })

  afterEach(function () {
    spyOnClick.reset()
    tag.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
  })

  it('click event', function () {
    mount()
    $('su-rating i').length.should.equal(5)
    tag.value.should.equal(0)
    $('su-rating i:eq(0)').hasClass('active').should.equal(false)
    $('su-rating i:eq(1)').hasClass('active').should.equal(false)
    $('su-rating i:eq(2)').hasClass('active').should.equal(false)
    $('su-rating i:eq(3)').hasClass('active').should.equal(false)
    $('su-rating i:eq(4)').hasClass('active').should.equal(false)

    fireEvent($('su-rating i:eq(2)')[0], 'click')
    tag.value.should.equal(3)
    $('su-rating i:eq(0)').hasClass('active').should.equal(true)
    $('su-rating i:eq(1)').hasClass('active').should.equal(true)
    $('su-rating i:eq(2)').hasClass('active').should.equal(true)
    $('su-rating i:eq(3)').hasClass('active').should.equal(false)
    $('su-rating i:eq(4)').hasClass('active').should.equal(false)

    fireEvent($('su-rating i:eq(0)')[0], 'click')
    tag.value.should.equal(1)
    $('su-rating i:eq(0)').hasClass('active').should.equal(true)
    $('su-rating i:eq(1)').hasClass('active').should.equal(false)
    $('su-rating i:eq(2)').hasClass('active').should.equal(false)
    $('su-rating i:eq(3)').hasClass('active').should.equal(false)
    $('su-rating i:eq(4)').hasClass('active').should.equal(false)
  })

  it('mouseover and mouseout', function () {
    mount()
    $('su-rating i').length.should.equal(5)
    tag.value.should.equal(0)

    fireEvent($('su-rating i:eq(2)')[0], 'mouseover')
    tag.value.should.equal(0)
    $('su-rating i:eq(0)').hasClass('selected').should.equal(true)
    $('su-rating i:eq(1)').hasClass('selected').should.equal(true)
    $('su-rating i:eq(2)').hasClass('selected').should.equal(true)
    $('su-rating i:eq(3)').hasClass('selected').should.equal(false)
    $('su-rating i:eq(4)').hasClass('selected').should.equal(false)

    fireEvent($('su-rating i:eq(2)')[0], 'mouseout')
    tag.value.should.equal(0)
    $('su-rating i:eq(0)').hasClass('selected').should.equal(false)
    $('su-rating i:eq(1)').hasClass('selected').should.equal(false)
    $('su-rating i:eq(2)').hasClass('selected').should.equal(false)
    $('su-rating i:eq(3)').hasClass('selected').should.equal(false)
    $('su-rating i:eq(4)').hasClass('selected').should.equal(false)
  })

  it('reset value', function () {
    mount()

    tag.value.should.equal(0)
    tag.defaultValue.should.equal(0)
    tag.changed().should.deep.equal(false)

    fireEvent($('su-rating i:eq(2)')[0], 'click')
    tag.value.should.equal(3)
    tag.defaultValue.should.equal(0)
    tag.changed().should.deep.equal(true)

    tag.reset()
    tag.value.should.equal(0)
    tag.defaultValue.should.equal(0)
    tag.changed().should.deep.equal(false)
  })
})

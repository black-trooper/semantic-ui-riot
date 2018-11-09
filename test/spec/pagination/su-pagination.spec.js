const fireEvent = require('../../helpers').fireEvent
require('../../../dist/tags/pagination/su-pagination.js')

describe('su-pagination', function () {
  let tag
  const spyOnChange = sinon.spy()

  const mount = opts => {
    tag = riot.mount('su-pagination', opts)[0]
    tag.on('change', spyOnChange)
  }


  beforeEach(function () {
    $('body').append('<su-pagination></su-pagination>')
  })

  afterEach(function () {
    spyOnChange.reset()
    tag.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
  })

  it('page count is 1', function () {
    mount({
      totalPages: 1
    })

    $('su-pagination .item:not(a.icon)').length.should.equal(1)
    $('su-pagination .item:not(a.icon).disabled').length.should.equal(0)
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(true)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(true)
    spyOnChange.should.have.been.callCount(0)
  })

  it('page count is 7', function () {
    mount({
      totalPages: 7
    })

    $('su-pagination .item:not(a.icon)').length.should.equal(7)
    $('su-pagination .item:not(a.icon).disabled').length.should.equal(0)
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledOnce
    spyOnChange.should.have.been.calledWith(2)


    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(3)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(4)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(5)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(6)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(true)
    spyOnChange.should.have.been.callCount(6)
    spyOnChange.should.have.been.calledWith(7)
  })

  it('page count is 8', function () {
    mount({
      totalPages: 8
    })

    $('su-pagination .item:not(a.icon)').length.should.equal(7)
    $('su-pagination .item:not(a.icon).disabled').length.should.equal(1)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledOnce
    spyOnChange.should.have.been.calledWith(2)


    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(3)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(4)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(5)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(6)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(7)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(true)
    spyOnChange.should.have.been.callCount(7)
    spyOnChange.should.have.been.calledWith(8)
  })

  it('page count is 9', function () {
    mount({
      totalPages: 9
    })

    $('su-pagination .item:not(a.icon)').length.should.equal(7)
    $('su-pagination .item:not(a.icon).disabled').length.should.equal(1)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledOnce
    spyOnChange.should.have.been.calledWith(2)


    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(3)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(4)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(5)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(6)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(7)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
    spyOnChange.should.have.been.calledWith(8)

    fireEvent($('su-pagination a.icon.item')[2], 'click')
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(true)
    spyOnChange.should.have.been.callCount(8)
    spyOnChange.should.have.been.calledWith(9)
  })

  it('page count is 0', function () {
    mount({
      totalPages: 0
    })

    $('su-pagination .item:not(a.icon)').length.should.equal(0)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(true)
    spyOnChange.should.have.been.callCount(0)
  })

  it('update options', function () {
    mount({
      totalPages: 9
    })

    $('su-pagination .item:not(a.icon)').length.should.equal(7)
    $('su-pagination .item:not(a.icon).disabled').length.should.equal(1)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)

    tag.opts.totalPages = 7
    tag.update()
    $('su-pagination .item:not(a.icon)').length.should.equal(7)
    $('su-pagination .item:not(a.icon).disabled').length.should.equal(0)
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(true)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)

    tag.opts.activePage = 2
    tag.update()
    $('su-pagination .item:not(a.icon):eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination .item:not(a.icon):eq(5)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(0)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(1)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(2)').hasClass('disabled').should.equal(false)
    $('su-pagination a.icon.item:eq(3)').hasClass('disabled').should.equal(false)
  })
})

const fireEvent = require("../../test/helpers").fireEvent

describe('su-checkbox-options', function () {
  let tag
  let spyOnClick = sinon.spy()

  beforeEach(function () {
    $('body').append('<su-checkbox>Make my profile visible</su-checkbox>')
    tag = riot.mount('su-checkbox', {
      check: true
    })[0]
    tag.on('click', spyOnClick)
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnClick.reset()
    this.clock.restore()
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('default checked', function () {
    tag.checked.should.equal(true)
  })

  it('click checkbox', function () {
    tag.checked.should.equal(true)

    $('su-checkbox input').click()
    spyOnClick.should.have.been.calledOnce
    tag.checked.should.equal(false)

    $('su-checkbox input').click()
    spyOnClick.should.have.been.calledTwice
    tag.checked.should.equal(true)
  })

  /*
  it('click label', function () {
    tag.checked.should.equal(true)

    fireEvent($('su-checkbox label')[0], 'click')
    spyOnClick.should.have.been.calledOnce
    tag.checked.should.equal(false)

    fireEvent($('su-checkbox label')[0], 'click')
    spyOnClick.should.have.been.calledTwice
    tag.checked.should.equal(true)
  })
  */

  it('update checked', function () {
    tag.checked.should.equal(true)

    tag.checked = false
    tag.checked.should.equal(false)

    tag.checked = true
    tag.checked.should.equal(true)

    spyOnClick.should.have.been.callCount(0)
  })
})

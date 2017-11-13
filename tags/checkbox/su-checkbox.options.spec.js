describe('su-checkbox-options', function () {
  let tag
  let spyOnClick = sinon.spy()
  let profileVisible = false

  let fireEvent = function (el, name) {
    var e = document.createEvent('HTMLEvents')
    e.initEvent(name, false, true)
    el.dispatchEvent(e)
  }

  beforeEach(function () {
    $('body').append('<su-checkbox>Make my profile visible</su-checkbox>')
    tag = riot.mount('su-checkbox', {
      check: profileVisible
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

  it('click checkbox', function () {
    tag.checked.should.equal(false)

    $('su-checkbox input').click()
    spyOnClick.should.have.been.calledOnce
    tag.checked.should.equal(true)

    $('su-checkbox input').click()
    spyOnClick.should.have.been.calledTwice
    tag.checked.should.equal(false)
  })

  it('update options', function () {
    tag.checked.should.equal(false)

    this.profileVisible = true
    tag.update()
  })
})

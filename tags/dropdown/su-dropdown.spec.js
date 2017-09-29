describe('su-dropdown', function () {
  let tag, select
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnSelect = sinon.spy()

  beforeEach(function () {
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
    $('body').append('<su-dropdown></su-dropdown>')
    tag = riot.mount('su-dropdown', {
      items
    })[0]
    tag.on('open', spyOnOpen)
      .on('close', spyOnClose)
      .on('select', spyOnSelect)
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnOpen.reset()
    spyOnClose.reset()
    spyOnSelect.reset()
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
})

describe('su-dropdown', function () {
  let tag, select

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
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    this.clock.restore()
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('has no items visible on load', function () {
    $('su-dropdown .menu .item').length.should.equal(0)
  })

  it('focusing/blurring field opens/closes dropdown and triggers open/close event', function () {
    $('su-dropdown .menu').hasClass('visible').should.equal(false)
    $('su-dropdown').click()
    this.clock.tick(310);
    $('su-dropdown .menu').hasClass('visible').should.equal(true)
    $('body').click()
    this.clock.tick(310);
    $('su-dropdown .menu').hasClass('visible').should.equal(false)
  })
})

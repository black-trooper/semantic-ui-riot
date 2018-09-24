describe('su-loading', function () {
  let tag
  let app
  let mount = () => {
    tag = riot.mount('su-loading')[0]
    app = riot.mount('app')[0]
  }

  beforeEach(function () {
    this.clock = sinon.useFakeTimers()
    riot.mixin('semantic-ui', { observable: riot.observable() })
    riot.tag('app')
    $('body').append(`
      <su-loading></su-loading>
      <app></app>
    `)
  })

  afterEach(function () {
    this.clock.restore()
    tag.unmount()
    app.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
  })

  it('opens/closes loading', function () {
    mount()
    $('su-loading > .dimmer').is(':visible').should.equal(false)

    app.suLoading(true)
    this.clock.tick(510)
    $('su-loading > .dimmer').is(':visible').should.equal(true)

    app.suLoading(false)
    this.clock.tick(310)
    $('su-loading > .dimmer').is(':visible').should.equal(false)
  })
})

describe('su-toast', function () {
  let tag
  let app
  let mount = opts => {
    tag = riot.mount('su-toast', opts)[0]
    app = riot.mount('app')[0]
  }

  beforeEach(function () {
    this.clock = sinon.useFakeTimers()
    riot.mixin('semantic-ui', { observable: riot.observable() })
    riot.tag('app')
    $('body').append(`
      <su-toast></su-toast>
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

  it('no option', function () {
    mount()
    $('su-toast').hasClass('bottom').should.equal(true)
    $('su-toast').hasClass('right').should.equal(true)

    app.suToast('hello')
    $('su-toast .ui.message').hasClass('right').should.equal(true)
  })

  it('option', function () {
    mount({
      'position': 'top left'
    })
    $('su-toast').hasClass('top').should.equal(true)
    $('su-toast').hasClass('left').should.equal(true)

    app.suToast('hello')
    $('su-toast .ui.message').hasClass('right').should.equal(false)
  })
})

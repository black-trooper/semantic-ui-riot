describe('su-toast', function () {
  let tag
  let app
  let mount = () => {
    tag = riot.mount('su-toast')[0]
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

  it('opens/auto closes toast', function () {
    mount()
    $('su-toast .item').length.should.equal(0)

    app.suToast('hello')
    tag.items[0].messages[0].should.equal('hello')
    $('su-toast .item').length.should.equal(1)

    this.clock.tick(5010)
    $('su-toast .item').length.should.equal(0)
  })

  it('opens/closes toast', function () {
    mount()
    $('su-toast .item').length.should.equal(0)

    app.suToast('hello')
    tag.items[0].messages[0].should.equal('hello')
    $('su-toast .item').length.should.equal(1)
    $('su-toast .ui.message').length.should.equal(1)

    $('su-toast .item:first .icon.close').click()
    $('su-toast .item').length.should.equal(1)
    $('su-toast .ui.message').length.should.equal(0)
  })

  it('all option', function () {
    mount()
    app.suToast({
      title: 'riot',
      message: ['hello!', 'hello!!'],
      icon: 'check',
      class: 'info',
    })
    tag.items[0].title.should.equal('riot')
    tag.items[0].messages[0].should.equal('hello!')
    tag.items[0].messages[1].should.equal('hello!!')
  })

  it('title only', function () {
    mount()
    app.suToast({ title: 'riot' })
    tag.items[0].title.should.equal('riot')
    expect(tag.items[0].messages[0]).to.be.null
  })

  it('messages only', function () {
    mount()
    app.suToast({ message: ['hello!', 'hello!!'] })
    expect(tag.items[0].title).to.be.null
    tag.items[0].messages[0].should.equal('hello!')
    tag.items[0].messages[1].should.equal('hello!!')
  })

  it('none message', function () {
    mount()
    app.suToast()
    expect(tag.items[0].title).to.be.null
    expect(tag.items[0].messages[0]).to.be.null
  })
})

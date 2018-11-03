require('../../../dist/tags/toast/su-toast.js')
require('../../../dist/tags/toast/su-toast-item.js')

riot.mixin('semantic-ui', {})

describe('su-toast-options', function () {
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
    $('su-toast-item > div').hasClass('right').should.equal(true)
    $('su-toast .progress.top').length.should.equal(0)
  })

  it('option', function () {
    mount({
      'position': 'top left'
    })
    $('su-toast').hasClass('top').should.equal(true)
    $('su-toast').hasClass('left').should.equal(true)

    app.suToast({ message: 'hello', progress: 'top' })
    $('su-toast-item > div').hasClass('right').should.equal(false)
    $('su-toast .progress.top').length.should.equal(1)
  })
})

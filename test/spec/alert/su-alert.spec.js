describe('su-alert', function () {
  let tag
  let app
  let mount = () => {
    tag = riot.mount('su-alert')[0]
    app = riot.mount('app')[0]
  }

  beforeEach(function () {
    this.clock = sinon.useFakeTimers()
    riot.mixin('semantic-ui', { observable: riot.observable() })
    riot.tag('app')
    $('body').append(`
      <su-alert></su-alert>
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

  it('opens/closes alert', function () {
    mount()
    $('su-alert su-modal').is(':visible').should.equal(false)

    app.suAlert('hello')
    tag.messages[0].should.equal('hello')
    this.clock.tick(510)
    $('su-alert').is(':visible').should.equal(true)

    const btn_one = $('su-alert su-modal .ui.button:first')
    btn_one.text().trim().should.equal('Close')
    btn_one.is(':focus').should.equal(false)

    $('su-modal').click()
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(true)

    btn_one.click()
    this.clock.tick(310)
    $('su-alert su-modal').is(':visible').should.equal(false)
  })

  it('title and messages', function () {
    mount()
    app.suAlert({ title: 'riot', message: ['hello!', 'hello!!'] })
    tag.title.should.equal('riot')
    tag.messages[0].should.equal('hello!')
    tag.messages[1].should.equal('hello!!')
  })

  it('title only', function () {
    mount()
    app.suAlert({ title: 'riot' })
    tag.title.should.equal('riot')
    expect(tag.messages[0]).to.be.null
  })

  it('messages only', function () {
    mount()
    app.suAlert({ message: ['hello!', 'hello!!'] })
    expect(tag.title).to.be.null
    tag.messages[0].should.equal('hello!')
    tag.messages[1].should.equal('hello!!')
  })

  it('none message', function () {
    mount()
    app.suAlert()
    expect(tag.title).to.be.null
    expect(tag.messages[0]).to.be.null
  })

  it('button name by opts', function () {
    mount()
    app.suAlert({
      button: {
        text: 'ok',
        default: true,
      }
    })
    const btn_one = $('su-alert su-modal .ui.button:first')
    btn_one.text().trim().should.equal('ok')
    btn_one.is(':focus').should.equal(true)
  })

  it('button name by defaultOptions', function () {
    riot.mixin('semantic-ui', {
      defaultOptions: {
        alert: {
          button: {
            text: 'Yes',
            default: true,
          }
        }
      }
    })
    mount()
    app.suAlert()
    const btn_one = $('su-alert su-modal .ui.button:first')
    btn_one.text().trim().should.equal('Yes')
    btn_one.is(':focus').should.equal(true)
  })

})

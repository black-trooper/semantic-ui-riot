describe('su-alert', function () {
  let tag
  let app
  let mount = opts => {
    tag = riot.mount('su-alert', opts)[0]
  }

  beforeEach(function () {
    this.clock = sinon.useFakeTimers()
    riot.mixin('semantic-ui', { observable: riot.observable() })
    riot.tag('app')
    $('body').append(`
      <su-alert></su-alert>
      <app></app>
    `)
    tag = riot.mount('su-alert')[0]
    app = riot.mount('app')[0]
  })

  afterEach(function () {
    this.clock.restore()
    tag.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
  })

  it('opens/closes alert', function () {
    mount()
    $('su-alert su-modal').is(':visible').should.equal(false)

    app.alert('hello')
    tag.messages[0].should.equal('hello')
    this.clock.tick(510)
    $('su-alert').is(':visible').should.equal(true)

    const btn_one = $('su-alert su-modal .ui.button:first')
    btn_one.text().trim().should.equal('close')
    btn_one.is(':focus').should.equal(true)

    $('su-modal').click()
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(true)

    btn_one.click()
    this.clock.tick(310)
    $('su-alert su-modal').is(':visible').should.equal(false)
  })

  it('title and messages', function () {
    mount()
    app.alert({ title: 'riot', message: ['hello!', 'hello!!'] })
    tag.title.should.equal('riot')
    tag.messages[0].should.equal('hello!')
    tag.messages[1].should.equal('hello!!')
  })

  it('title only', function () {
    mount()
    app.alert({ title: 'riot' })
    tag.title.should.equal('riot')
    expect(tag.messages[0]).to.be.null
  })

  it('messages only', function () {
    mount()
    app.alert({ message: ['hello!', 'hello!!'] })
    expect(tag.title).to.be.null
    tag.messages[0].should.equal('hello!')
    tag.messages[1].should.equal('hello!!')
  })

  it('none message', function () {
    mount()
    app.alert()
    expect(tag.title).to.be.null
    expect(tag.messages[0]).to.be.null
  })

  it('button name by opts', function () {
    mount({
      close: 'ok'
    })
    const btn_one = $('su-alert su-modal .ui.button:first')
    btn_one.text().trim().should.equal('ok')
  })

  it('button name by defaultOptions', function () {
    riot.mixin('semantic-ui', {
      defaultOptions: {
        alert: {
          close: 'Yes'
        }
      }
    })
    mount()
    const btn_one = $('su-alert su-modal .ui.button:first')
    btn_one.text().trim().should.equal('Yes')
  })

})

describe('su-confirm', function () {
  const Q = require('q')
  let tag
  let app
  let mount = opts => {
    tag = riot.mount('su-confirm', opts)[0]
  }

  beforeEach(function () {
    this.clock = sinon.useFakeTimers()
    riot.mixin('semantic-ui',
      {
        observable: riot.observable(),
        Q: {
          Promise: Q.Promise
        }
      })
    riot.tag('app')
    $('body').append(`
      <su-confirm></su-confirm>
      <app></app>
    `)
    tag = riot.mount('su-confirm')[0]
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

  it('opens/closes confirm ok', function () {
    mount()
    $('su-confirm su-modal').is(':visible').should.equal(false)

    app.confirm('hello')
    tag.messages[0].should.equal('hello')
    this.clock.tick(510)
    $('su-confirm').is(':visible').should.equal(true)

    const btn_cancel = $('su-confirm su-modal .ui.button:first')
    btn_cancel.text().trim().should.equal('Cancel')
    btn_cancel.is(':focus').should.equal(false)
    const btn_ok = $('su-confirm su-modal .ui.button:last')
    btn_ok.text().trim().should.equal('OK')
    btn_ok.is(':focus').should.equal(true)

    $('su-modal').click()
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(true)

    btn_ok.click()
    this.clock.tick(310)
    $('su-confirm su-modal').is(':visible').should.equal(false)
  })
  it('opens/closes confirm cancel', function () {
    mount()
    $('su-confirm su-modal').is(':visible').should.equal(false)

    app.confirm('hello')
    tag.messages[0].should.equal('hello')
    this.clock.tick(510)
    $('su-confirm').is(':visible').should.equal(true)

    const btn_cancel = $('su-confirm su-modal .ui.button:first')
    btn_cancel.text().trim().should.equal('Cancel')
    btn_cancel.is(':focus').should.equal(false)
    const btn_ok = $('su-confirm su-modal .ui.button:last')
    btn_ok.text().trim().should.equal('OK')
    btn_ok.is(':focus').should.equal(true)

    $('su-modal').click()
    this.clock.tick(310)
    $('su-modal').is(':visible').should.equal(true)

    btn_cancel.click()
    this.clock.tick(310)
    $('su-confirm su-modal').is(':visible').should.equal(false)
  })

  it('title and messages', function () {
    mount()
    app.confirm({ title: 'riot', message: ['hello!', 'hello!!'] })
    tag.title.should.equal('riot')
    tag.messages[0].should.equal('hello!')
    tag.messages[1].should.equal('hello!!')
  })

  it('title only', function () {
    mount()
    app.confirm({ title: 'riot' })
    tag.title.should.equal('riot')
    expect(tag.messages[0]).to.be.null
  })

  it('messages only', function () {
    mount()
    app.confirm({ message: ['hello!', 'hello!!'] })
    expect(tag.title).to.be.null
    tag.messages[0].should.equal('hello!')
    tag.messages[1].should.equal('hello!!')
  })

  it('none message', function () {
    mount()
    app.confirm()
    expect(tag.title).to.be.null
    expect(tag.messages[0]).to.be.null
  })

  it('button name by opts', function () {
    mount({
      ok: 'YES',
      cancel: 'NO'
    })
    const btn_cancel = $('su-confirm su-modal .ui.button:first')
    btn_cancel.text().trim().should.equal('NO')
    const btn_ok = $('su-confirm su-modal .ui.button:last')
    btn_ok.text().trim().should.equal('YES')
  })

  it('button name by defaultOptions', function () {
    riot.mixin('semantic-ui', {
      defaultOptions: {
        confirm: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    })
    mount()
    const btn_cancel = $('su-confirm su-modal .ui.button:first')
    btn_cancel.text().trim().should.equal('No')
    const btn_ok = $('su-confirm su-modal .ui.button:last')
    btn_ok.text().trim().should.equal('Yes')
  })

})

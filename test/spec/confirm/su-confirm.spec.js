require('../../../tags/confirm/su-confirm.tag')

describe('su-confirm', function () {
  const Q = require('q')
  let tag
  let app
  let mount = () => {
    tag = riot.mount('su-confirm')[0]
    app = riot.mount('app')[0]
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

  it('opens/closes confirm ok', function () {
    mount()
    $('su-confirm su-modal').is(':visible').should.equal(false)

    app.suConfirm('hello')
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

    app.suConfirm('hello')
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
    app.suConfirm({ title: 'riot', message: ['hello!', 'hello!!'] })
    tag.title.should.equal('riot')
    tag.messages[0].should.equal('hello!')
    tag.messages[1].should.equal('hello!!')
  })

  it('title only', function () {
    mount()
    app.suConfirm({ title: 'riot' })
    tag.title.should.equal('riot')
    expect(tag.messages[0]).to.be.null
  })

  it('messages only', function () {
    mount()
    app.suConfirm({ message: ['hello!', 'hello!!'] })
    expect(tag.title).to.be.null
    tag.messages[0].should.equal('hello!')
    tag.messages[1].should.equal('hello!!')
  })

  it('none message', function () {
    mount()
    app.suConfirm()
    expect(tag.title).to.be.null
    expect(tag.messages[0]).to.be.null
  })

  it('button name by opts', function () {
    mount()
    app.suConfirm({
      reverse: true,
      buttons: {
        ok: {
          text: 'Delete',
          type: 'negative',
          icon: 'trash',
        },
        cancel: {
          default: true,
          text: 'Not delete',
          type: 'positive',
          icon: 'undo',
        }
      }
    })

    const btn_cancel = $('su-confirm su-modal .ui.button:last')
    btn_cancel.text().trim().should.equal('Not delete')
    btn_cancel.find(`.undo`).length.should.equal(1)
    btn_cancel.hasClass('positive').should.equal(true)
    btn_cancel.is(':focus').should.equal(true)
    const btn_ok = $('su-confirm su-modal .ui.button:first')
    btn_ok.text().trim().should.equal('Delete')
    btn_ok.find(`.trash`).length.should.equal(1)
    btn_ok.hasClass('negative').should.equal(true)
    btn_ok.is(':focus').should.equal(false)
  })

  it('button name by empty opts', function () {
    mount()
    app.suConfirm({
      reverse: true,
      buttons: {
        ok: {
          text: 'empty',
          type: '',
          icon: '',
        },
      }
    })

    const btn_ok = $('su-confirm su-modal .ui.button:first')
    btn_ok.text().trim().should.equal('empty')
    btn_ok.find(`.check`).length.should.equal(0)
    btn_ok.hasClass('primary').should.equal(false)
  })

  it('button name by defaultOptions', function () {
    riot.mixin('semantic-ui', {
      defaultOptions: {
        confirm: {
          reverse: true,
          buttons: {
            ok: {
              text: 'Delete',
              type: 'negative',
              icon: 'trash',
            },
            cancel: {
              default: true,
              text: 'Not delete',
              type: 'positive',
              icon: 'undo',
            }
          }
        }
      }
    })
    mount()
    app.suConfirm()
    const btn_cancel = $('su-confirm su-modal .ui.button:last')
    btn_cancel.text().trim().should.equal('Not delete')
    btn_cancel.find(`.undo`).length.should.equal(1)
    btn_cancel.hasClass('positive').should.equal(true)
    btn_cancel.is(':focus').should.equal(true)
    const btn_ok = $('su-confirm su-modal .ui.button:first')
    btn_ok.text().trim().should.equal('Delete')
    btn_ok.find(`.trash`).length.should.equal(1)
    btn_ok.hasClass('negative').should.equal(true)
    btn_ok.is(':focus').should.equal(false)
  })

  it('button name by empty defaultOptions', function () {
    riot.mixin('semantic-ui', {
      defaultOptions: {
        confirm: {
          reverse: true,
          buttons: {
            ok: {
              text: 'empty',
              type: '',
              icon: '',
            },
          }
        }
      }
    })
    mount()
    app.suConfirm()
    const btn_ok = $('su-confirm su-modal .ui.button:first')
    btn_ok.text().trim().should.equal('empty')
    btn_ok.find(`.check`).length.should.equal(0)
    btn_ok.hasClass('primary').should.equal(false)
  })

  it('button name by opts and defaultOptions', function () {
    riot.mixin('semantic-ui', {
      defaultOptions: {
        confirm: {
          buttons: {
            ok: {
              default: true,
              text: 'はい',
              type: 'positive',
              icon: 'check',
            },
            cancel: {
              text: 'いいえ',
            }
          }
        }
      }
    })
    mount()
    app.suConfirm({
      reverse: true,
      buttons: {
        ok: {
          default: true,
          text: 'Delete',
          type: 'negative',
          icon: 'trash',
        },
        cancel: {
          text: 'Not delete',
          type: 'positive',
          icon: 'undo',
        }
      }
    })

    const btn_cancel = $('su-confirm su-modal .ui.button:last')
    btn_cancel.text().trim().should.equal('Not delete')
    btn_cancel.find(`.undo`).length.should.equal(1)
    btn_cancel.hasClass('positive').should.equal(true)
    btn_cancel.is(':focus').should.equal(false)
    const btn_ok = $('su-confirm su-modal .ui.button:first')
    btn_ok.text().trim().should.equal('Delete')
    btn_ok.find(`.trash`).length.should.equal(1)
    btn_ok.hasClass('negative').should.equal(true)
    btn_ok.is(':focus').should.equal(true)
  })
})

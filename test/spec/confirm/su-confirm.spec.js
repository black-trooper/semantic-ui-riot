import * as riot from 'riot'
import { init } from '../../helpers/'
import Targetcomponent from '../../../dist/tags/confirm/su-confirm.js'
import Modalcomponent from '../../../dist/tags/modal/su-modal.js'

describe('su-confirm', function () {
  let element, component
  init(riot)

  const mount = () => {
    component = riot.mount(element)[0]
  }

  beforeEach(function () {
    riot.register('su-confirm', Targetcomponent)
    riot.register('su-modal', Modalcomponent)
    element = document.createElement('su-confirm')
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    this.clock.restore()
    riot.unregister('su-modal')
    riot.unregister('su-confirm')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('opens/closes confirm ok', function () {
    mount()
    expect(component.$('su-modal > .dimmer').classList.contains('visible')).to.equal(false)

    component.suConfirm('hello')
    expect(component.$('p').innerText).to.equal('hello')
    this.clock.tick(510)
    expect(component.$('su-modal > .dimmer').classList.contains('visible')).to.equal(true)

    const btn_cancel = component.$('su-modal .ui.button')
    btn_cancel.innerText.trim().should.equal('Cancel')
    // btn_cancel.is(':focus').should.equal(false)
    const btn_ok = component.$$('su-modal .ui.button')[1]
    btn_ok.innerText.trim().should.equal('OK')
    // btn_ok.is(':focus').should.equal(true)

    component.$('su-modal').click()
    this.clock.tick(310)
    expect(component.$('su-modal > .dimmer').classList.contains('visible')).to.equal(true)

    btn_ok.click()
    this.clock.tick(310)
    expect(component.$('su-modal > .dimmer').classList.contains('visible')).to.equal(false)
  })

  it('opens/closes confirm cancel', function () {
    mount()
    expect(component.$('su-modal > .dimmer').classList.contains('visible')).to.equal(false)

    component.suConfirm('hello')
    expect(component.$('p').innerText).to.equal('hello')
    this.clock.tick(510)
    expect(component.$('su-modal > .dimmer').classList.contains('visible')).to.equal(true)

    const btn_cancel = component.$('su-modal .ui.button')
    btn_cancel.innerText.trim().should.equal('Cancel')
    // btn_cancel.is(':focus').should.equal(false)
    const btn_ok = component.$$('su-modal .ui.button')[1]
    btn_ok.innerText.trim().should.equal('OK')
    // btn_ok.is(':focus').should.equal(true)

    component.$('su-modal').click()
    this.clock.tick(310)
    expect(component.$('su-modal > .dimmer').classList.contains('visible')).to.equal(true)

    btn_cancel.click()
    this.clock.tick(310)
    expect(component.$('su-modal > .dimmer').classList.contains('visible')).to.equal(false)
  })

  it('title and messages', function () {
    mount()
    component.suConfirm({ title: 'riot', message: ['hello!', 'hello!!'] })
    expect(component.$('.header').innerText.trim()).to.equal('riot')
    expect(component.$$('p')[0].innerText).to.equal('hello!')
    expect(component.$$('p')[1].innerText).to.equal('hello!!')
  })

  it('title only', function () {
    mount()
    component.suConfirm({ title: 'riot' })
    expect(component.$('.header').innerText.trim()).to.equal('riot')
    expect(component.$('p').innerText).to.be.empty
  })

  it('messages only', function () {
    mount()
    component.suConfirm({ message: ['hello!', 'hello!!'] })
    expect(component.$('.header')).to.undefined
    expect(component.$$('p')[0].innerText).to.equal('hello!')
    expect(component.$$('p')[1].innerText).to.equal('hello!!')
  })

  it('none message', function () {
    mount()
    component.suConfirm()
    expect(component.$('.header')).to.undefined
    expect(component.$('p').innerText).to.empty
  })

  it('button name by opts', function () {
    mount()
    component.suConfirm({
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

    const btn_cancel = component.$$('su-modal .ui.button')[1]
    expect(btn_cancel.innerText.trim()).to.equal('Not delete')
    expect(btn_cancel.querySelectorAll('.undo')).to.have.lengthOf(1)
    expect(btn_cancel.classList.contains('positive')).to.equal(true)
    // btn_cancel.is(':focus').should.equal(true)
    const btn_ok = component.$('su-modal .ui.button')
    expect(btn_ok.innerText.trim()).to.equal('Delete')
    expect(btn_ok.querySelectorAll('.trash')).to.have.lengthOf(1)
    expect(btn_ok.classList.contains('negative')).to.equal(true)
    // btn_ok.is(':focus').should.equal(false)
  })

  it('button name by empty opts', function () {
    mount()
    component.suConfirm({
      reverse: true,
      buttons: {
        ok: {
          text: 'empty',
          type: '',
          icon: '',
        },
      }
    })

    const btn_ok = component.$('su-modal .ui.button')
    expect(btn_ok.innerText.trim()).to.equal('empty')
    expect(btn_ok.querySelectorAll('.check')).to.have.lengthOf(0)
    expect(btn_ok.classList.contains('primary')).to.equal(false)
  })

  it('button name by defaultOptions', function () {
    riot.install(function (_component) {
      _component.suDefaultOptions = {
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
    component.suConfirm()
    const btn_cancel = component.$$('su-modal .ui.button')[1]
    expect(btn_cancel.innerText.trim()).to.equal('Not delete')
    expect(btn_cancel.querySelectorAll('.undo')).to.have.lengthOf(1)
    expect(btn_cancel.classList.contains('positive')).to.equal(true)
    // btn_cancel.is(':focus').should.equal(true)
    const btn_ok = component.$('su-modal .ui.button')
    expect(btn_ok.innerText.trim()).to.equal('Delete')
    expect(btn_ok.querySelectorAll('.trash')).to.have.lengthOf(1)
    expect(btn_ok.classList.contains('negative')).to.equal(true)
    // btn_ok.is(':focus').should.equal(false)
  })

  it('button name by empty defaultOptions', function () {
    riot.install(function (_component) {
      _component.suDefaultOptions = {
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
    component.suConfirm()
    const btn_ok = component.$('su-modal .ui.button')
    expect(btn_ok.innerText.trim()).to.equal('empty')
    expect(btn_ok.querySelectorAll('.check')).to.have.lengthOf(0)
    expect(btn_ok.classList.contains('primary')).to.equal(false)
  })

  it('button name by opts and defaultOptions', function () {
    riot.install(function (_component) {
      _component.suDefaultOptions = {
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
    component.suConfirm({
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

    const btn_cancel = component.$$('su-modal .ui.button')[1]
    expect(btn_cancel.innerText.trim()).to.equal('Not delete')
    expect(btn_cancel.querySelectorAll('.undo')).to.have.lengthOf(1)
    expect(btn_cancel.classList.contains('positive')).to.equal(true)
    // btn_cancel.is(':focus').should.equal(true)
    const btn_ok = component.$('su-modal .ui.button')
    expect(btn_ok.innerText.trim()).to.equal('Delete')
    expect(btn_ok.querySelectorAll('.trash')).to.have.lengthOf(1)
    expect(btn_ok.classList.contains('negative')).to.equal(true)
    // btn_ok.is(':focus').should.equal(false)
  })
})

import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import TargetComponent from '../../../dist/tags/toast/su-toast.js'
import TargetItemComponent from '../../../dist/tags/toast/su-toast-item.js'

describe('su-toast', function () {
  let element, component
  init(riot)

  const mount = () => {
    element = document.createElement('app')
    riot.register('su-toast', TargetComponent)
    riot.register('su-toast-item', TargetItemComponent)
    const AppComponent = compile(`
      <app>
        <su-toast>
        </su-toast>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element)[0]
  }

  beforeEach(function () {
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    riot.unregister('su-toast-item')
    riot.unregister('su-toast')
    riot.unregister('app')
    this.clock.restore()
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('opens/auto closes toast', function () {
    mount()
    expect(component.$('su-toast .item')).to.be.undefined

    component.suToast('hello')
    expect(component.$$('su-toast .item').length).to.equal(1)
    expect(component.$('su-toast .item').innerText).to.equal('hello')

    this.clock.tick(5010)
    expect(component.$('su-toast .item')).to.be.undefined
  })

  it('opens/closes toast', function () {
    mount()
    expect(component.$('su-toast .item')).to.be.undefined

    component.suToast('hello')
    expect(component.$('su-toast .item').innerText).to.equal('hello')
    expect(component.$$('su-toast .item').length).to.equal(1)
    expect(component.$('su-toast .ui.message')).to.not.be.undefined

    fireEvent(component.$('su-toast .item .icon.close'), 'click')
    expect(component.$$('su-toast .item').length).to.equal(1)
    expect(component.$('su-toast .ui.message')).to.be.undefined
  })

  it('all option', function () {
    mount()
    component.suToast({
      title: 'riot',
      message: ['hello!', 'hello!!'],
      icon: 'check',
      class: 'info',
    })
    expect(component.$('su-toast .item .header').innerText.trim()).to.equal('riot')
    expect(component.$$('su-toast .item p')[0].innerText).to.equal('hello!')
    expect(component.$$('su-toast .item p')[1].innerText).to.equal('hello!!')
  })

  it('title only', function () {
    mount()
    component.suToast({ title: 'riot' })
    expect(component.$('su-toast .item .header').innerText.trim()).to.equal('riot')
    expect(component.$('su-toast .item p').innerText).to.empty
  })

  it('messages only', function () {
    mount()
    component.suToast({ message: ['hello!', 'hello!!'] })
    expect(component.$('su-toast .item .header')).to.undefined
    expect(component.$$('su-toast .item p')[0].innerText).to.equal('hello!')
    expect(component.$$('su-toast .item p')[1].innerText).to.equal('hello!!')
  })

  it('none message', function () {
    mount()
    component.suToast()
    expect(component.$('su-toast .item .header')).to.undefined
    expect(component.$('su-toast .item p').innerText).to.empty
  })
})

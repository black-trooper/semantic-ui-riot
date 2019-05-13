import * as riot from 'riot'
import { init, fireEvent } from '../../helpers/'
import TabComponent from '../../../dist/tags/tab/su-tab.js'
import TabsetComponent from '../../../dist/tags/tab/su-tabset.js'
import AppComponent from '../../tags/su-tabset-test.js'

describe('su-tabset', function () {
  let element, component
  let spyOnClick = sinon.spy()
  init(riot)

  beforeEach(function () {
    element = document.createElement('app')
    riot.register('app', AppComponent)
    riot.register('su-tabset', TabsetComponent)
    riot.register('su-tab', TabComponent)
    component = riot.mount(element, {
      'onclick': spyOnClick
    })[0]
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    spyOnClick.reset()
    this.clock.restore()
    riot.unregister('su-tab')
    riot.unregister('su-tabset')
    riot.unregister('app')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('change active', function () {
    this.clock.tick(510)
    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab')[0].innerText).to.equal('Home content')
    expect(component.$$('su-tab')[1].innerText).to.equal('Messages content')

    fireEvent(component.$$('a.item')[1], 'click')
    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(true)
    expect(spyOnClick).to.have.been.calledOnce

    fireEvent(component.$$('a.item')[0], 'click')
    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(false)
    expect(spyOnClick).to.have.been.calledTwice
  })
})

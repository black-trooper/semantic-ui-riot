import * as riot from 'riot'
import { init, fireEvent } from '../../helpers/'
import TabComponent from '../../../dist/tags/tab/su-tab.js'
import TabsetComponent from '../../../dist/tags/tab/su-tabset.js'
import AppComponent from '../../tags/su-tabset-test.options.js'

describe('su-tabset-options', function () {
  let element, component
  let spyOnClick = sinon.spy()
  init(riot)

  beforeEach(function () {
    element = document.createElement('app')
    riot.register('app', AppComponent)
    riot.register('su-tabset', TabsetComponent)
    riot.register('su-tab', TabComponent)
    this.clock = sinon.useFakeTimers()
  })

  const mount = opt => {
    opt.onclick = spyOnClick
    component = riot.mount(element, opt)[0]
  }

  afterEach(function () {
    spyOnClick.reset()
    this.clock.restore()
    riot.unregister('su-tab')
    riot.unregister('su-tabset')
    riot.unregister('app')
  })

  it('no segment', function () {
    mount({
      class: 'no-segment'
    })

    expect(component.$$('su-tab')[0].classList.contains('segment')).to.equal(false)
    expect(component.$$('su-tab')[1].classList.contains('segment')).to.equal(false)
  })

  it('top tabular', function () {
    mount({
      class: 'top tabular'
    })

    expect(component.$$('su-tab')[0].classList.contains('tabular')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('bottom')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('tabular')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('bottom')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('top')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('tabular')).to.equal(true)
  })

  it('bottom tabular', function () {
    mount({
      class: 'bottom tabular'
    })

    expect(component.$$('su-tab')[0].classList.contains('tabular')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('top')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('tabular')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('top')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('bottom')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('tabular')).to.equal(true)
  })

  it('top attached', function () {
    mount({
      class: 'top attached'
    })

    expect(component.$$('su-tab')[0].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('bottom')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('bottom')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('top')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('attached')).to.equal(true)
  })

  it('bottom attached', function () {
    mount({
      class: 'bottom attached'
    })

    expect(component.$$('su-tab')[0].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('top')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('top')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('bottom')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('attached')).to.equal(true)
  })

  it('default active', function () {
    mount({
      active: 'Messages'
    })

    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(true)
  })

  it('default active is not match', function () {
    mount({
      active: 'Nothing'
    })

    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(false)
  })

  it('lazy mount', function () {
    mount({
      lazyMount: true
    })

    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab')[0].innerText).to.equal('Home content')
    expect(component.$$('su-tab')[1].innerText).to.equal('')

    fireEvent(component.$$('a.item')[1], 'click')
    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab')[0].innerText).to.equal('Home content')
    expect(component.$$('su-tab')[1].innerText).to.equal('Messages content')

    fireEvent(component.$$('a.item')[0], 'click')
    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab')[0].innerText).to.equal('Home content')
    expect(component.$$('su-tab')[1].innerText).to.equal('Messages content')
  })
})
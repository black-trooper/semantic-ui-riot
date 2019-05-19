import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../dist/tags/tab/su-tab.js'

describe('su-tab', function () {
  let element, component
  init(riot)

  beforeEach(function () {
    element = document.createElement('su-tab')
    element.innerHTML = 'tab content'
    riot.register('su-tab', TargetComponent)
    component = riot.mount(element, {
      'class': 'orange'
    })[0]
  })

  afterEach(function () {
    component.unmount()
    riot.unregister('su-tab')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('change active', function () {
    expect(component.state.active).to.be.not.ok
    expect(component.root.innerText).to.equal('tab content')
    expect(component.root.classList.contains('active')).to.equal(false)
    expect(component.root.classList.contains('orange')).to.equal(true)

    component.state.active = true
    component.update()
    expect(component.state.active).to.equal(true)
    expect(component.root.innerText).to.equal('tab content')
    expect(component.root.classList.contains('active')).to.equal(true)
  })
})

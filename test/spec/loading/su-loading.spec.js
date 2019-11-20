import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../dist/tags/loading/su-loading.js'

describe('su-loading', function () {
  let element, component
  init(riot)

  const mount = () => {
    component = riot.mount(element)[0]
  }

  beforeEach(function () {
    riot.register('su-loading', TargetComponent)
    element = document.createElement('su-loading')
  })

  afterEach(function () {
    riot.unregister('su-loading')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('opens/closes loading', function () {
    mount()
    expect(component.$('.dimmer').classList.contains('active')).to.equal(false)

    component.suLoading(true)
    expect(component.$('.dimmer').classList.contains('active')).to.equal(true)

    component.suLoading(false)
    expect(component.$('.dimmer').classList.contains('active')).to.equal(false)

    component.suLoading(true)
    component.suLoading(true)
    expect(component.$('.dimmer').classList.contains('active')).to.equal(true)
    component.suLoading(false)
    expect(component.$('.dimmer').classList.contains('active')).to.equal(true)
    component.suLoading(false)
    expect(component.$('.dimmer').classList.contains('active')).to.equal(false)
  })
})

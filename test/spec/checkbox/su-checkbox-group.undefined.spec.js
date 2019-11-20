import * as riot from 'riot'
import { init } from '../../helpers/'
import CheckboxGroupComponent from '../../../dist/tags/checkbox/su-checkbox-group.js'
import CheckboxComponent from '../../../dist/tags/checkbox/su-checkbox.js'

describe('su-checkbox-group-undefined', function () {
  let element, component
  init(riot)

  beforeEach(function () {
    riot.register('su-checkbox-group', CheckboxGroupComponent)
    riot.register('su-checkbox', CheckboxComponent)
    element = document.createElement('su-checkbox-group')
    const child1 = document.createElement('su-checkbox')
    const child2 = document.createElement('su-checkbox')
    element.appendChild(child1)
    element.appendChild(child2)

    component = riot.mount(element)[0]
    riot.mount(child1)
    riot.mount(child2)
  })

  afterEach(function () {
    component.unmount()
    riot.unregister('su-checkbox')
    riot.unregister('su-checkbox-group')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })
})

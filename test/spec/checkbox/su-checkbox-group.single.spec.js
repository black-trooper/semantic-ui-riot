import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import CheckboxGroupComponent from '../../../dist/tags/checkbox/su-checkbox-group.js'
import CheckboxComponent from '../../../dist/tags/checkbox/su-checkbox.js'

describe('su-checkbox-group-single', function () {
  let element, component
  let spyOnChange = sinon.spy()
  init(riot)

  beforeEach(function () {
    element = document.createElement('app')
    riot.register('su-checkbox-group', CheckboxGroupComponent)
    riot.register('su-checkbox', CheckboxComponent)
    const AppComponent = compile(`
      <app>
        <su-checkbox-group
          value="{ value }"
          onchange="{ () => dispatch('change') }">
          <su-checkbox value="1" />
        </su-checkbox-group>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element, {
      'onchange': spyOnChange
    })[0]
  })

  afterEach(function () {
    spyOnChange.reset()
    component.unmount()
    riot.unregister('su-checkbox')
    riot.unregister('su-checkbox-group')
    riot.unregister('app')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('update value', function () {
    expect(component.$('su-checkbox').getAttribute("checked")).to.be.not.ok

    component.value = "1"
    component.update()
    expect(component.$('su-checkbox').getAttribute("checked")).to.be.ok

    component.value = "2"
    component.update()
    expect(component.$('su-checkbox').getAttribute("checked")).to.be.not.ok
  })

  it('click checkbox', function () {
    expect(component.$('su-checkbox').getAttribute("checked")).to.be.not.ok

    component.$('su-checkbox input').click()
    expect(component.$('su-checkbox').getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledOnce
  })
})

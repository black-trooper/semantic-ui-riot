import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import RadioGroupComponent from '../../../dist/tags/radio/su-radio-group.js'
import RadioComponent from '../../../dist/tags/radio/su-radio.js'

describe('su-radio-group-single', function () {
  let element, component
  let spyOnChange
  init(riot)

  beforeEach(function () {
    spyOnChange = sinon.spy()
    element = document.createElement('app')
    riot.register('su-radio-group', RadioGroupComponent)
    riot.register('su-radio', RadioComponent)
    const AppComponent = compile(`
      <app>
        <su-radio-group
          value="{ value }"
          onchange="{ () => dispatch('change') }">
          <su-radio value="1" />
        </su-radio-group>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element, {
      'onchange': spyOnChange
    })[0]
  })

  afterEach(function () {
    component.unmount()
    riot.unregister('su-radio')
    riot.unregister('su-radio-group')
    riot.unregister('app')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('update value', function () {
    expect(component.$('su-radio').hasAttribute("checked")).to.be.not.ok

    component.value = "1"
    component.update()
    expect(component.$('su-radio').getAttribute("checked")).to.be.ok
    expect(spyOnChange).to.have.been.calledOnce

    component.value = "2"
    component.update()
    expect(component.$('su-radio').hasAttribute("checked")).to.be.not.ok
    expect(spyOnChange).to.have.been.calledTwice
  })
})

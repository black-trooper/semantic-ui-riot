import * as riot from 'riot'
import { init, fireEvent, compile } from '../../helpers/'
import CheckboxGroupComponent from '../../../dist/tags/checkbox/su-checkbox-group.js'
import CheckboxComponent from '../../../dist/tags/checkbox/su-checkbox.js'

describe('su-checkbox-group', function () {
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
          <su-checkbox value="2" />
        </su-checkbox-group>
        <button id="reset" type="button" onclick="{ reset }">reset</button>
        <script>
          export default {
            reset() {
              this.obs.trigger(this.$('su-checkbox-group').id + '-reset')
            }
          }
        </script>
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
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok

    component.value = "1"
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    component.value = "2"
    component.update()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledTwice
  })

  it('click checkbox', function () {
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.not.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok

    component.$$('su-checkbox input')[0].click()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    component.$$('su-checkbox input')[1].click()
    expect(component.$$('su-checkbox')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-checkbox')[1].getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledTwice
  })

  it('reset value', function () {
    expect(component.$('su-checkbox-group').value).to.be.undefined
    expect(component.$('su-checkbox-group').getAttribute('changed')).to.be.not.ok

    component.$$('su-checkbox input')[0].click()
    expect(component.$('su-checkbox-group').value).to.equal(component.$('su-checkbox').value)
    expect(component.$('su-checkbox-group').getAttribute('changed')).to.be.ok

    fireEvent(component.$('#reset'), 'click')
    expect(component.$('su-checkbox-group').value).to.be.undefined
    expect(component.$('su-checkbox-group').getAttribute('changed')).to.be.not.ok
  })
})

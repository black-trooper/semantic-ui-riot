import * as riot from 'riot'
import { init, fireEvent, compile } from '../../helpers/'
import RadioGroupComponent from '../../../dist/tags/radio/su-radio-group.js'
import RadioComponent from '../../../dist/tags/radio/su-radio.js'

describe('su-radio-group', function () {
  let element, component
  let spyOnChange = sinon.spy()
  init(riot)

  beforeEach(function () {
    element = document.createElement('app')
    riot.register('su-radio-group', RadioGroupComponent)
    riot.register('su-radio', RadioComponent)
    const AppComponent = compile(`
      <app>
        <su-radio-group
          value="{ value }"
          onchange="{ () => dispatch('change') }">
          <su-radio value="1" />
          <su-radio value="2" />
        </su-radio-group>
        <button id="reset" type="button" onclick="{ reset }">reset</button>
        <script>
          export default {
            reset() {
              this.obs.trigger(this.$('su-radio-group').id + '-reset')
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
    riot.unregister('su-radio')
    riot.unregister('su-radio-group')
    riot.unregister('app')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('update value', function () {
    expect(component.$$('su-radio')[0].hasAttribute("checked")).to.be.not.ok
    expect(component.$$('su-radio')[1].hasAttribute("checked")).to.be.not.ok

    component.value = "1"
    component.update()
    expect(component.$$('su-radio')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-radio')[1].hasAttribute("checked")).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    component.value = "2"
    component.update()
    expect(component.$$('su-radio')[0].hasAttribute("checked")).to.be.not.ok
    expect(component.$$('su-radio')[1].getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledTwice
  })

  it('click radio', function () {
    expect(component.$$('su-radio')[0].hasAttribute("checked")).to.be.not.ok
    expect(component.$$('su-radio')[1].hasAttribute("checked")).to.be.not.ok

    component.$$('su-radio input')[0].click()
    expect(component.$$('su-radio')[0].getAttribute("checked")).to.be.ok
    expect(component.$$('su-radio')[1].hasAttribute("checked")).to.be.not.ok
    spyOnChange.should.have.been.calledOnce

    component.$$('su-radio input')[1].click()
    expect(component.$$('su-radio')[0].hasAttribute("checked")).to.be.not.ok
    expect(component.$$('su-radio')[1].getAttribute("checked")).to.be.ok
    spyOnChange.should.have.been.calledTwice
  })

  it('reset value', function () {
    expect(component.$('su-radio-group').value).to.be.undefined
    expect(component.$('su-radio-group').getAttribute("changed")).to.be.not.ok

    component.$$('su-radio input')[0].click()
    expect(component.$('su-radio-group').value).to.equal(component.$('su-radio').value)
    expect(component.$('su-radio-group').getAttribute("changed")).to.be.ok

    fireEvent(component.$('#reset'), 'click')
    expect(component.$('su-radio-group').value).to.be.undefined
    expect(component.$('su-radio-group').getAttribute("changed")).to.be.not.ok
  })
})

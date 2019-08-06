import * as riot from 'riot'
import { init, compile, fireEvent, fireKeyEvent } from '../../helpers/'
import TargetComponent from '../../../dist/tags/dropdown/su-dropdown.js'

describe('su-dropdown-multiple-option', function () {
  let element, component
  init(riot)

  let items = [
    {
      label: 'Skills',
      value: null,
      default: true
    },
    { value: 'angular', label: 'Angular' },
    { value: 'css', label: 'CSS' },
    { value: 'design', label: 'Graphic Design' },
    { value: 'ember', label: 'Ember' },
    { value: 'html', label: 'HTML' },
    { value: 'ia', label: 'Information Architecture' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'mech', label: 'Mechanical Engineering' },
    { value: 'meteor', label: 'Meteor' },
    { value: 'node', label: 'NodeJS' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'python', label: 'Python' },
    { value: 'rails', label: 'Rails' },
    { value: 'react', label: 'React' },
    { value: 'repair', label: 'Kitchen Repair' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'ui', label: 'UI Design' },
    { value: 'ux', label: 'User Experience' }
  ]

  const mount = value => {
    element = document.createElement('app')
    riot.register('su-dropdown', TargetComponent)
    const AppComponent = compile(`
      <app>
        <su-dropdown
          value="{ props.value }"
          multiple="{ props.multiple }"
          items="{ props.items }">
        </su-dropdown>
        <button id="reset" type="button" onclick="{ reset }">reset</button>
        <script>
          export default {
            reset() {
              this.obs.trigger(this.$('su-dropdown').id + '-reset')
            }
          }
        </script>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element, {
      'multiple': true,
      'items': items,
      'value': value,
    })[0]
  }

  afterEach(function () {
    component.unmount()
    riot.unregister('su-dropdown')
    riot.unregister('app')
  })

  it('default value', function () {
    mount('angular')
    expect(component.$$('.label')).to.have.lengthOf(1)
    expect(component.$('.label').innerText.trim()).to.equal(items[1].label)
  })

  it('default values', function () {
    mount('[angular,css]')
    expect(component.$$('.label')).to.have.lengthOf(2)
    expect(component.$('.label').innerText.trim()).to.equal(items[1].label)
    expect(component.$$('.label')[1].innerText.trim()).to.equal(items[2].label)
  })

  it('default riotValue', function () {
    mount('{\'angular\'}')
    expect(component.$$('.label')).to.have.lengthOf(1)
    expect(component.$('.label').innerText.trim()).to.equal(items[1].label)
  })

  it('default riotValues', function () {
    mount('{[\'angular\', \'css\']}')
    expect(component.$$('.label')).to.have.lengthOf(2)
    expect(component.$('.label').innerText.trim()).to.equal(items[1].label)
    expect(component.$$('.label')[1].innerText.trim()).to.equal(items[2].label)
  })

  it('reset value', function () {
    mount('{[\'angular\', \'css\']}')
    expect(component.$('su-dropdown').getAttribute("value")).to.equal('angular,css')
    expect(component.$('su-dropdown').getAttribute("changed")).to.be.not.ok

    component.$('.label .delete').click()
    expect(component.$('.label').innerText.trim()).to.equal(items[2].label)
    expect(component.$('su-dropdown').getAttribute("value")).to.equal('css')
    expect(component.$('su-dropdown').getAttribute("changed")).to.be.ok

    fireEvent(component.$('#reset'), 'click')
    expect(component.$('su-dropdown').getAttribute("value")).to.equal('angular,css')
    expect(component.$('su-dropdown').getAttribute("changed")).to.be.not.ok
  })
})

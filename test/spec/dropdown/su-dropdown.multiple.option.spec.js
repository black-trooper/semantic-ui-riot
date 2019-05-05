import * as riot from 'riot'
import { init, fireEvent, fireKeyEvent } from '../../helpers/'
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
    riot.register('su-dropdown', TargetComponent)
    element = document.createElement('su-dropdown')
    component = riot.mount(element, {
      'multiple': true,
      'items': items,
      'value': value,
    })[0]
  }

  afterEach(function () {
    component.unmount()
    riot.unregister('su-dropdown')
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
    expect(component.state.value).deep.equal(['angular', 'css'])
    expect(component.state.defaultValue).deep.equal(['angular', 'css'])
    expect(component.changed).deep.equal(false)
    element.click()

    component.$('.label .delete').click()
    expect(component.$('.label').innerText.trim()).to.equal(items[2].label)
    expect(component.state.value).deep.equal(['css'])
    expect(component.state.defaultValue).deep.equal(['angular', 'css'])
    expect(component.changed).deep.equal(true)

    component.reset()
    expect(component.state.value).deep.equal(['angular', 'css'])
    expect(component.state.defaultValue).deep.equal(['angular', 'css'])
    expect(component.changed).deep.equal(false)
  })
})

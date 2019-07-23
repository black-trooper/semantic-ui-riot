import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import TargetComponent from '../../../dist/tags/dropdown/su-select.js'

describe('su-select-option', function () {
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
    const option = {
      'items': items,
      'value': value,
    }
    element = document.createElement('app')
    riot.register('su-select', TargetComponent)
    const AppComponent = compile(`
      <app>
        <su-select value="{ value || props.value }" items="{ props.items }"></su-select>
      </app>`)
    riot.register('app', AppComponent)
    component = riot.mount(element, option)[0]
  }

  afterEach(function () {
    riot.unregister('su-select')
    riot.unregister('app')
  })

  it('default value', function () {
    mount('angular')
    expect(component.$('su-select').value).to.equal('angular')
    expect(component.$('su-select').getAttribute('label')).to.equal('Angular')
  })
})

import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../dist/tags/dropdown/su-dropdown.js'

describe('su-dropdown-search', function () {
  let element, component
  let spyOnOpen, spyOnClose, spyOnSearch
  init(riot)

  let items = [
    {
      label: 'State',
      value: null,
      default: true
    },
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ]

  beforeEach(function () {
    spyOnOpen = sinon.spy()
    spyOnClose = sinon.spy()
    spyOnSearch = sinon.spy()
    riot.register('su-dropdown', TargetComponent)
    element = document.createElement('su-dropdown')
    component = riot.mount(element, {
      'items': items,
      'search': true,
      'onopen': spyOnOpen,
      'onclose': spyOnClose,
      'onsearch': spyOnSearch,
    })[0]
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    this.clock.restore()
    component.unmount()
    riot.unregister('su-dropdown')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('text input is exist', function () {
    expect(component.$$('.search')).to.have.lengthOf(1)
  })

  it('opens the menu on focus', function () {
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)

    fireEvent(component.$('.search'), 'click')
    fireEvent(component.$('.search'), 'focus')
    this.clock.tick(310)
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)

    fireEvent(element, 'blur')
  })

  it('adding text to box filters the options list', function () {
    expect(component.$('.menu').classList.contains('visible')).to.equal(false)

    fireEvent(component.$('.search'), 'focus')
    expect(spyOnSearch).calledOnce
    expect(component.$('.menu').classList.contains('visible')).to.equal(true)
    expect(component.$$('.menu div')).to.have.lengthOf(52)
    expect(component.$$('.item')).to.have.lengthOf(52)
    expect(spyOnOpen).calledOnce

    component.$('.search').value = 'm'
    fireEvent(component.$('.search'), 'input')
    expect(component.$$('.menu div')).to.have.lengthOf(15)
    expect(component.$$('.item')).to.have.lengthOf(15)
    expect(spyOnSearch).calledTwice
  })

  it('pressing key down will active item', function () {
    fireEvent(element, 'focus')
    this.clock.tick(310)
    component.$('.search').value = 'm'
    fireEvent(component.$('.search'), 'input')
    expect(component.$$('.item')).to.have.lengthOf(15)

    fireKeyEvent(element, 'keydown', keys.downArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[1].label)

    fireKeyEvent(element, 'keydown', keys.downArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[9].label)

    fireKeyEvent(element, 'keydown', keys.downArrow)
    expect(component.$('.hover .text').innerText).to.equal(items[20].label)

    fireEvent(element, 'blur')
  })

  it('pressing key down when no item', function () {
    fireEvent(element, 'focus')
    component.$('.search').value = 'xxxxx'
    fireEvent(component.$('.search'), 'input')
    expect(component.$$('.item')).to.have.lengthOf(0)

    fireKeyEvent(element, 'keydown', keys.downArrow)
    expect(component.$$('.hover .text')).to.have.lengthOf(0)

    fireKeyEvent(element, 'keyup', keys.enter)
  })
})

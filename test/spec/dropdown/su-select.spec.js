import * as riot from 'riot'
import { init, fireEvent, compile } from '../../helpers/'
import TargetComponent from '../../../dist/tags/dropdown/su-select.js'

describe('su-select', function () {
  let element, component
  let spyOnChange = sinon.spy()
  let spyOnBlur = sinon.spy()
  init(riot)

  let items = [
    {
      label: 'Gender',
      value: null,
      default: true
    },
    {
      label: 'Male',
      value: '1'
    },
    {
      label: 'Female',
      value: '2'
    },
  ]

  beforeEach(function () {
    riot.register('su-select', TargetComponent)
    const AppComponent = compile(`
      <app>
        <su-select items="{ items || props.items }"
          value="{ value }"
          onchange="{ props.onchange }"
          onblur="{ props.onblur }"
        />
      </app>
    `)
    riot.register('app', AppComponent)
    element = document.createElement('app')
    component = riot.mount(element, {
      'items': items,
      'onchange': spyOnChange,
      'onblur': spyOnBlur,
    })[0]
  })

  afterEach(function () {
    spyOnChange.reset()
    spyOnBlur.reset()
    riot.unregister('su-select')
    riot.unregister('app')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('clicking default item', function () {
    expect(component.$('su-select select').classList.contains('default')).to.equal(true)
    component.$('su-select select').click()

    component.$('su-select option').click()
    expect(component.$('su-select select').classList.contains('default')).to.equal(true)
    expect(spyOnChange).callCount(0)

    expect(component.$('su-select').getAttribute('value')).to.be.null
  })

  it('clicking item', function () {
    expect(component.$('su-select select').classList.contains('default')).to.equal(true)
    component.$('su-select select').click()

    component.$('su-select select').value = items[1].value
    component.$('su-select select').onchange()
    expect(component.$('su-select select').classList.contains('default')).to.equal(false)
    expect(spyOnChange).calledOnce

    expect(component.$('su-select').getAttribute('value')).to.equal(items[1].value)
    expect(component.$('su-select').getAttribute('label')).to.equal(items[1].label)

    fireEvent(component.$('su-select select'), 'blur')
    expect(spyOnBlur).calledOnce
  })

  it('update value', function () {
    expect(component.$('su-select').getAttribute('value')).to.equal(items[0].value)
    component.value = items[1].value
    component.update()
    expect(component.$('su-select').getAttribute('value')).to.equal(items[1].value)
    expect(component.$('su-select').getAttribute('label')).to.equal(items[1].label)
  })

  it('update item value', function () {
    component.value = items[1].value
    component.update()

    items[1].value = 'M'
    component.items = items
    component.update()
    expect(component.$('su-select').getAttribute('value')).to.equal(items[0].value)
  })

  it('update items', function () {
    expect(component.$$('su-select option').length).to.equal(3)

    component.items = [
      {
        label: 'Alphabet',
        value: null,
        default: true
      },
      {
        label: 'A to C',
        items: [
          {
            label: 'A',
            value: 'a'
          },
          {
            label: 'B',
            value: 'b'
          },
          {
            label: 'C',
            value: 'c'
          }]
      }
    ]
    component.update()

    expect(component.$$('su-select option').length).to.equal(4)
    expect(spyOnChange).callCount(0)

    component.$('su-select select').value = component.items[1].items[0].value
    component.$('su-select select').onchange()
    expect(component.$('su-select select').classList.contains('default')).to.equal(false)
    expect(spyOnChange).calledOnce

    expect(component.$('su-select').getAttribute('value')).to.equal('a')
    expect(component.$('su-select').getAttribute('label')).to.equal('A')
  })

  it('reset value', function () {
    expect(component.$('su-select').getAttribute('value')).to.equal(items[0].value)
    expect(component.$('su-select').getAttribute('changed')).to.be.null

    component.$('su-select select').value = items[1].value
    component.$('su-select select').onchange()

    expect(component.$('su-select').getAttribute('value')).to.equal(items[1].value)
    expect(component.$('su-select').getAttribute('changed')).to.equal('changed')

    // tag.reset()
    component.obs.trigger(`${component.$('su-select').id}-reset`)
    expect(component.$('su-select').getAttribute('value')).to.equal(items[0].value)
    expect(component.$('su-select').getAttribute('changed')).to.be.null
  })
})

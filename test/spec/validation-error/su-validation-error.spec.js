import * as riot from 'riot'
import { init } from '../../helpers/'
import TargetComponent from '../../../dist/tags/validation-error/su-validation-error.js'

describe('su-validation-error', function () {
  let element, component
  init(riot)

  const mount = option => {
    riot.register('su-validation-error', TargetComponent)
    element = document.createElement('su-validation-error')
    component = riot.mount(element, option)[0]
  }

  afterEach(function () {
    riot.unregister('su-validation-error')
  })

  it('is mounted', function () {
    mount()
    expect(component).to.be.ok
  })

  it('inline error', function () {
    mount({
      name: 'address',
      errors: {
        'address': ['The address field is required.']
      }
    })

    const errors = component.$$('su-validation-error .ui.pointing.prompt div')
    expect(component.$$('su-validation-error ul.list').length).to.equals(0)
    expect(errors.length).to.equal(1)
    expect(errors[0].innerText.trim()).to.equal('The address field is required.')
  })

  it('inline errors', function () {
    mount({
      name: 'address',
      errors: {
        'address': ['Error message1', 'Error message2']
      }
    })

    const errors = component.$$('su-validation-error .ui.pointing.prompt div')
    expect(component.$$('su-validation-error ul.list').length).to.equals(0)
    expect(errors.length).to.equal(2)
    expect(errors[0].innerText.trim()).to.equal('Error message1')
    expect(errors[1].innerText.trim()).to.equal('Error message2')
  })

  it('block errors', function () {
    mount({
      errors: {
        'address': ['Error message1', 'Error message2']
      }
    })

    expect(component.$$('su-validation-error ul.list').length).to.equals(1)
    expect(component.$$('su-validation-error .ui.pointing.prompt div').length).to.equal(0)

    expect(element.classList.contains('message')).to.equal(true)
    const errors = component.$$('su-validation-error li')
    expect(errors[0].innerText).to.equal('Error message1')
    expect(errors[1].innerText).to.equal('Error message2')
  })

  it('block none errors', function () {
    mount({
      errors: {}
    })

    expect(component.$$('su-validation-error .ui.pointing.prompt div').length).to.equal(0)
    expect(component.$$('su-validation-error ul.list').length).to.equals(0)
    expect(element.classList.contains('message')).to.equal(false)
  })

  it('block undefined errors', function () {
    mount()

    expect(component.$$('su-validation-error .ui.pointing.prompt div').length).to.equal(0)
    expect(component.$$('su-validation-error ul.list').length).to.equals(0)
    expect(element.classList.contains('message')).to.equal(false)
  })
})

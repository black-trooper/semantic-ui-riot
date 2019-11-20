import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import AccordionsetComponent from '../../../dist/tags/accordion/su-accordionset.js'
import AccordionComponent from '../../../dist/tags/accordion/su-accordion.js'

describe('su-accordionset-options', function () {
  let element, component
  init(riot)

  beforeEach(function () {
    element = document.createElement('app')
    riot.register('su-accordionset', AccordionsetComponent)
    riot.register('su-accordion', AccordionComponent)
  })

  const mount = code => {
    const AppComponent = compile(code)
    riot.register('app', AppComponent)
    component = riot.mount(element, {})[0]
  }

  afterEach(function () {
    riot.unregister('su-accordion')
    riot.unregister('su-accordionset')
    riot.unregister('app')
  })

  it('default active', function () {
    mount(`
      <app>
        <su-accordionset>
          <su-accordion title="Home">Home content</su-accordion>
          <su-accordion title="Message" active="true">Messages content</su-accordion>
        </su-accordionset>
      </app>`)


    expect(component.$$('su-accordion div.title')[0].classList.contains('active')).to.equal(false)
    expect(component.$$('su-accordion div.title')[1].classList.contains('active')).to.equal(true)
  })

  it('single accordion', function () {
    mount(`
      <app>
        <su-accordionset>
          <su-accordion title="Home">Home content</su-accordion>
        </su-accordionset>
      </app>`)


    expect(component.$$('su-accordion div.title')[0].classList.contains('active')).to.equal(true)
  })

  it('accordion menu', function () {
    mount(`
      <app>
        <su-accordionset class="vertical menu">
          <div class="item">
            <su-accordion title="Home">Home content</su-accordion>
          </div>
          <div class="item">
            <su-accordion title="Message">Messages content</su-accordion>
          </div>
        </su-accordionset>
      </app>`)

    expect(component.$$('su-accordion div.title')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-accordion div.title')[1].classList.contains('active')).to.equal(false)
  })
})

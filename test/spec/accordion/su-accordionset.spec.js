import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import AccordionsetComponent from '../../../dist/tags/accordion/su-accordionset.js'
import AccordionComponent from '../../../dist/tags/accordion/su-accordion.js'

describe('su-accordionset', function () {
  let element, component
  let spyOnClick
  init(riot)

  beforeEach(function () {
    spyOnClick = sinon.spy()
    element = document.createElement('app')
    riot.register('su-accordionset', AccordionsetComponent)
    riot.register('su-accordion', AccordionComponent)
    const AppComponent = compile(`
      <app>
        <su-accordionset onclick="{ props.onclick }">
          <su-accordion title="Home">Home content</su-accordion>
          <su-accordion title="Message">Messages content</su-accordion>
        </su-accordionset>
      </app>
    `)
    riot.register('app', AppComponent)
    component = riot.mount(element, {
      'onclick': spyOnClick
    })[0]
  })

  afterEach(function () {
    riot.unregister('su-accordion')
    riot.unregister('su-accordionset')
    riot.unregister('app')
  })

  it('is mounted', function () {
    expect(component).to.be.ok
  })

  it('click title', function () {
    expect(component.$$('su-accordion div.title')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-accordion div.title')[1].classList.contains('active')).to.equal(false)

    fireEvent(component.$$('su-accordion div.title')[1], 'click')
    expect(component.$$('su-accordion div.title')[0].classList.contains('active')).to.equal(false)
    expect(component.$$('su-accordion div.title')[1].classList.contains('active')).to.equal(true)
    expect(spyOnClick).to.have.been.calledOnce

    fireEvent(component.$$('su-accordion div.title')[0], 'click')
    expect(component.$$('su-accordion div.title')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-accordion div.title')[1].classList.contains('active')).to.equal(false)
    expect(spyOnClick).to.have.been.calledTwice

    fireEvent(component.$$('su-accordion div.title')[0], 'click')
    expect(component.$$('su-accordion div.title')[0].classList.contains('active')).to.equal(false)
    expect(component.$$('su-accordion div.title')[1].classList.contains('active')).to.equal(false)
    expect(spyOnClick).to.have.been.callCount(3)
  })
})

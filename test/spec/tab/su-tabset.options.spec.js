import * as riot from 'riot'
import { init, compile } from '../../helpers/'
import TabComponent from '../../../dist/tags/tab/su-tab.js'
import TabsetComponent from '../../../dist/tags/tab/su-tabset.js'
import TabHeaderComponent from '../../../dist/tags/tab/su-tab-header.js'
import TabTitleComponent from '../../../dist/tags/tab/su-tab-title.js'

describe('su-tabset-options', function () {
  let element, component
  let spyOnClick
  init(riot)

  beforeEach(function () {
    spyOnClick = sinon.spy()
    element = document.createElement('app')
    riot.register('su-tab-title', TabTitleComponent)
    riot.register('su-tab-header', TabHeaderComponent)
    riot.register('su-tabset', TabsetComponent)
    riot.register('su-tab', TabComponent)
    this.clock = sinon.useFakeTimers()
  })

  const mount = code => {
    const AppComponent = compile(code)
    riot.register('app', AppComponent)
    component = riot.mount(element, {
      onclick: spyOnClick
    })[0]
  }

  afterEach(function () {
    this.clock.restore()
    riot.unregister('su-tab-title')
    riot.unregister('su-tab-header')
    riot.unregister('su-tab')
    riot.unregister('su-tabset')
    riot.unregister('app')
  })

  it('su-tab has class', function () {
    mount(`
      <app>
        <su-tabset>
          <su-tab label="Home">Home content</su-tab>
          <su-tab label="Message" class="disabled">Messages content</su-tab>
        </su-tabset>
      </app>`)

    expect(component.$$('su-tab')[0].classList.contains('disabled')).to.equal(false)
    expect(component.$$('su-tab')[0].classList.contains('segment')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('disabled')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('segment')).to.equal(true)
  })

  it('no segment', function () {
    mount(`
      <app>
        <su-tabset class="no-segment">
          <su-tab label="Home">Home content</su-tab>
          <su-tab label="Messages">Messages content</su-tab>
        </su-tabset>
      </app>
    `)

    expect(component.$$('su-tab')[0].classList.contains('segment')).to.equal(false)
    expect(component.$$('su-tab')[1].classList.contains('segment')).to.equal(false)
  })

  it('top tabular', function () {
    mount(`
      <app>
        <su-tabset class="top tabular">
          <su-tab label="Home">Home content</su-tab>
          <su-tab label="Messages" class="disabled">Messages content</su-tab>
        </su-tabset>
      </app>
    `)

    expect(component.$$('su-tab')[0].classList.contains('tabular')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('bottom')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('tabular')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('bottom')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('top')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('tabular')).to.equal(true)
  })

  it('bottom tabular', function () {
    mount(`
      <app>
        <su-tabset class="bottom tabular">
          <su-tab label="Home">Home content</su-tab>
          <su-tab label="Messages">Messages content</su-tab>
        </su-tabset>
      </app>
    `)

    expect(component.$$('su-tab')[0].classList.contains('tabular')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('top')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('tabular')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('top')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('bottom')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('tabular')).to.equal(true)
  })

  it('top attached', function () {
    mount(`
      <app>
        <su-tabset class="top attached">
          <su-tab label="Home">Home content</su-tab>
          <su-tab label="Messages">Messages content</su-tab>
        </su-tabset>
      </app>
    `)

    expect(component.$$('su-tab')[0].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('bottom')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('bottom')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('top')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('attached')).to.equal(true)
  })

  it('bottom attached', function () {
    mount(`
      <app>
        <su-tabset class="bottom attached">
          <su-tab label="Home">Home content</su-tab>
          <su-tab label="Messages">Messages content</su-tab>
        </su-tabset>
      </app>
    `)

    expect(component.$$('su-tab')[0].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[0].classList.contains('top')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('attached')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('top')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('bottom')).to.equal(true)
    expect(component.$('su-tabset').classList.contains('attached')).to.equal(true)
  })

  it('tab-header', function () {
    mount(`
      <app>
        <su-tabset class="left tabular">
          <div class="ui grid">
            <div class="four wide column">
              <su-tab-header>
                <su-tab-title>Home</su-tab-title>
                <su-tab-title>Messages</su-tab-title>
                <su-tab-title>Friends</su-tab-title>
              </su-tab-header>
            </div>
            <div class="twelve wide stretched column">
              <su-tab>Home content</su-tab>
              <su-tab>Messages content</su-tab>
              <su-tab>Friends content</su-tab>
            </div>
          </div>
        </su-tabset>
      </app>`)

    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab-title a')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab-title a')[1].classList.contains('active')).to.equal(false)

    fireEvent(component.$$('a.item')[1], 'click')
    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab-title a')[0].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab-title a')[1].classList.contains('active')).to.equal(true)
  })

  it('default active', function () {
    mount(`
      <app>
        <su-tabset active="Messages">
          <su-tab label="Home">Home content</su-tab>
          <su-tab label="Messages">Messages content</su-tab>
        </su-tabset>
      </app>
    `)

    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(true)
  })

  it('default active is not match', function () {
    mount(`
      <app>
        <su-tabset active="Nothing">
          <su-tab label="Home">Home content</su-tab>
          <su-tab label="Messages">Messages content</su-tab>
        </su-tabset>
      </app>
    `)

    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(false)
  })

  it('single tab', function () {
    mount(`
      <app>
        <su-tabset>
          <su-tab label="Home">Home content</su-tab>
        </su-tabset>
      </app>
    `)
    expect(component.$('su-tab').classList.contains('segment')).to.equal(true)
    expect(component.$('su-tab').classList.contains('active')).to.equal(true)
  })

  it('single tab-header', function () {
    mount(`
      <app>
        <su-tabset class="right tabular">
          <div class="ui grid">
            <div class="four wide column">
              <su-tab-header>
                <su-tab-title>Home</su-tab-title>
              </su-tab-header>
            </div>
            <div class="twelve wide stretched column">
              <su-tab>Home content</su-tab>
            </div>
          </div>
        </su-tabset>
      </app>`)

    expect(component.$('su-tab').classList.contains('active')).to.equal(true)
    expect(component.$('su-tab-title a').classList.contains('active')).to.equal(true)
  })

  it("none tab", function () {
    mount(`
      <app>
        <su-tabset></su-tabset>
      </app>
    `)
    expect(component.$('su-tab')).to.be.undefined
    expect(component.$$('su-tab').length).to.equal(0)
  });

  it('lazy mount', function () {
    mount(`
      <app>
        <su-tabset lazy-mount="true">
          <su-tab label="Home">Home content</su-tab>
          <su-tab label="Messages">Messages content</su-tab>
        </su-tabset>
      </app>
    `)

    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab')[0].innerText).to.equal('Home content')
    expect(component.$$('su-tab')[1].innerText).to.equal('')

    fireEvent(component.$$('a.item')[1], 'click')
    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab')[0].innerText).to.equal('Home content')
    expect(component.$$('su-tab')[1].innerText).to.equal('Messages content')

    fireEvent(component.$$('a.item')[0], 'click')
    expect(component.$$('su-tab')[0].classList.contains('active')).to.equal(true)
    expect(component.$$('su-tab')[1].classList.contains('active')).to.equal(false)
    expect(component.$$('su-tab')[0].innerText).to.equal('Home content')
    expect(component.$$('su-tab')[1].innerText).to.equal('Messages content')
  })
})
const fireEvent = require('../../helpers').fireEvent

describe('su-tabset-options', function () {
  let tag
  let mount = group => {
    $('body').append(group)
    tag = riot.mount('su-tabset')[0]
  }

  afterEach(function () {
    tag.unmount()
  })

  it('su-tab has class', function () {
    mount(`
      <su-tabset>
        <su-tab title="Home" class="none">Home content</su-tab>
        <su-tab title="Message" class="none">Messages content</su-tab>
      </su-tabset>`)

    tag.tags['su-tab'][0].root.classList.contains('none').should.equal(true)
    tag.tags['su-tab'][0].root.classList.contains('segment').should.equal(false)
    tag.tags['su-tab'][1].root.classList.contains('none').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('segment').should.equal(false)
  })

  it('top tabular', function () {
    mount(`
      <su-tabset class="top tabular">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Message">Messages content</su-tab>
      </su-tabset>`)

    tag.tags['su-tab'][0].root.classList.contains('tabular').should.equal(true)
    tag.tags['su-tab'][0].root.classList.contains('attached').should.equal(true)
    tag.tags['su-tab'][0].root.classList.contains('bottom').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('tabular').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('attached').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('bottom').should.equal(true)
    $('.ui.menu').hasClass('top').should.equal(true)
  })

  it('bottom tabular', function () {
    mount(`
      <su-tabset class="bottom tabular">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Message">Messages content</su-tab>
      </su-tabset>`)

    tag.tags['su-tab'][0].root.classList.contains('tabular').should.equal(true)
    tag.tags['su-tab'][0].root.classList.contains('attached').should.equal(true)
    tag.tags['su-tab'][0].root.classList.contains('top').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('tabular').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('attached').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('top').should.equal(true)
    $('.ui.menu').hasClass('bottom').should.equal(true)
  })

  it('top attached', function () {
    mount(`
      <su-tabset class="top attached">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Message">Messages content</su-tab>
      </su-tabset>`)

    tag.tags['su-tab'][0].root.classList.contains('attached').should.equal(true)
    tag.tags['su-tab'][0].root.classList.contains('bottom').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('attached').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('bottom').should.equal(true)
    $('.ui.menu').hasClass('top').should.equal(true)
  })

  it('bottom attached', function () {
    mount(`
      <su-tabset class="bottom attached">
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Message">Messages content</su-tab>
      </su-tabset>`)

    tag.tags['su-tab'][0].root.classList.contains('attached').should.equal(true)
    tag.tags['su-tab'][0].root.classList.contains('top').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('attached').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('top').should.equal(true)
    $('.ui.menu').hasClass('bottom').should.equal(true)
  })

  it('tab-header', function () {
    mount(`
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
    </su-tabset>`)

    tag.tags['su-tab'][0].active.should.equal(true)
    tag.tags['su-tab'][1].active.should.equal(false)
    tag.tags['su-tab-header'].tags['su-tab-title'][0].active.should.equal(true)
    tag.tags['su-tab-header'].tags['su-tab-title'][1].active.should.equal(false)

    fireEvent($('a.item:eq(1)')[0], 'click')
    tag.tags['su-tab'][0].active.should.equal(false)
    tag.tags['su-tab'][1].active.should.equal(true)
    tag.tags['su-tab-header'].tags['su-tab-title'][0].active.should.equal(false)
    tag.tags['su-tab-header'].tags['su-tab-title'][1].active.should.equal(true)
  })


  it('single tab', function () {
    mount(`
      <su-tabset>
        <su-tab title="Home">Home content</su-tab>
        <su-tab title="Message" active="true">Messages content</su-tab>
      </su-tabset>`)

    tag.tags['su-tab'][0].active.should.equal(false)
    tag.tags['su-tab'][1].active.should.equal(true)
  })

  it('default active', function () {
    mount(`
      <su-tabset>
        <su-tab title="Home">Home content</su-tab>
      </su-tabset>`)

    tag.tags['su-tab'].root.classList.contains('segment').should.equal(true)
    tag.tags['su-tab'].active.should.equal(true)
  })
})

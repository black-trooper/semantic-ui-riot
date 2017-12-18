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
    tag.tags['su-tab'][0].root.classList.contains('bottom').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('tabular').should.equal(true)
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
    tag.tags['su-tab'][0].root.classList.contains('top').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('tabular').should.equal(true)
    tag.tags['su-tab'][1].root.classList.contains('top').should.equal(true)
    $('.ui.menu').hasClass('bottom').should.equal(true)
  })
})

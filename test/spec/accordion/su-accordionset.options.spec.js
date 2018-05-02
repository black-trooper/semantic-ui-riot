describe('su-accordionset-options', function () {
  let tag
  let mount = group => {
    $('body').append(group)
    tag = riot.mount('su-accordionset')[0]
  }

  afterEach(function () {
    tag.unmount()
  })

  it('su-accordion has class', function () {
    mount(`
      <su-accordionset>
        <su-accordion title="Home" class="none">Home content</su-accordion>
        <su-accordion title="Message" class="none">Messages content</su-accordion>
      </su-accordionset>`)

    tag.tags['su-accordion'][0].root.classList.contains('none').should.equal(true)
    tag.tags['su-accordion'][0].root.classList.contains('segment').should.equal(false)
    tag.tags['su-accordion'][1].root.classList.contains('none').should.equal(true)
    tag.tags['su-accordion'][1].root.classList.contains('segment').should.equal(false)
  })

  it('default active', function () {
    mount(`
      <su-accordionset>
        <su-accordion title="Home">Home content</su-accordion>
        <su-accordion title="Message" active="true">Messages content</su-accordion>
      </su-accordionset>`)

    tag.tags['su-accordion'][0].active.should.equal(false)
    tag.tags['su-accordion'][1].active.should.equal(true)
  })

  it('single accordion', function () {
    mount(`
      <su-accordionset>
        <su-accordion title="Home">Home content</su-accordion>
      </su-accordionset>`)

    tag.tags['su-accordion'].active.should.equal(true)
  })
})

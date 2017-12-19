describe('su-tab', function () {
  let tag

  beforeEach(function () {
    $('body').append('<su-tab>tab content</su-tab>')
    tag = riot.mount('su-tab', {
      class: 'orange'
    })[0]
  })

  afterEach(function () {
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('change active', function () {
    tag.active.should.equal(false)
    tag.root.innerHTML.should.equal('tab content')
    tag.root.classList.contains('active').should.equal(false)
    tag.root.classList.contains('orange').should.equal(true)

    tag.active = true
    tag.update()
    tag.active.should.equal(true)
    tag.root.classList.contains('active').should.equal(true)
  })
})

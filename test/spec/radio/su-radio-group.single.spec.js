describe('su-radio-group-single', function () {
  let tag

  beforeEach(function () {
    const group = $('<su-radio-group></su-radio-group>')
    group.append('<su-radio value="1">Radio choice1</su-radio>')
    $('body').append(group)
    tag = riot.mount('su-radio-group')[0]
  })

  afterEach(function () {
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('update value', function () {
    tag.tags['su-radio'].checked.should.equal(false)

    tag.value = '1'
    tag.update()
    tag.tags['su-radio'].checked.should.equal(true)

    tag.value = '2'
    tag.update()
    tag.tags['su-radio'].checked.should.equal(false)
  })

  it('update option', function () {
    tag.tags['su-radio'].checked.should.equal(false)

    tag.opts.riotValue = '1'
    tag.update()
    tag.tags['su-radio'].checked.should.equal(true)

    tag.opts.riotValue = '2'
    tag.update()
    tag.tags['su-radio'].checked.should.equal(false)
  })
})

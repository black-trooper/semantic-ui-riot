describe('su-radio-group-undefined', function () {
  let tag

  beforeEach(function () {
    const group = $('<su-radio-group value="1"></su-radio-group')
    group.append('<su-radio>Radio choice1</su-radio>')
      .append('<su-radio>Radio choice2</su-radio>')
    $('body').append(group)
    tag = riot.mount('su-radio-group')[0]
  })

  afterEach(function () {
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })
})

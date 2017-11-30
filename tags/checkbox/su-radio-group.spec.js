const fireEvent = require("../../test/helpers").fireEvent

describe('su-radio-group', function () {
  let tag
  let spyOnClick = sinon.spy()

  beforeEach(function () {
    const group = $('<su-radio-group></su-radio-group')
    group.append('<su-radio value="1">Radio choice1</su-radio>')
      .append('<su-radio value="2">Radio choice2</su-radio>')
    $('body').append(group)
    tag = riot.mount('su-radio-group')[0]
    tag.on('click', spyOnClick)
  })

  afterEach(function () {
    spyOnClick.reset()
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('update value', function () {
    tag.tags['su-radio'][0].checked.should.equal(false)
    tag.tags['su-radio'][1].checked.should.equal(false)

    tag.value = '1'
    tag.update()
    tag.tags['su-radio'][0].checked.should.equal(true)
    tag.tags['su-radio'][1].checked.should.equal(false)

    tag.value = '2'
    tag.update()
    tag.tags['su-radio'][0].checked.should.equal(false)
    tag.tags['su-radio'][1].checked.should.equal(true)
  })

  it('update option', function () {
    tag.tags['su-radio'][0].checked.should.equal(false)
    tag.tags['su-radio'][1].checked.should.equal(false)

    tag.opts.riotValue = '1'
    tag.update()
    tag.tags['su-radio'][0].checked.should.equal(true)
    tag.tags['su-radio'][1].checked.should.equal(false)

    tag.opts.riotValue = '2'
    tag.update()
    tag.tags['su-radio'][0].checked.should.equal(false)
    tag.tags['su-radio'][1].checked.should.equal(true)
  })
})

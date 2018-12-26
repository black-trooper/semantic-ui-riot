require('../../../dist/tags/validation-error/su-validation-error.js')

describe('su-validation-error', function () {
  let tag
  const mount = option => {
    tag = riot.mount('su-validation-error', option)[0]
  }

  beforeEach(function () {
    $('body').append(`
      <su-validation-error></su-validation-error>
    `)
  })

  afterEach(function () {
    tag.unmount()
  })

  it('is mounted', function () {
    mount()
    tag.isMounted.should.be.true
  })

  it('inline error', function () {
    mount({
      name: 'address',
      errors: {
        'address': ['The address field is required.']
      }
    })
    const $error = $('su-validation-error .ui.pointing.prompt')
    $('su-validation-error ul.list').length.should.equals(0)
    $error.length.should.equal(1)
    $error.text().trim().should.equal('The address field is required.')
  })

  it('inline errors', function () {
    mount({
      name: 'address',
      errors: {
        'address': ['Error message1', 'Error message2']
      }
    })
    const $error = $('su-validation-error .ui.pointing.prompt div')
    $('su-validation-error ul.list').length.should.equals(0)
    $error.length.should.equal(2)
    $($error[0]).text().should.equal('Error message1')
    $($error[1]).text().should.equal('Error message2')
  })

  it('block errors', function () {
    mount({
      errors: {
        'address': ['Error message1', 'Error message2']
      }
    })
    $('su-validation-error .ui.pointing.prompt div').length.should.equals(0)
    $('su-validation-error ul.list').length.should.equals(1)
    $('su-validation-error').hasClass('message').should.equal(true)
    const $error = $('su-validation-error li')
    $($error[0]).text().should.equal('Error message1')
    $($error[1]).text().should.equal('Error message2')
  })

  it('block none errors', function () {
    mount({
      errors: {}
    })
    $('su-validation-error .ui.pointing.prompt div').length.should.equals(0)
    $('su-validation-error ul.list').length.should.equals(0)
    $('su-validation-error').hasClass('message').should.equal(false)
  })

  it('block undefined errors', function () {
    mount()
    $('su-validation-error .ui.pointing.prompt div').length.should.equals(0)
    $('su-validation-error ul.list').length.should.equals(0)
    $('su-validation-error').hasClass('message').should.equal(false)
  })
})

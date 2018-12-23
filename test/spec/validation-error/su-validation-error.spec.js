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
    const $error = $('su-validation-error .ui.pointing.prompt');
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
    const $error = $('su-validation-error .ui.pointing.prompt div');
    $error.length.should.equal(2)
    $($error[0]).text().should.equal('Error message1')
    $($error[1]).text().should.equal('Error message2')
  })

})

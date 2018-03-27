describe('su-dropdown-multiple-option', function () {
  let tag

  let items = [
    {
      label: 'Skills',
      value: null,
      default: true
    },
    { value: 'angular', label: 'Angular' },
    { value: 'css', label: 'CSS' },
    { value: 'design', label: 'Graphic Design' },
    { value: 'ember', label: 'Ember' },
    { value: 'html', label: 'HTML' },
    { value: 'ia', label: 'Information Architecture' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'mech', label: 'Mechanical Engineering' },
    { value: 'meteor', label: 'Meteor' },
    { value: 'node', label: 'NodeJS' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'python', label: 'Python' },
    { value: 'rails', label: 'Rails' },
    { value: 'react', label: 'React' },
    { value: 'repair', label: 'Kitchen Repair' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'ui', label: 'UI Design' },
    { value: 'ux', label: 'User Experience' }
  ]

  const mount = html => {
    $('body').append(html)
    tag = riot.mount('su-dropdown', {
      items
    })[0]
  }

  afterEach(function () {
    tag.unmount()
  })

  it('default value', function () {
    mount('<su-dropdown multiple="true" value="angular"></su-dropdown>')
    $('su-dropdown > .label').length.should.equal(1)
    $('su-dropdown > .label:first').text().trim().should.equal(items[1].label)
  })

  it('default values', function () {
    mount('<su-dropdown multiple="true" value="[angular,css]"></su-dropdown>')
    $('su-dropdown > .label').length.should.equal(2)
    $('su-dropdown > .label:first').text().trim().should.equal(items[1].label)
    $('su-dropdown > .label:eq(1)').text().trim().should.equal(items[2].label)
  })

  it('default riotValue', function () {
    mount('<su-dropdown multiple="true" value="{\'angular\'}"></su-dropdown>')
    $('su-dropdown > .label').length.should.equal(1)
    $('su-dropdown > .label:first').text().trim().should.equal(items[1].label)
  })

  it('default riotValues', function () {
    mount('<su-dropdown multiple="true" value="{[\'angular\', \'css\']}"></su-dropdown>')
    $('su-dropdown > .label').length.should.equal(2)
    $('su-dropdown > .label:first').text().trim().should.equal(items[1].label)
    $('su-dropdown > .label:eq(1)').text().trim().should.equal(items[2].label)
  })
})

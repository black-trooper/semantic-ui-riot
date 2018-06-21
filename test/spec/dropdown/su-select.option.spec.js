describe('su-select', function () {
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
    tag = riot.mount('su-select', {
      items
    })[0]
  }

  afterEach(function () {
    tag.unmount()
  })

  it('default value', function () {
    mount('<su-select value="angular"></su-select>')
    tag.value.should.deep.equal('angular')
    tag.label.should.deep.equal('Angular')
  })

  it('default riotValue', function () {
    mount('<su-select value="{\'angular\'}"></su-select>')
    tag.value.should.deep.equal('angular')
    tag.label.should.deep.equal('Angular')
  })
})

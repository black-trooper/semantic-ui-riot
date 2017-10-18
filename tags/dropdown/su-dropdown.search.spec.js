describe('su-dropdown-search', function () {
  let tag, select
  let spyOnOpen = sinon.spy()
  let spyOnClose = sinon.spy()
  let spyOnSearch = sinon.spy()

  let items = [
    {
      label: 'State',
      value: null,
      default: true
    },
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ]

  let fireEvent = function (el, name) {
    var e = document.createEvent('HTMLEvents')
    e.initEvent(name, false, true)
    el.dispatchEvent(e)
  }

  beforeEach(function () {
    $('body').append('<su-dropdown search="true" tabindex="1"></su-dropdown>')
    tag = riot.mount('su-dropdown', {
      items
    })[0]
    tag.on('open', spyOnOpen)
      .on('close', spyOnClose)
      .on('search', spyOnSearch)
  })

  afterEach(function () {
    spyOnOpen.reset()
    spyOnClose.reset()
    spyOnSearch.reset()
    tag.unmount()
  })

  it('is mounted', function () {
    tag.isMounted.should.be.true
  })

  it('text input is exist', function () {
    should.exist($('su-dropdown .search'))
  })

  it('opens the menu on focus', function () {
    $('su-dropdown .menu').is(':visible').should.equal(false)
    $('su-dropdown .search').focus()
    $('su-dropdown .menu').is(':visible').should.equal(true)
  })

  it('adding text to box filters the options list', function () {
    $('su-dropdown .menu').is(':visible').should.equal(false)
    $('su-dropdown .search').focus()
    spyOnSearch.should.have.been.calledOnce
    $('su-dropdown .menu').is(':visible').should.equal(true)
    $('su-dropdown .item').length.should.equal(52)
    spyOnOpen.should.have.been.calledOnce
    $('su-dropdown .search').val('m')
    fireEvent($('su-dropdown .search')[0], 'input')
    spyOnSearch.should.have.been.calledTwice
    $('su-dropdown .item').length.should.equal(15)
  })
})

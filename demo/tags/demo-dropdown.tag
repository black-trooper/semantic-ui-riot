<demo-dropdown>
  <h1 class="ui header">
    Dropdown
    <div class="sub header">A dropdown allows a user to select a value from a series of options</div>
  </h1>

  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <h3 class="ui header">Dropdown</h3>
  <p>A dropdown</p>
  <div class="ui segment secondary top attached">
    Example
  </div>
  <div class="ui segment attached">
    <su-dropdown items="{ dropdownItems }" placeholder="Gender"></su-dropdown>
  </div>
  <div class="ui segment bottom attached inverted">
    <pre><code class="prettyprint"></code></pre>
  </div>

  <script>
    this.results = []

    this.dropdownItems = [
      {
        label: 'Gender',
        value: null,
        default: true
      },
      {
        label: 'Male',
        value: 1
      },
      {
        label: 'Female',
        value: 0
      },
    ]

    this.checkboxClick = () => {
      this.results.push('checkbox2 clicked')
      this.update()
    }

    this.radio1 = 1
    this.radioClick = val => {
      this.radio1 = val
      this.update()
    }
  </script>
</demo-dropdown>
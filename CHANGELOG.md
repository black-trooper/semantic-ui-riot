# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

##  [2.5.3] - 2023-07-19

### Fixed
- Fixed an issue where setting a class on su-tab did not apply the su-tabset class.

##  [2.5.2] - 2023-05-25

### Changed
- Changed the restriction on the date format for the input field in su-datepicker to be more lenient.

### Fixed
- Fixed an issue where the specified format in su-datepicker was not being applied

##  [2.5.1] - 2023-05-16

### Fixed

- Fixed an issue in su-table where setting the default-sort-field option did not result in initial sorting.

##  [2.5.0] - 2023-05-11

### Changed

- BREAKING CHANGE: Restricted the value attribute in su-datepicker to the ISO date format.

### Fixed

- Fixed an issue in su-datepicker where the year and month could not be switched when a value was selected.
- Fixed a typo in su-datepicker. It should be "formatted-value".

##  [2.4.2] - 2023-05-01

### Fixed

- Fixed an issue in su-modal where the icon was not displayed correctly in modeless mode
- Fixed an issue in su-pagination where there was a problem with the initial display
- Fixed an issue in su-popup where the popup was not displayed

##  [2.4.1] - 2023-04-11

### Added

- Added ability to specify class for su-tab-header

### Fixed

- Fixed layout issue in su-datepicker

##  [2.4.0] - 2022-11-15

### Added

- Support data-popup attribute on su-datepicker

##  [2.3.0] - 2022-05-24

### Added

- Add modeless option to su-modal
- Add search key conversion option to su-dropdown
- Add search key to su-dropdon items
- Add datetime option to su-datepicker

### Fixed

- Fix the problem when during IME input

## [2.2.4] - 2020-07-20

### Fixed

- Fix the problem where the change of input field value is not reflected
- Fix the problem where the event did not fire when deleted with the dropdown of multiple options

## [2.2.3] - 2020-07-12

### Fixed

- Fix the probrem when grouped checkbox
- Fix the probrem when grouped radio

## [2.2.2] - 2020-04-17

### Fixed

- Fix the probrem when nested accordions

## [2.2.1] - 2020-03-29

### Changed

- Support riot 4.11.0

## [2.1.3] - 2020-03-25

### Fixed

- Update dependencies

## [2.1.2] - 2020-03-22

### Fixed

- Add missing import

## [2.1.1] - 2020-03-22

### Fixed

- Fix the problem that the callback function is not called
- Move riot and riot-observable from dependencies to peerDependencies

## [2.1.0] - 2019-11-29

### Changed

- BREAKING CHANGE: Use show attribute instead of observable when displaying modal

## [2.0.1] - 2019-11-20

### Changed

- BREAKING CHANGE: Support Riot v4

## [1.0.0] - 2019-11-18

### Added

- Add su-loading

## [0.24.1] - 2019-10-17

### Fixed

- Add support for riotValue in su-checkbox-group and su-radio-group

## [0.24.0] - 2019-08-22

### Added

- Add support scrolling modal

## [0.23.5] - 2019-08-21

### Added

- Add support for riotValue in su-checkbox-group and su-radio-group

## [0.23.4] - 2019-08-21

### Fixed

- Fix problem when su-checkbox is missing in su-checkbox-group
- Fix problem when su-radio is missing in su-radio-group

## [0.23.0] - 2019-05-08

### Added

- Add disabled item option to su-dropdown

## [0.22.2] - 2019-04-16

### Fixed

- Fix the problem that the event does not fire even if the button is clicked

## [0.22.1] - 2019-03-24

### Fixed

- Fix the problem what the divider is not displayed in su-dropdown
- Fix the problem what the label is not displayed initially in su-dropdown

## [0.22.0] - 2019-03-19

### Changed

- Add animation to su-popup
- Refactor

### Fixed

- Fix the problem where the initial value is not displayed to the input field

## [0.21.1] - 2019-02-22

### Fixed

- Fix the probrem where empty tabset

## [0.21.0] - 2018-12-30

### Added

- Add su-validation-error

### Fixed

- Fix the problem where options are not filter when searching

## [0.20.1] - 2018-12-12

### Fixed

- Fix upward position in su-dropdown
- Fix upward position in su-datepicker

## [0.20.0] - 2018-12-10

### Added

- Add direction attribute to su-dropdown
- Add direction attribute to su-datepicker

### Changed

- Change the title attribute of su-tab from 'title' to 'label'

### Fixed

- Fix the problem where value of input field is not update when value is changed

## [0.19.7] - 2018-11-30

### Added

- Add type attribute to button

## [0.19.5] - 2018-11-29

### Fixed

- Improve to display close icon when modal become full screen

## [0.19.4] - 2018-11-25

### Added

- Add callback to su-alert

## [0.19.3] - 2018-11-15

### Fixed

- Fix the problem when su-th is not plural

## [0.19.2] - 2018-11-15

### Fixed

- Fix the problem where incorrect order when update data

## [0.19.1] - 2018-11-14

### Fixed

- Add default sort reverse option to su-table

## [0.19.0] - 2018-11-14

### Added

- Add su-table

## [0.18.3] - 2018-11-09

### Fixed

- Fix the problem when total-pages less than 1

## [0.18.2] - 2018-11-06

### Added

- Add progress option to su-toast

## [0.18.1] - 2018-10-28

### Fixed

- Fix active-page option of su-pagination

## [0.18.0] - 2018-10-26

### Changed

- Change attribute name of su-pagination

## [0.17.0] - 2018-10-25

### Added

- Add su-pagination

### Fixed

- Fix overflow scrolling of su-alert
- Fix overflow scrolling of su-confirm

## [0.15.0] - 2018-10-15

### Added

- Add year first option to su-datepicker
- Add year range option to su-datepicker

### Fixed

- Fix current-date option of su-datepicker

## [0.14.1] - 2018-10-05

### Fixed

- Improve active option in su-tab

## [0.14.0] - 2018-09-24

### Changed

- Improved to use dateFns without global variables

## [0.13.1] - 2018-09-22

### Fixed

- Fix the problem where modal is always displayed when 'class={ undefined }'

## [0.13.0] - 2018-09-17

### Added

- Support valueAsDate in su-datepicker

## [0.12.1] - 2018-09-15

### Fixed

- Fix the problem where the click event does not fire when riot 3.10.1

## [0.12.0] - 2018-09-13

### Added

- Add su-progress

## [0.11.2] - 2018-09-11

### Changed

- Update semantic-ui to 2.3.3

### Fixed

- Remove console log

## [0.11.1] - 2018-09-05

### Changed

- Add animation to su-toast

## [0.11.0] - 2018-09-04

### Added

- Add su-toast

## [0.10.1] - 2018-08-29

### Fixed

- Fix active option to su-tabset

## [0.10.0] - 2018-08-28

### Added

- Add su-progress

### Changed

- Add active option to su-tabset
- Add no-segment option to su-tabset

## [0.9.1] - 2018-08-13

### Fixed

- Fix the parse of value in su-checkbox-group

## [0.9.0] - 2018-08-13

### Fixed

- Add su-checkbox-group

## [0.8.0] - 2018-08-28

### Added

- Add su-rating

[2.5.3]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.5.2...v2.5.3
[2.5.2]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.5.1...v2.5.2
[2.5.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.5.0...v2.5.1
[2.5.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.4.2...v2.5.0
[2.4.2]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.4.1...v2.4.2
[2.4.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.4.0...v2.4.1
[2.4.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.2.4...v2.3.0
[2.2.4]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.2.3...v2.2.4
[2.2.3]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.2.2...v2.2.3
[2.2.2]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.1.3...v2.2.1
[2.1.3]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.1.2...v2.1.3
[2.1.2]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v1.0.0...v2.0.1
[1.0.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.24.1...v1.0.0
[0.24.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.24.0...v0.24.1
[0.24.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.23.5...v0.24.0
[0.23.5]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.23.4...v0.23.5
[0.23.4]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.23.0...v0.23.4
[0.23.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.22.2...v0.23.0
[0.22.2]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.22.1...v0.22.2
[0.22.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.22.0...v0.22.1
[0.22.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.21.1...v0.22.0
[0.21.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.21.0...v0.21.1
[0.21.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.20.1...v0.21.0
[0.20.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.20.0...v0.20.1
[0.20.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.19.7...v0.20.0
[0.19.7]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.19.5...v0.19.7
[0.19.5]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.19.4...v0.19.5
[0.19.4]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.19.3...v0.19.4
[0.19.3]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.19.2...v0.19.3
[0.19.2]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.19.1...v0.19.2
[0.19.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.19.0...v0.19.1
[0.19.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.18.3...v0.19.0
[0.18.3]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.18.2...v0.18.3
[0.18.2]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.18.1...v0.18.2
[0.18.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.18.0...v0.18.1
[0.18.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.17.0...v0.18.0
[0.17.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.15.0...v0.17.0
[0.15.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.14.1...v0.15.0
[0.14.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.14.0...v0.14.1
[0.14.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.13.1...v0.14.0
[0.13.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.13.0...v0.13.1
[0.13.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.12.1...v0.13.0
[0.12.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.12.0...v0.12.1
[0.12.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.11.2...v0.12.0
[0.11.2]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.11.1...v0.11.2
[0.11.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.9.1...v0.10.0
[0.9.1]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/black-trooper/semantic-ui-riot/compare/v0.7.10...v0.8.0

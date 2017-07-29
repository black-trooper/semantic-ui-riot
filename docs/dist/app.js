riot.tag2('app', '<div class="ui inverted vertical left fixed menu"> <div class="item"><strong>Semantic UI Riot</strong></div> <div class="item"> <div class="header">Module</div> <div class="menu"> <a class="item" href="#demo-checkbox">Checkbox</a> <a class="item" href="#demo-dropdown">Dropdown</a> <a class="item" href="#demo-modal">Modal</a> </div> </div> </div> <div style="margin-left:15.5rem"> <div class="ui padded one column grid"> <div class="column"> <content></content> </div> </div> </div>', '', '', function(opts) {
'use strict';

route('', function () {
  riot.mount('content', 'root');
});

route(function (collection) {
  riot.mount('content', collection);
});

route.start(true);
});
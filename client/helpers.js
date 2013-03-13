// Madewith acts as a namespace for helper functions
if (typeof Madewith === 'undefined')
  Madewith = {};

Madewith.animateToSelectedApp = function() {
  // Need to flush first since positions may have changed or new elements added
  Deps.flush();

  var app_name = MadewithSession.getSelectedNormalizedAppName();
  if (app_name) {
    var app_div = $('#app_' + app_name.replace(/\./g, '_'));
    if (app_div.length > 0) {
      $('body').animate({scrollTop: app_div.position().top}, 1000);
    } else {
      Router.setSelectedAppName(null);
    }
  }
};


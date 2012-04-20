// Madewith acts as a namespace for helper functions
if (typeof Madewith === 'undefined')
  Madewith = {};

// Madewith.removeUrlProtocol('http://foo.com') === 'foo.com'
// Madewith.removeUrlProtocol('bar.com') === 'bar.com'
Madewith.removeUrlProtocol = function(url) {
  var match = url.match('https?://(.*)$');
  if (match)
    return match[1];
  else
    return url;
};

Madewith.shortAppName = function(app_name_or_domain) {
  var match = app_name_or_domain.match(/(.*)\.meteor.com$/);
  var shortname = match ? match[1] : app_name_or_domain;
  return shortname;
};

Madewith.normalizedAppName = function(app_name) {
  if (app_name.indexOf('.') === -1)
    app_name += '.meteor.com';
  return app_name.replace(/\./g, '_');
};

Madewith.animateToSelectedApp = function() {
  // Need to flush first since positions may have changed or new elements added
  Meteor.flush();

  var app_name = Session.get('selected_app_name');
  if (app_name) {
    var app_div = $('#app_' + Madewith.normalizedAppName(app_name));
    if (app_div.length > 0) {
      $('body').animate({scrollTop: app_div.position().top}, 1000);
    } else {
      Router.setSelectedAppName(null);
    }
  }
};


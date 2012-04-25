/**
 * Sample URLs (the madewith package refers to these):
 *
 * http://madewith.meteor.com/
 *   Load with no app selected
 *
 * http://madewith.meteor.com/foobar.com
 *   Load with the app registered on foobar.com selected
 *
 * http://madewith.meteor.com/foobar
 *   Load with the app registered on foobar.meteor.com selected
 *
 * http://madewith.meteor.com/foo.to.meteor.com (notably *not*
 *     http://madewith.meteor.com/foo.to, since that would refer to a site
 *     deployed at http://foo.to)
 *   Load with the app registered on foo.to.meteor.com selected
 *
 * http://madewith.meteor.com/foobar.meteor.com
 *   Redirect to http://madewith.meteor.com/foobar, which selects foobar.meteor.com
 */
MadewithRouter = Backbone.Router.extend({
  routes: {
    "": "default",
    ":selectedAppName": "default"
  },
  default: function(selectedAppName) {
    if (!selectedAppName)
      MadewithSession.setSelectedAppName(null);
    else if (Madewith.displayAppName(selectedAppName) !== selectedAppName)
      // Make sure we are using the proper canonical url
      this.setSelectedAppName(selectedAppName);
    else
      MadewithSession.setSelectedAppName(selectedAppName);
  },
  setSelectedAppName: function(appName) {
    this.navigate(appName ? Madewith.displayAppName(appName) : '', true);
  }
});

Router = new MadewithRouter();


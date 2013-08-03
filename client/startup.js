// Subscribe to the necessary documents:
// - List of all apps
// - Comments for selected app
Meteor.startup(function () {
  MadewithSession.setOrder('recent');

  Meteor.subscribe("allApps", function() {
    // After we get back the list of apps, we can try to find the appropriate div
    // to scroll to.
    Madewith.animateToSelectedApp();
  });

  // Subscribe to comments on the selected app, if one is selected
  Deps.autorun(function () {
    var app_name = MadewithSession.getSelectedNormalizedAppName();

    if (app_name) {
      var app = Apps.findOne({name: app_name});

      if (app)
        Meteor.subscribe('comments', app._id);
    }
  });
});

Meteor.startup(function() {
  Backbone.history.start({pushState: true});
});


// Disable default mutator methods. Instead clients must use explicit methods as defined
// in methods.js.
Meteor.startup(function() {
  _.each(['madewith_apps', 'madewith_comments'], function(collection) {
    _.each(['insert', 'update', 'remove'], function(method) {
      Meteor.default_server.method_handlers['/' + collection + '/' + method] = function() {};
    });
  });
});

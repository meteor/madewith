MadewithRouter = Backbone.Router.extend({
  routes: {
    "": "popular",
    ":selected_app_name": "popular"
  },
  popular: function(selected_app_name) {
    Session.set('selected_app_name', selected_app_name);
  },
  setSelectedAppName: function(app_name) {
    this.navigate(app_name ? app_name : '', true);
  }
});

Router = new MadewithRouter();


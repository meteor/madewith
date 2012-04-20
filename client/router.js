MadewithRouter = Backbone.Router.extend({
  routes: {
    "": "popular",
    "recent": "recent",
    ":selected_app_name": "popular",
    "recent/:selected_app_name": "recent"
  },
  popular: function(selected_app_name) {
    Session.set('order', 'popular');
    Session.set('selected_app_name', selected_app_name);
  },
  recent: function(selected_app_name) {
    Session.set('order', 'recent');
    Session.set('selected_app_name', selected_app_name);
  },
  setOrderAndSelectedAppName: function(order, app_name) {
    switch (order) {
    case 'popular':
      this.navigate(app_name ? app_name : '', true);
      break;

    case 'recent':
      this.navigate(app_name ? 'recent/' + app_name : 'recent', true);
      break;

    default:
      throw new Error("unexpected order: " + order);
    }
  },
  setOrder: function(order) {
    this.setOrderAndSelectedAppName(order, Session.get('selected_app_name'));
  },
  setSelectedAppName: function(app_name) {
    this.setOrderAndSelectedAppName(Session.get('order'), app_name);
  }
});

Router = new MadewithRouter();


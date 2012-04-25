/**
 * Helpers for access the app's session. Ensures the values adhere to the proper
 * normalization schemes. This file also acts as a description of the fields and
 * structure of the session.
 *
 * Using MadewithSession.get/set checks that you are not updating the wrong keys
 *
 * Session fields:
 *   selectedAppName {String}: The FQDN for an app (see Madewith.normalizeAppName)
 *   order {String}: Either 'popular' or 'recent'
 *   draft {Boolean}: Is a draft app form being displayed?
 *   lastAddedAppName {String}: The app name that was just added, or null otherwise;
 *       Used to display the badge adding instructions
 */

MadewithSession = {
  KEYS: ['order', 'selectedAppName', 'draft', 'lastAddedAppName'],
  KEYS_WITH_EXPLICIT_ACCESSORS: ['order', 'app_name'],

  get: function(key) {
    if (_.include(MadewithSession.KEYS_WITH_EXPLICIT_ACCESSORS, key))
      throw new Error("Please use an explicit getter method");
    else if (_.include(MadewithSession.KEYS, key))
      return Session.get(key);
    else
      throw new Error("Unexpected session key: " + key);
  },

  set: function(key, value) {
    if (_.include(MadewithSession.KEYS_WITH_EXPLICIT_ACCESSORS, key))
      throw new Error("Please use an explicit setter method");
    else if (_.include(MadewithSession.KEYS, key))
      Session.set(key, value);
    else
      throw new Error("Unexpected session key: " + key);
  },

  equals: function(key, value) {
    if (_.include(MadewithSession.KEYS, key))
      return Session.equals(key, value);
    else
      throw new Error("Unexpected session key: " + key);
  },

  setSelectedAppName: function(appNameOrDomain) {
    if (appNameOrDomain)
      Session.set('selectedAppName', Madewith.normalizeAppName(appNameOrDomain));
    else
      Session.set('selectedAppName', null);
  },

  // e.g. "foo.meteor.com" or "bar.com"; stored in DB and in the id of the app div
  getSelectedNormalizedAppName: function() {
    return Session.get('selectedAppName');
  },

  // e.g. "foo" or "bar.com"; used in URL
  getSelectedDisplayAppName: function() {
    return Madewith.displayAppName(MadewithSession.getSelectedNormalizedAppName());
  },

  setOrder: function(order) {
    if (_.include(['popular', 'recent'], order))
      Session.set('order', order);
    else
      throw new Error("Unexpected order: " + order);
  },

  getOrder: function() {
    return Session.get('order');
  }
};

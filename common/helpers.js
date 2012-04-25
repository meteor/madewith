// Madewith acts as a namespace for helper functions
if (typeof Madewith === 'undefined')
  Madewith = {};

Madewith.commentsForApp = function(app) {
  return Comments.find({app_id: app._id}, {sort: {when: -1}});
};

// canonicalize a URL or bare hostname into a FQDN
Madewith.normalizeAppName = function (name) {
  var match = name.match('(.*://)?([a-zA-Z0-9\._\-]+)/?.*$');
  var host = match && match[2];

  if (!host)
    return null;
  else
    // append '.meteor.com' if it's a bare hostname
    return host.match(/\./) ? host : host + '.meteor.com';
};

// Madewith.removeUrlProtocol('http://foo.com') === 'foo.com'
// Madewith.removeUrlProtocol('bar.com') === 'bar.com'
Madewith.removeUrlProtocol = function(url) {
  var match = url.match('https?://(.*)$');
  if (match)
    return match[1];
  else
    return url;
};

// Returns the name to be used in the URL for this app (see client/router.js)
//
// This code is duplicated in the madewith smartpackage (see #DisplayAppName)
// XXX - Can this code somehow be shared reasonably?
Madewith.displayAppName = function (name) {
  var parts = name.split('.');
  if (parts.length === 3 && parts[1] === 'meteor' && parts[2] === 'com')
    return parts[0];
  else
    return name;
};

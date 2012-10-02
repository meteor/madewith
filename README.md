# MadeWith: A gallery of Meteor apps

## Interesting bits of code

### Disabling default mutator methods (from [server/startup.js](https://github.com/meteor/madewith/blob/master/server/startup.js))

```javascript
Meteor.startup(function() {
  _.each(['madewith_apps', 'madewith_comments'], function(collection) {
    _.each(['insert', 'update', 'remove'], function(method) {
      Meteor.default_server.method_handlers['/' + collection + '/' + method] = function() {};
    });
  });
});
```

### Defining explicit mutator methods, with some sort of security for upvoting (from [common/methods.js](https://github.com/meteor/madewith/blob/avital/common/methods.js))

```javascript
Meteor.methods({
  // ...

  vote: function(hostname) {
    // if the app doesn't already have a vote in this minute,
    // increment vote_count and mark this minute in the votes array.

    // minutes since epoch
    var vote_ts = Math.floor((new Date()).getTime() / 1000 / 60);

    if (Meteor.isClient) {
      Apps.update({name: hostname},
                  {$inc: {vote_count: 1}, $addToSet: {votes: vote_ts}});
    } else {
      Apps.update({name: hostname, votes: {$ne: vote_ts}},
                  {$inc: {vote_count: 1}, $addToSet: {votes: vote_ts}});
    }
  },

  // ...
});
```

### Restricting the fields sent down to the client (from [common/data_model.js](https://github.com/meteor/madewith/blob/avital/common/data_model.js))

```javascript
if (Meteor.isServer) {
  Meteor.publish("allApps", function() {
    return Apps.find({}, {fields: {pw_sha: 0, votes: 0}});
  });

  // ...
}
```

### Calling Meteor methods from outside the app (from the [madewith badge smartpackage](https://github.com/meteor/meteor/blob/master/packages/madewith/madewith.js))

```javascript
Template.madewith.events({
  'click .madewith_upvote': function(event) {
    var app = apps.findOne();
    if (app) {
      server.call('vote', hostname);
      // ...
    }
  }
});
```

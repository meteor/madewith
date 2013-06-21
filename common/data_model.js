Apps = new Meteor.Collection("madewith_apps");
Comments = new Meteor.Collection("madewith_comments");

if (Meteor.isServer) {
  Meteor.publish("allApps", function() {
    return Apps.find({}, {fields: {pw_sha: 0, votes: 0}});
  });

  Meteor.publish("myApp", function(app_name) {
    check(app_name, String);
    return Apps.find({name: app_name},
                     {fields: {pw_sha: 0, votes: 0}});
  });

  Meteor.publish("comments", function (app_id) {
    check(app_id, String);
    return Comments.find({app_id: app_id});
  });
}


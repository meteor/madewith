Apps = new Meteor.Collection("madewith_apps");
Comments = new Meteor.Collection("madewith_comments");

if (Meteor.is_server) {
  Meteor.publish("allApps", function() {
    return Apps.find({}, {fields: {pw_sha: 0, votes: 0}});
  });

  Meteor.publish("myApp", function(app_name) {
    return Apps.find({name: app_name},
                     {fields: {pw_sha: 0, votes: 0}});
  });

  Meteor.publish("comments", function (app_id) {
    return Comments.find({app_id: app_id});
  });
}


Meteor.methods({
  createApp: function(app) {
    check(app, {
      name: String,
      description: String,
      github_url: String,
      pw_salt: String,
      pw_sha: String
    });

    // normalize on FQDN
    var name = Madewith.normalizeAppName(app.name);

    _.extend(app, {
      name: name,
      when: (new Date()).getTime(),
      comment_count: 0, // denormalized count of comments
      vote_count: 0, // denormalized count of all votes
      votes: [] // timestamp / 1000 / 60: only allow one vote per minute
    });

    var id = Apps.insert(app);
    return id;
  },

  vote: function(hostname) {
    check(hostname, String);

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

  comment: function (app_id, author, comment) {
    check(app_id, String);
    check(author, String);
    check(comment, String);

    Comments.insert({app_id: app_id, author: author, comment: comment});
    Apps.update({_id: app_id}, {$inc: {comment_count: 1}});
  }
});


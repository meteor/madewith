Meteor.methods({
  createApp: function(app) {
    _.extend(app, {
      when: (new Date()).getTime(),
      comment_count: 0, // denormalized count of comments
      vote_count: 0, // denormalized count of all votes
      votes: [] // timestamp / 1000 / 60: only allow one vote per minute
    });

    var id = Apps.insert(app);
    return id;
  },

  removeApp: function (app_id, pw_sha) {
    Apps.remove({_id: app_id, pw_sha: pw_sha});
  },

  vote: function(hostname) {
    // if the app doesn't already have a vote in this minute,
    // increment vote_count and mark this minute in the votes array.

    // minutes since epoch
    var vote_ts = Math.floor((new Date()).getTime() / 1000 / 60);

    if (Meteor.is_client) {
      Apps.update({name: hostname},
                  {$inc: {vote_count: 1}, $addToSet: {votes: vote_ts}});
    } else {
      Apps.update({name: hostname, votes: {$ne: vote_ts}},
                  {$inc: {vote_count: 1}, $addToSet: {votes: vote_ts}});
    }
  },

  comment: function (app_id, author, comment) {
    Comments.insert({app_id: app_id, author: author, comment: comment});
    Apps.update({_id: app_id}, {$inc: {comment_count: 1}});
  }
});


// Madewith acts as a namespace for helper functions
if (typeof Madewith === 'undefined')
  Madewith = {};

Madewith.commentsForApp = function(app) {
  return Comments.find({app_id: app._id}, {sort: {when: -1}});
};


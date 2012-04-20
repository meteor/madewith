// Sample data for running locally
if (Meteor.is_server) {
  Meteor.startup(function() {
    var description = '';
    if (Apps.find().count() === 0) {
      _.each([1, 2, 3, 4, 5, 6, 7, 8], function(n) {
        description += 'once upon a ';
        var app_id = Apps.insert({
          name: 'avital-test' + n,
          description: description,
          vote_count: Math.floor((1 + Math.sin(n)) * 100),
          source_url: (n % 3) === 0 ? 'http://github.com/something' : null
        });

        Meteor.call('comment', app_id, 'someone', 'comment');
      });
    }
  });
}

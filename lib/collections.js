Lists = new Mongo.Collection('lists');

// Calculate a default name for a list in the form of 'List A'
Lists.defaultName = function() {
  var nextLetter = 'A', nextName = 'List ' + nextLetter;
  while (Lists.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'List ' + nextLetter;
  }

  return nextName;
};

Todos = new Mongo.Collection('todos');

if (Meteor.isServer) {
  Meteor.startup(function () {
    collectionApi = new CollectionAPI({ authToken: 'sakVBXcmrIVMooTv9k78HZbvI8AnTuvMSe' });
    collectionApi.addCollection(Lists, 'lists');
    collectionApi.start();
  });
}
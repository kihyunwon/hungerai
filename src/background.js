Clarifai.initialize({
  'clientId': AI_CLIENT_ID,
  'clientSecret': AI_CLIENT_SECRET
});

function getSearchString(tags) {
  var string = ''; 
  for (var i = 1; i >= 0; i--) {
    string += tags[i].replace(/ /g,'+');
    if (i > 0) {
      string += '+';
    }
  }
  return string;
}

function generateLink(imgurl, cb) {
  Clarifai.getTagsByUrl(imgurl, {
    'model': 'food-items-v1.0'
  }).then(function(r){
    var tags = r.results[0].result.tag.classes;
    cb(getSearchString(tags), null);
  }, function(err) {
    cb(null, err);
  });
}

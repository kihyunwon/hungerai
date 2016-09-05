function save_options() {
  chrome.storage.sync.set({
    foursquare: document.getElementById('foursquare').checked,
    yelp: document.getElementById('yelp').checked,
    _options: document.getElementById('_options').checked
  });
}

function restore_options() {
  var manifest = chrome.runtime.getManifest();
  document.getElementById('version').innerHTML = manifest.version;

  chrome.storage.sync.get({
    foursquare: true,
    yelp: true,
    _options: true
  }, function(items) {
    document.getElementById('foursquare').checked = items.foursquare;
    document.getElementById('yelp').checked = items.yelp;
    document.getElementById('_options').checked = items._options;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
var options = document.querySelectorAll('input[type="checkbox"]');
for (var i = 0; i < options.length; i++) {
  options[i].addEventListener('click', save_options);
}

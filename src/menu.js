var options = {
  foursquare: true,
  yelp: true,
  _options: true
};

chrome.storage.sync.get(options, update_menus);
chrome.storage.onChanged.addListener(options_changed);

function options_changed(changes, areaName) {
  for(var opt in changes) {
    options[opt] = changes[opt].newValue;
  }
  update_menus(options);
}

function update_menus(results) {
  options = results;
  remove_all_menus(function() {
    if (options.foursquare) {
      create_foursquare_menu();
    }
    if (options.yelp) {
      create_yelp_menu();
    }
    if (options._options) {
      create_options_menu();
    }
  });
}

function create_foursquare_menu() {
  chrome.contextMenus.create({
      "title": "Foursquare",
      "contexts": ["image"],
      "onclick": function (info) {
        generateLink(info.srcUrl, function(tags, err) {
          chrome.tabs.create({
            "url": "https://www.foursquare.com/explore?mode=url&q=" + tags
          });
        });
      }
  });
}

function create_yelp_menu() {
  chrome.contextMenus.create({
      "title": "Yelp",
      "contexts": ["image"],
      "onclick": function (info) {
        generateLink(info.srcUrl, function(tags, err) {
          chrome.tabs.create({
            "url": "https://www.yelp.com/search?find_desc=" + tags
          });
        });
      }
  });
}

function create_options_menu() {
  chrome.contextMenus.create({
    "title": "Change Seach Option",
    "contexts": ["image"],
    "onclick": function (info) {
        chrome.runtime.openOptionsPage();
    }
  });
}

function remove_all_menus(callback) {
  chrome.contextMenus.removeAll(callback);
}

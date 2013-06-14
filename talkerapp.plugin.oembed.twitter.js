plugin.onMessageInsertion = function(event){
  var twitter_status_expression = /https*:\/\/twitter.com\/(?:#!\/)?\w+\/statuse?s?\/(\d+)/i;
  var last_anchor = Talker.getLastInsertion().find('a');

  var last_href = last_anchor.attr('href') || '';

  if (twitter_status_expression.test(last_href)){
    var id = last_href.match(twitter_status_expression)[1];
    var url = 'https://api.twitter.com/1/statuses/oembed.json?id=' + id + '&align=center&callback=?';
    
    if (last_anchor.hasClass('transformed')){
      return true; // Do not transform the link a second time.
    }
    
    $.getJSON(url, function(data){
      if (data && !last_anchor.hasClass('transformed')){
        // tag as tranformed so we don't do it again
        last_anchor.addClass('transformed')
          .fadeOut('slow')
          .after($("<div class='travi-twitter'>" + data.html + "</div>"));
      }
    });
  }
};

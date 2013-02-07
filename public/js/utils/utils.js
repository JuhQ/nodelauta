
define(["jquery", "underscore", "backbone", "collections/boards"], function($, _, Backbone, BoardsCollection) {
  var Utils;
  Utils = {};
  Utils.boardCollection = new BoardsCollection();
  Utils.postFormatter = function(model, board) {
    var content, urlRegex;
    content = _.escape(model.get("content")).replace(/\n/g, "<br />\n");
    content = content.replace(/&gt;&gt;([a-zA-Z0-9]*)/gi, '<a href="#' + board + '/$1">&gt;&gt;$1</a>');
    urlRegex = /(^|\s)(\b(https?|ftp):&#x2F;&#x2F;[\-A-Z0-9+\u0026@#&#x2F;%?=~_|!:,.;]*[\-A-Z0-9+\u0026@#&#x2F;%=~_|])/gi;
    content = content.replace(urlRegex, '<a href="$2" target="_new">$2</a>');
    return content;
  };
  return Utils;
});

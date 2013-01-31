define([
    "backbone",
    "models/post"
    ], function(
        Backbone,
        Model
        ) {
    return Backbone.Collection.extend({
        url: "/thread/:board",
        model: Model,
        initialize: function(options) {
            this.url = this.url.replace(":board", options.board);
        }
    });
});
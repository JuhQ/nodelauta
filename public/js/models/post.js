define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
        url: "/post/:id",
        initialize: function(options) {
            if(options.id) {
                this.url = this.url.replace(":id", options.id);
            }
        }
    });
});
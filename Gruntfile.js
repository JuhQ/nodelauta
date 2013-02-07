
module.exports = function(grunt) {
  grunt.initConfig({
    coffeelint: {
      files: ['coffeescript/*.coffee', 'coffeescript/**/*.coffee']
    },
    coffee: {
      files: {
        'public/js/toffee/*.js': ['coffeescript/*.coffee', 'coffeescript/**/*.coffee']
      }
    },
    watch: {
      scripts: {
        files: "<%=jshint.all%>",
        tasks: "jshint"
      },
      coffee: {
        files: "<%=coffee.files%>",
        tasks: "coffee"
      },
      coffeelint: {
        files: "<%=coffeelint.app%>",
        tasks: "coffeelint"
      }
    },
    coffeelintOptions: {
      "max_line_length": {
        "value": 140
      }
    },
    jshint: {
      all: ["grunt.js", "modules/*.js", "routes/*.js", "public/js/*.js", "*.js"],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        strict: false,
        globals: {
          requirejs: true,
          define: true,
          google: true,
          document: true,
          $: true,
          window: true,
          FastClick: true,
          FileReader: true,
          Backbone: true
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-coffeelint");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  return grunt.registerTask("default", ["jshint", "coffeelint"]);
};

(function() {
  module.exports = function(grunt) {
    grunt.initConfig({
      jshint: {
        all: ["Gruntfile.js", "routes/*.js", "public/**/*.js", "!public/js/libs/**/*.js"],
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true
          }
        }
      },
      coffee: {
        glob_to_multiple: {
          expand: true,
          cwd: "coffeescript",
          src: ["**/*.coffee"],
          dest: "",
          ext: ".js"
        }
      },
      coffeelint: {
        app: ["coffeescript/**/*.coffee"],
        options: {
          max_line_length: {
            value: 140
          }
        }
      },
      less: {
        glob_to_multiple: {
          expand: true,
          cwd: "less",
          src: ["**/*.less", "!mixins.less"],
          dest: "public/css/",
          ext: ".css"
        }
      },
      watch: {
        src: {
          files: ["coffeescript/**/*.coffee", "less/*.less"],
          tasks: ["default"]
        }
      }
    });
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-coffee");
    grunt.loadNpmTasks("grunt-coffeelint");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    return grunt.registerTask("default", ["coffeelint", "coffee", "jshint", "less"]);
  };

}).call(this);

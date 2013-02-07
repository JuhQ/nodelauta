#
# * grunt
# * http://gruntjs.com/
# *
# * Copyright (c) 2012 "Cowboy" Ben Alman
# * Licensed under the MIT license.
# * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
#
module.exports = (grunt) ->
  
  # Project configuration.
  grunt.initConfig
    
    coffeelint:
      files: ['coffeescript/*.coffee','coffeescript/**/*.coffee']

    coffee:
      files:
        'public/js/toffee/*.js': ['coffeescript/*.coffee', 'coffeescript/**/*.coffee']


    watch:
      scripts:
        files: "<%=jshint.all%>"
        tasks: "jshint"
      coffee:
        files: "<%=coffee.files%>"
        tasks: "coffee"
      coffeelint:
        files: "<%=coffeelint.app%>"
        tasks: "coffeelint"

    coffeelintOptions:
      "max_line_length":
        "value": 140

    jshint:
      all: [
        "grunt.js"
        "modules/*.js"
        "routes/*.js"
        #"!**/libs/*.js"
        "public/js/*.js"
        "*.js"
      ]
      options:
        curly: true
        eqeqeq: true
        immed: true
        latedef: true
        newcap: true
        noarg: true
        sub: true
        undef: true
        boss: true
        eqnull: true
        node: true
        es5: true
        strict: false
        globals:
          requirejs: true
          define: true
          google: true
          document: true
          $: true
          window: true
          FastClick: true
          FileReader: true
          Backbone: true

  grunt.loadNpmTasks "grunt-coffeelint"
  #grunt.loadNpmTasks "grunt-reload"
  grunt.loadNpmTasks "grunt-contrib-jshint"
  #grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "default", ["jshint", "coffeelint"]

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
    lint:
      all: [
        "grunt.js"
        "app/modules/*.js"
        "app/routes/*.js"
        "app/public/js/*.js"
        "app/*.js"
      ]

    coffeelint:
      app: ['coffeescript/*.coffee','coffeescript/**/*.coffee']

    watch:
      scripts:
        files: "<config:lint.all>"
        tasks: "lint"
      coffee:
        files: "<config:coffeelint.app>"
        tasks: "coffeelint"


    coffeelintOptions:
      "max_line_length":
        "value": 100

    jshint:
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

  
  grunt.loadNpmTasks "grunt-reload"
  grunt.loadNpmTasks "grunt-coffeelint"
  grunt.registerTask "default", "lint coffeelint"

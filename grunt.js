
module.exports = function(grunt) {
  grunt.initConfig({
    lint: {
      all: ["grunt.js", "app/modules/*.js", "app/routes/*.js", "app/public/js/*.js", "app/*.js"]
    },
    watch: {
      scripts: {
        files: "<config:lint.all>",
        tasks: "lint test"
      }
    },
    jshint: {
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
        strict: false
      },
      globals: {
        requirejs: true,
        define: true,
        google: true,
        document: true,
        $: true,
        window: true
      }
    }
  });
  return grunt.registerTask("default", "lint");
};

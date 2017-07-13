'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['jshint','build']);
  grunt.registerTask('start', ['jshint', 'build', 'concurrent:target']);
  grunt.registerTask('build', ['clean:public', 'jshint', 'concat:index', 'concat:js', 'concat:css', 'vendor']);
  grunt.registerTask('vendor', ['concat:vendorjs', 'concat:vendorcss']);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n ' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' License : <%= pkg.license %> \n' +
      ' */\n',
    concurrent: {
      target: {
        tasks: ['connect:server', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    src: {
      js: ['client/**/*.js'],
      css: ['client/**/*.css']
    },
    clean:{
      public : ["public"]
    },
    concat:{
      index: {
        src: ['client/index.html'],
        dest: 'public/index.html',
        options: {
          process: true
        }
      },
      js: {
        src: [
          '<%= src.js %>'
        ],
        dest: 'public/js/app.js',
        options: {
          process: true
        }
      },
      css: {
        src: [
          '<%= src.css %>'
        ],
        dest: 'public/css/app.css',
        options: {
          process: true
        }
      },
      vendorjs:{
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/mustache.js/mustache.min.js'
        ],
        dest: 'public/js/vendor.js'
      },
      vendorcss:{
        src: [
          'bower_components/bootstrap-css-only/css/bootstrap.min.css',
          'bower_components/bootstrap-css-only/css/bootstrap-theme.min.css'
        ],
        dest: 'public/css/vendor.css'
      }
    },
    jshint:{
      files:['gruntFile.js', '<%= src.js %>'],
      options:{
        globalstrict: true,
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        newcap:false,
        globals:{
          "$"              : true,
          "App"            : true,
          "TodoModel"      : true,
          'TodoCreateView' : true,
          "TodoListView"   : true,
          "Mustache"       : true,
          "console"        : true,
          "window"         : true,
          "document"       : true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'public',
          livereload: true,
          keepalive : true
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['<%= src.js %>'],
        tasks: ['jshint', 'concat:js']
      },
      css: {
        files: ['<%= src.css %>'],
        tasks: ['jshint', 'concat:css']
      },
      index: {
        files: ['client/index.html'],
        tasks: ['concat:index']
      }
    }
  });
};
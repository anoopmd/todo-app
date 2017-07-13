'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['jshint','build']);
  grunt.registerTask('start', ['jshint', 'build', 'concurrent:target']);
  grunt.registerTask('build', ['clean:public', 'jshint', 'concat:index']);

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
      html: ['client/**/*.html'],
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
      vendorcss:{
        src: [
          'bower_components/bootstrap-css-only/css/bootstrap.min.css',
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
          "angular"  : true,
          "console"  : true,
          "require"  : true,
          "module"  : true,
          "document" : true
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
      index: {
        files: ['client/index.html'],
        tasks: ['concat:index']
      }
    }
  });
};
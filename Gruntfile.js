module.exports = function(grunt) {

	var timestamp = grunt.template.today("yyyy-mm-dd_HH-MM");

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				}
			},
			'<%= pkg.name %>': {
				src: ['src/js/**/*.js']
			}

		},

		concat: {
			js: {
				src: [
				'app/js/svg.js',
				'app/js/jquery-2.1.4.min.js',
				'app/js/jquery.easing.min.js',
				'app/js/jquery.mousewheel.min.js',
				'app/js/jquery.simplr.smoothscroll.min.js',
				'app/js/jquery.maskedinput.js',
				'app/js/jquery.magnific-popup.min.js',
				'app/js/jquery.event.move.js',
				'app/js/jquery.event.swipe.js',
				'app/js/common.js'
				],
				dest: 'app/public_html/bitrix/templates/karpushhenko/js/common.concat.js',
				options: {
					stripBanners: true,
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + 
					'<%= grunt.template.today("yyyy-mm-dd") %> */'
				}
			}
		},

		uglify: {
			js: {
				src: 'app/public_html/bitrix/templates/karpushhenko/js/common.concat.js',
				dest: 'app/public_html/bitrix/templates/karpushhenko/js/common.min.js'
			}
		},

		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			target: {
			    files: {
			      'app/public_html/bitrix/templates/karpushhenko/css/common.min.css': ['app/css/common.css']
			    }
			  }
		 },

		htmlmin: {                                     // Task
			dev: {                                      // Target
				options: {                                 // Target options
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: '**/*.html',
					dest: 'build/'
				}]
			}
		},

		compress: {
			main: {
				options: {
					archive:  '<%= pkg.name %>_' + timestamp + '.zip'
				},
				files: [{
					expand: true,
					cwd: 'app/',
					src: ['**/*.*']
				}]
			}
		},

		connect: {
			server: {
				options: {
					keepalive: true,
					port: 9000,
					base: 'app',
					open: 'http://localhost:9000/',
					livereload: true
				}
			}
		},

		wiredep: {

			task: {

				// Point to the files that should be updated when
				// you run `grunt wiredep`
				src: [
					'app/**/*.html'
				],

				options: {
					// See wiredep's configuration documentation for the options
					// you may pass:

					// https://github.com/taptapship/wiredep#configuration
				}
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			css: {
				files: ['app/**/*.css']
			},
			css: {
				files: ['app/css/sass.css'],
				tasks: ['postcss'],
			},
			scripts: {
				files: ['app/**/*.js']
			},
			html: {
				files: ['app/*.html'],
				//files: ['*.html', 'includes/*.html', 'includes/*.svg'],
				//tasks: ['includereplace']
			}
		},

		surge: {
			'<%= pkg.name %>': {
				options: {
					project: 'app/',
					domain: '<%= pkg.name %>.surge.sh'
				}
			}
		},

		'ftp-deploy': {
		  build: {
		    auth: {
		      host: 'beskrovnyy.com',
		      port: 'ftp.s13.freehost.com.ua',
		      authKey: 'key1'
		    },
		    src: 'app/',
		    dest: '/html'
		   
		  }
		},

		includereplace: {
			dist: {
				options: {
					// Task-specific options go here.
					//includesDir: 'app/html/'
				},
				// Files to perform replacements and includes with
				src: ['*.html'],
				// Destination directory to copy files to
				dest: 'app/'
			}
		},

		svgstore: {
		  options: {
		    prefix : 'icon_', // This will prefix each <g> ID
		  },
		  default : {
		      files: {
		        'app/icons.svg': ['app/svg-icons/min/*.svg'],
		      }
		    }
		  },
		 
		 svg2string: {
		 	elements: {
		 	      files: {
		 	        'app/js/svg.js': [
		 	          'app/icons.svg'
		 	        ]
		 	      }
		 	    },
		    options: {
		      // Task-specific options go here.
		    },
		    your_target: {
		      // Target-specific file lists and/or options go here.
		    }
		 },

		svgmin: {
			options: {
			plugins: [
				{ removeViewBox: false },               // don't remove the viewbox atribute from the SVG
				{ removeUselessStrokeAndFill: false },  // don't remove Useless Strokes and Fills
				{ removeEmptyAttrs: false }             // don't remove Empty Attributes from the SVG
				]
				},
				target: {
					files: [{
					expand: true,
					cwd: 'app/svg-icons/nomin/',
					src: '{,*/}*.svg',
					dest: 'app/svg-icons/min/'
					}
				]
			}
		},


		postcss: {
		  options: {
		    map: false,
		    processors: [
		      require('autoprefixer')({browsers: ['last 1 version']})
		    ]
		  },
		  dist: {
		    src: 'app/css/sass.css',
		    dest: 'app/css/common.css'
		  }
		}

		
	});

	// Load the plugin that provides the "jshint" task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-surge');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-include-replace');
	//grunt.loadNpmTasks('grunt-open');

	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-svg2string');
	grunt.loadNpmTasks('grunt-svgmin');

	grunt.loadNpmTasks('grunt-postcss');

	// Default task(s).
	//grunt.registerTask('default', ['jshint']);
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'htmlmin']);
	grunt.registerTask('css-min', ['cssmin']);
	grunt.registerTask('js-concat', ['concat']);
	grunt.registerTask('js-min', ['uglify']);
	grunt.registerTask('min', ['cssmin', 'concat', 'uglify']);


	grunt.registerTask('zip', ['compress']);
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('server', ['connect']);
	grunt.registerTask('inject', ['wiredep']);
	grunt.registerTask('watch-changes', ['watch']);
	grunt.registerTask('start', ['connect', 'watch']);
	grunt.registerTask('to-web', ['surge']);
	grunt.registerTask('to-ftp', ['ftp-deploy']);
	grunt.registerTask('include', ['includereplace']);

	grunt.registerTask('svg-sprite', ['svgstore']);
	grunt.registerTask('svg-string', ['svg2string']);
	grunt.registerTask('svg-min', ['svgmin']);

	grunt.registerTask('svg', ['svgmin', 'svgstore','svg2string']);

	grunt.registerTask('post', ['postcss']);

};
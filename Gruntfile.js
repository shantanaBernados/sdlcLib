module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {                              	// Task
    		dist: {                            	// Target
      			options: {                      // Target options
      				style: 'expanded'
      			},
      			files: {                        // Dictionary of files
        			'assets/css/style.css': 'assets/sass/style.sass',     // 'destination': 'source'
        		}
        	}
        },
		watch: {
			components: {
				files: ['components/**/**/**/*.js', 'shared/**/*.js'],
				tasks: ['uglify:components'],
				options: {
					spawn: false,
				}
			},
			js: {
				files: ['assets/js/**/*.js', 'assets/js/*.js'],
				tasks: ['uglify:js'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['assets/**/*.sass', 'assets/**/*.css'],
				tasks: ['sass', 'cssmin'],
				options: {
					spawn: false,
				}
			}
		},
		uglify: {
			options: {
				mangle: true,
				beautify: false
			},
			
			components: {
				files: {
					'assets/dist/components/components.min.js' : ['components/**/**/**/*.js', 'components/**/*.js', 'shared/**/*.js']
				}
			},
			js: {
				files: {
					'assets/dist/js/custom.min.js': ['assets/js/*.js']
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundPrecision: -1
			},
			combine: {
				files: {
					'assets/dist/css/style.min.css' : ['assets/css/**/*.css','!assets/css/*.min.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['sass', 'uglify', 'cssmin','watch']);
	grunt.registerTask('production', ['sass', 'uglify', 'cssmin']);
};
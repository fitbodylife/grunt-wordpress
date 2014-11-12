module.exports = function( grunt ) {

grunt.initConfig({
	lint: {
		src: [ "index.js", "lib/**/*.js" ],
		build: [ "grunt.js", "tasks/**/*.js" ]
	},
	jshint: (function() {
		var rc = grunt.file.readJSON( ".jshintrc" ),
			settings = {
				options: rc,
				globals: {}
			};

		(rc.predef || []).forEach(function( prop ) {
			settings.globals[ prop ] = true;
		});
		delete rc.predef;

		return settings;
	})()
});

grunt.registerTask( "default", "lint" );

};

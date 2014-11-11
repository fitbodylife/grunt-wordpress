var wordpress = require( "../" );

module.exports = function( grunt ) {

var client = (function() {
	var _client;

	return function() {
		if ( !_client ) {
			var config = grunt.config( "wordpress" );
			config.verbose = grunt.option( "verbose" ) || false;

			_client = wordpress.createClient( config );
			_client.log = function() {
				grunt.log.writeln.apply( grunt.log, arguments );
			};
			_client.logError = function() {
				grunt.log.error.apply( grunt.log, arguments );
			};
		}

		return _client;
	};
})();

grunt.registerTask( "wordpress-validate", function() {
	var done = this.async();
	client().validate(function( error ) {
		if ( error ) {
			grunt.log.error( error );
			return done( false );
		}

		done();
	});
});

grunt.registerTask( "wordpress-sync", function() {
	this.requires( "wordpress-validate" );

	var done = this.async();
	client().sync(function( error ) {
		if ( error ) {
			grunt.log.error( error );
			return done( false );
		}

		done();
	});
});

grunt.registerTask( "wordpress-publish", "wordpress-validate wordpress-sync" );
grunt.registerTask( "wordpress-deploy", "build-wordpress wordpress-publish" );
grunt.registerTask( "deploy", "wordpress-deploy" );

};

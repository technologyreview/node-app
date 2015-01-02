/**
 * Global template vars
 *
 * Provide the following local variables to all
 * loaded view templates
 */

var swig = require( 'swig' ),
	markedSwig = require( 'swig-marked' );

module.exports = function ( app ) {

	var parentPath = app.get( 'rootPath' );

	/**
	 * Templating
	 */
	this.templates = function () {
		markedSwig.useFilter( swig );
		markedSwig.useTag( swig );
		app.engine( 'html', swig.renderFile );
		app.set( 'views', parentPath + '/views' );
		app.set( 'view engine', 'html' );
	};

	/**
	 * Environments
	 */
	this.environments = function () {
		var environment = process.env.NODE_ENV || 'production';

		// 1. development
		if ( environment === 'development' ) {

			// disable cache
			app.disable( 'view cache' );
			swig.setDefaults( {
				cache: false
			} );

			// enable livereload
			app.use( require( 'connect-livereload' )( {
				port: 35729
			} ) );
		}

		// 2. production
		else {
			app.enable( 'view cache' );
		}
	};

	/**
	 * Initialize
	 */
	this.templates();
	this.environments();

};
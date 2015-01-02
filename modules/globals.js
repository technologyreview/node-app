/**
 * Global template vars
 *
 * Provide the following local variables to all
 * loaded view templates
 */

var _ = require( 'underscore' ),
	path = require( 'path' );

module.exports = function ( app ) {

	// paths
	app.set( 'rootPath', path.join( __dirname, '..' ) );

	// navigation
	app.locals = _.extend( app.locals, {
		menu: [ {
			label: 'Home',
			uri: '/'
		}, {
			label: 'Page',
			uri: '/p/page-slug'
		}, {
			label: 'Article',
			uri: '/a/article-slug'
		}, {
			label: 'Error',
			uri: '/404'
		} ],
		bodyClass: 'nav-closed',
		organization: "MIT Technology Review",
		project: "Project title",
		logo: "/img/mittr-logo-square.png",
		year: 2014
	} );
};
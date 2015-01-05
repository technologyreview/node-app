/**
 * Application routing
 *
 * Map URL's to the correct templates for
 * HTML/Markdown output
 */

var favicon = require( 'serve-favicon' ),
	express = require( 'express' );

module.exports = function ( app ) {

	var parentPath = app.get( 'rootPath' );

	/**
	 * Static assets
	 */
	this.static = function () {
		app.use( express.static( parentPath + '/public' ) );
		app.use( favicon( parentPath + '/public/img/favicon.ico' ) );
	};

	/**
	 * Home
	 */
	this.home = function () {
		app.get( '/', function ( req, res ) {
			res.render( 'layout-full-width', {
				view: './index.html',
				activeRoute: req.url
			} );
		} );
	};

	/**
	 * Page
	 */
	this.page = function () {
		app.get( '/p/*', function ( req, res ) {
			res.render( 'layout-two-column', {
				view: './page.html',
				activeRoute: req.url
			} );
		} );
	};

	/**
	 * Article
	 */
	this.article = function () {
		app.get( '/a/*', function ( req, res ) {
			res.render( 'layout-two-column', {
				view: './article.html',
				activeRoute: req.url
			} );
		} );
	};

	/**
	 * Errors
	 */
	this.errors = function () {

		// 404
		app.use( function ( req, res ) {
			res.status( 404 );

			// HTML
			if ( req.accepts( 'html' ) ) {
				res.render( 'layout-error', {
					view: './error.html'
				} );
				return;
			}

			// JSON
			if ( req.accepts( 'json' ) ) {
				res.send( {
					error: 'Page Not Found'
				} );
				return;
			}

			// Plain-text
			res.type( 'txt' ).send( 'Page Not Found' );
		} );

		// 50X
		app.use( function ( error, req, res, next ) {
			res.status( 500 );

			// HTML
			if ( req.accepts( 'html' ) ) {
				res.render( 'layout-error', {
					view: './error.html'
				} );
				return;
			}

			// JSON
			if ( req.accepts( 'json' ) ) {
				res.send( {
					error: 'Internal Server Error'
				} );
				return;
			}

			// Plain-text
			res.type( 'txt' ).send( 'Internal Server Error' );
		} );
	};

	/**
	 * Serve HTTP
	 */
	this.serve = function () {
		var port = process.env.PORT || 8888;
		app.listen( port );
	};

	/**
	 * Test
	 */
	this.test = function () {
		app.get( '/', function ( req, res ) {
			res.send( 'Hello World!' );
		} );
	}

	/**
	 * Initialize
	 */
	this.static();
	this.home();
	this.page();
	this.article();
	this.errors();
	this.serve();
};
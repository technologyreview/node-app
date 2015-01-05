/**
 * Application routing
 *
 * Map URL's to the correct templates for
 * HTML/Markdown output
 */

var favicon = require( 'serve-favicon' ),
	express = require( 'express' ),
	cluster = require( 'cluster' );

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
	 * HTTP Server
	 *
	 * Enhanced with clustering for scalability
	 */
	this.init = function () {

		// code to run if we're in the master process
		if ( cluster.isMaster ) {

			// count the machine's CPUs
			var cpuCount = require( 'os' ).cpus().length;

			// create a worker for each CPU
			for ( var i = 0; i < cpuCount; i += 1 ) {
				cluster.fork();
			}

			// listen for dying workers
			cluster.on( 'exit', function ( worker ) {

				// replace the dead worker, we're not sentimental
				console.log( 'Worker ' + worker.id + ' died :(' );
				cluster.fork();

			} );
		}

		// code to run if we're in a worker process
		else {

			// routes
			this.static();
			this.home();
			this.page();
			this.article();
			this.errors();

			// listen
			app.listen( process.env.PORT || 8888 );
			console.log( 'Worker ' + cluster.worker.id + ' running!' );
		}
	}

	/**
	 * Initialize
	 */
	this.init();
};
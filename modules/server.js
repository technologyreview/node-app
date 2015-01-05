/**
 * Module dependencies.
 */

var express = require( 'express' ),
	fs = require( 'fs' ),
	filename = '/var/nodelist',
	session = require( 'express-session' ),
	app = module.exports = express();

// only run for production
if ( process.env.NODE_ENV === 'production' ) {

	var RedisStore = require( 'connect-redis' )( session );

	function setup( cacheNodes ) {
		app.configure( function () {
			app.use( express.bodyParser() );
			app.use( express.methodOverride() );
			if ( cacheNodes ) {
				app.use( express.cookieParser() );

				console.log( 'Using redis store nodes:' );
				console.log( cacheNodes );

				app.use( express.session( {
					secret: 'your secret here',
					store: new RedisStore( {
						'hosts': cacheNodes
					} )
				} ) );
			} else {
				console.log( 'Not using redis store.' );
				app.use( express.cookieParser( 'your secret here' ) );
				app.use( express.session() );
			}
			app.use( app.router );
		} );

		app.get( '/', function ( req, resp ) {
			resp.writeHead( 200, "Content-type: text/html" );
			resp.write( "You are session: " + req.session.id );
			resp.end();
		} );

		if ( !module.parent ) {
			console.log( 'Running express without cluster.' );
			app.listen( process.env.PORT || 8888 );
		}
	}

	// Load elasticache configuration.
	fs.readFile( filename, 'UTF8', function ( err, data ) {
		if ( err ) throw err;
		var cacheNodes = [];
		if ( data ) {
			var lines = data.split( '\n' );
			for ( var i = 0; i < lines.length; i++ ) {
				if ( lines[ i ].length > 0 ) {
					cacheNodes.push( lines[ i ] );
				}
			}
		}
		setup( cacheNodes );
	} );

} // end production condition
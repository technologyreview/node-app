/**
 * Application boot
 *
 * Organize our Node app into modules for
 * organization and maintability
 */
var express = require( 'express' ),
	app = express(),
	globals = require( './modules/globals' )( app ),
	routes = require( './modules/routes' )( app ),
	config = require( './modules/config' )( app );
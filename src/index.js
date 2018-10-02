const P = require('bluebird');
const rdf = require('rdflib');
const R = require('ramda');

const SCHEMA_ORG = rdf.Namespace('http://schema.org/');

const jsonLd = 'application/ld+json';

const parseRdf = P.promisify(rdf.parse);

const first = R.nth(0);

function graphFor(s){
	let g = rdf.graph();

	return parseRdf(s, g, null, jsonLd);
}

function getFirstName(g){
	return first(
		g.statementsMatching(undefined, SCHEMA_ORG('givenName'), undefined))
	.object.value;
}

module.exports = {
	graphFor,
	getFirstName
}
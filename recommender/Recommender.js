const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver').v1;
var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;

var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
// var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '9933'));
const session = driver.session();

console.log(graphenedbUser + 'thgfbdxbjfgjhdbxsvjhvfbos');
console.log(graphenedbPass);

const salonGraph = function insertSalon(salon) {
	var cypher = 'CREATE (s:salon) SET s = {salon} RETURN s';
	var params = { salon: salon };
	runSession(cypher, params);
};

const customerGraph = function insertCustomer(customer) {
	var cypher = 'CREATE(c:customer) SET c={customer} RETURN c';
	var params = { customer: customer };
	runSession(cypher, params);
};
const serviceGraph = function insertService(service) {
	// create relationship
	console.log(service);
	var cypher = 'CREATE(c: service) SET c = { service } RETURN c';
	// var cypher = 'MATCH(s:salon{salonid:{salonid}}),(ss:service) SET ss={service} MERGE (s)-[r:PROVIDES]-(ss)';
	var params = { salonid: service.salonid, service: service };
	session
		.run(cypher, params)
		.then(u => {
			session.close();
			var joiner =
				'MATCH (s:salon),(ss:service) WHERE s.salonid = {salonid} AND ss.serviceid = {serviceid} CREATE (s)-[r:PROVIDES]->(ss)RETURN r';
			var params = { salonid: service.salonid, serviceid: service.serviceid };
			runSession(joiner, params);
		})
		.catch(err => {
			console.log(err);
		});
};
const runSession = function runSession(cypher, params) {
	session
		.run(cypher, params)
		.then(r => {
			session.close();
			console.log('saved to graph');
		})
		.catch(err => {
			console.log(err);
		});
};

const orderGraph = function insertOrderGraph(order) {
	console.log(order);
	var cypher = 'MATCH (a:customer),(b:service) WHERE a.customer={customerid} AND b.serviceid={serviceid} CREATE (a)-[r:BOOKED]->(b)';
	var params = { serviceid: 85, customerid: "7773863507" };
	runSession(cypher, params);
};

module.exports = {
	insertSalonGraph: salonGraph,
	insertServiceGraph: serviceGraph,
	insertCustomer: customerGraph,
	insertOrders: orderGraph,
};

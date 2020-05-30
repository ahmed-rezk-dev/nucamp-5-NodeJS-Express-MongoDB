const express = require("express");
const bodyParser = require("body-parser");

const partnersRouter = express.Router();

partnersRouter.use(bodyParser.json());

partnersRouter
	.route("/")
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		next();
	})
	.get((req, res) => {
		res.end("Will send all the partners to you");
	})
	.post((req, res) => {
		res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end("PUT operation not supported on /partners");
	})
	.delete((req, res) => {
		res.end("Deleting all partners");
	});
partnersRouter
	.route("/:partnerId")
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		next();
	})
	.get((req, res) => {
		res.end("Will send one partners to you ID" + req.params.partnerId);
	})
	.post((req, res) => {
		res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description} ID ${req.params.partnerId} `);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end("PUT operation not supported on /partners ID" + req.params.partnerId);
	})
	.delete((req, res) => {
		res.end("Deleting all partners ID" + req.params.partnerId);
	});
module.exports = partnersRouter;

const express = require("express");
const bodyParser = require("body-parser");

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());

promotionsRouter
	.route("/")
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		next();
	})
	.get((req, res) => {
		res.end("Will send all the promotions to you");
	})
	.post((req, res) => {
		res.end(`Will add the partners: ${req.body.name} with description: ${req.body.description}`);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end("PUT operation not supported on /promotions");
	})
	.delete((req, res) => {
		res.end("Deleting all promotions");
	});
promotionsRouter
	.route("/:partnersId")
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		next();
	})
	.get((req, res) => {
		res.end("Will send one promotions to you ID" + req.params.partnersId);
	})
	.post((req, res) => {
		res.end(`Will add the partners: ${req.body.name} with description: ${req.body.description} ID ${req.params.partnersId} `);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end("PUT operation not supported on /promotions ID" + req.params.partnersId);
	})
	.delete((req, res) => {
		res.end("Deleting all promotions ID" + req.params.partnersId);
	});
module.exports = promotionsRouter;

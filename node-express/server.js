const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const campsiteRouter = require("./routes/campsiteRouter");
const promotionsRouter = require("./routes/promotionsRouter");
const partnersRouter = require("./routes/partnersRouter");
const usersRouter = require("./routes/users");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const hostname = "localhost";
const port = 5000;

const app = express();
app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(
	session({
		name: "session-id",
		secret: "12345-67890-09876-54321",
		saveUninitialized: false,
		resave: false,
		store: new FileStore(),
	})
);

app.use("/users", usersRouter);
app.use("/campsites", campsiteRouter);
app.use("/promotions", promotionsRouter);
app.use("/partners", partnersRouter);

function auth(req, res, next) {
	console.log(req.session);

	if (!req.session.user) {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			const err = new Error("You are not authenticated!");
			res.setHeader("WWW-Authenticate", "Basic");
			err.status = 401;
			return next(err);
		}

		const auth = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
		const user = auth[0];
		const pass = auth[1];
		if (user === "admin" && pass === "password") {
			req.session.user = "admin";
			return next(); // authorized
		} else {
			const err = new Error("You are not authenticated!");
			res.setHeader("WWW-Authenticate", "Basic");
			err.status = 401;
			return next(err);
		}
	} else {
		if (req.session.user === "admin") {
			console.log("req.session:", req.session);
			return next();
		} else {
			const err = new Error("You are not authenticated!");
			err.status = 401;
			return next(err);
		}
	}
}

app.use(auth);

app.use(cookieParser("12345-67890-09876-54321"));

function auth(req, res, next) {
	console.log(req.session);

	if (!req.session.user) {
		const err = new Error("You are not authenticated!");
		err.status = 401;
		return next(err);
	} else {
		if (req.session.user === "authenticated") {
			return next();
		} else {
			const err = new Error("You are not authenticated!");
			err.status = 401;
			return next(err);
		}
	}
}

app.use(express.static(__dirname + "/public"));

app.use((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

const rect = require("./rectangle");
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/nucampsite";
const connect = mongoose.connect(url, {
	useCreateIndex: true,
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

connect.then(
	() => console.log("Connected correctly to server"),
	(err) => console.log(err)
);

function solveRect(l, w) {
	console.log(`Solving for rectangle with dimensions: ${l}, ${w}`);

	rect(l, w, (err, rectangle) => {
		if (err) {
			console.log("ERROR:", err.message);
		} else {
			console.log(`Area of rectangle with dimensions ${l}, ${w} is: ${rectangle.area()}`);
			console.log(`Perimeter of rectangle with dimensions ${l}, ${w} is: ${rectangle.perimeter()}`);
		}
	});
	console.log("This statement is logged after the call to rect()");
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 5);

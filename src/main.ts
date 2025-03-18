import express from "express";

declare global {
	namespace Express {
		interface Request {
			calculatedValue?: number;
		}
	}
}

const app = express();
const port = 8888;

app.use((req, res, next) => {
	const result = 4 * 7;
	req.calculatedValue = result;
	console.log(`Calculated value: ${result}`);
	next();
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

const express = require('express');
let app = express();

app.get('/', (req, resp) => {
	resp.send('<h1>English Learning</h1>');
});

app.listen(3000, () => {
	console.log('Started');
});
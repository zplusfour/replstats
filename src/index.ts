import express from 'express';
import * as ejs from 'ejs';
import { router } from './router.js';
const app = express();

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use('/', router);

app.listen(3000, () => {
	console.log('🚀: Server ready at http://localhost:3000');
});

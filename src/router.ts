import express from 'express';
import axios from 'axios';
export const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
	res.send('Hello World!');
});

router.get('/@:user/:repl', async (req: express.Request, res: express.Response) => {
	const { user, repl } = req.params;
	const url = `https://replit.com/data/repls/@${user}/${repl}`;
	console.log(url);
	try {
		const r: any = await axios.get(url, {
			headers: {
				referrer: 'https://replit.com'
			}
		});
		res.send(r.data);
	} catch (e) {
		res.send(e);
	}
});

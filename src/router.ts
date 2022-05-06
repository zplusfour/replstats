import express from 'express';
import fetch from 'node-fetch';
export const router = express.Router();

export type Repl = {
	id: string;
	user_id: number;
	title: string;
	description: string | null;
	is_project: boolean;
	is_private: boolean;
	time_created: string;
	time_updated: string;
	views: number;
	content_length: number;
	origin_id: string | null;
	slug: string;
	config: {};
	is_renamed: boolean;
	folder_id: string | null;
	url: string;
	language: string;
	fileNames: string[];
	is_owner: boolean;
	is_mobile: false; // unnecessary?
};

router.get('/', (_req: express.Request, res: express.Response) => {
	res.send('Hello World!');
});

router.get('/@:user/:repl', async (req: express.Request, res: express.Response) => {
	const { user, repl } = req.params;
	const url = `https://replit.com/data/repls/@${user}/${repl}`;
	const r = await fetch(url, {
		headers: {
			'User-Agent': 'Mozilla/5.0',
			'X-Requested-With': 'replstats (zplusfour)',
			referrer: 'https://replit.com'
		}
	});
	if (r.status !== 200) {
		res.send('Repl not found');
	} else {
		const q: Repl = await r.json();
		res.render('repl', { q });
	}
});

'use strict';

import { createServer } from 'node:http';

const server = createServer((req, res) => {
	const callerIp = req.socket.remoteAddress;
	const forwardedForRaw = req.headers['x-forwarded-for'];
	const forwardedFor = forwardedForRaw === undefined
		? undefined
		: String(forwardedForRaw).split(',').map((ip) => ip.trim());
	const body = forwardedFor === undefined
		? { ip: callerIp }
		: {
			caller_ip: callerIp,
			ip: forwardedFor[forwardedFor.length - 1],
			origin_ip: forwardedFor[0],
			x_forwarded_for_raw: String(forwardedForRaw),
			x_forwarded_for: forwardedFor
		};
	const headers = {
		'Access-Control-Allow-Origin': '*'
	};
	const pathname = new URL(req.url, 'http://localhost').pathname;

	if (pathname === '/text') {
		headers['Content-Type'] = 'text/plain';
		res.writeHead(200, headers);
		res.end(`${body.ip}\n`);
		return;
	}

	headers['Content-Type'] = 'application/json';
	res.writeHead(200, headers);
	res.end(JSON.stringify(body));
});

const [host, port] = process.env.AWS_LAMBDA_HTTP_ENDPOINT.split(':');

server.listen(port, host, () => {
	console.log(`Server running on ${host}:${port}`);
});

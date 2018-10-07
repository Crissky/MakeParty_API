import server from './server';

const port = process.env.PORT || '3000';

server.listen(port, () => {
	console.log(`Servidor On em http://127.0.0.1:${port}`)
});
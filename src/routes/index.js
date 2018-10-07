import { Router } from 'express';

const routes = Router();

/**
 * GET Pagina Home
 */

// Pagina Home rota (http://localhost:3000/)
routes.get('/', (req, res) => {
	res.send({"pagina":"Home"});
});

export default routes;
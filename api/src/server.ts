import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
import cors from 'cors';

import { Usuario } from './types/models';

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser); 

server.post("/api/login", (req, res) => {
    const { email, senha} = req.body;
    
    const db = (router.db as any);

    const usuarios = db.get('usuarios').value();

    const usuario: Usuario | undefined = usuarios.find((u: Usuario) => u.email === email && u.senha === senha);

    if (usuario) {
        const { senha, ...userWithoutPassword }: Usuario = usuario;
        res.status(200).json(userWithoutPassword);
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }

})

server.use('/api' , router);

server.listen(3001, () => {
    console.log('JSON Server is running on http://localhost:3001/api');
});
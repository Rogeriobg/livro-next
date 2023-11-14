import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../classes/controle/ControleLivros';

const controleLivro = new ControleLivro();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'DELETE') {
            const codigoLivro = Number(req.query.codigo);
            controleLivro.excluir(codigoLivro);
            res.status(200).json({ message: 'Livro excluído com sucesso.' });
        } else {
            res.status(405).json({ message: 'Método não permitido' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
};


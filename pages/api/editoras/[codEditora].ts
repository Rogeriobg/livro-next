import { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '../../../classes/controle/ControleEditora';

const controleEditora = new ControleEditora(); // Supondo que você já tenha uma instância de ControleEditora

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const { codEditora } = req.query;
            const editora = controleEditora.getNomeEditora(Number(codEditora));

            if (editora) {
                res.status(200).json({ nome: editora });
            } else {
                res.status(404).json({ error: 'Editora não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};
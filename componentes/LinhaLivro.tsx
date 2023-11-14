import React from 'react';
import Livro from '../classes/modelo/Livro';
import ControleEditora from '../classes/controle/ControleEditora';

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
    livro: Livro;
    excluir: (codigo: number) => void;
}


export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {

    const { livro, excluir } = props;
    const handleExcluirClick = () => {
        excluir(livro.codigo);
    };
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);


    return (
        <tr>

            <td>{livro.titulo}
                <td>
                    <button className="btn btn-danger" onClick={handleExcluirClick}>Excluir</button>
                </td>
            </td>

            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};



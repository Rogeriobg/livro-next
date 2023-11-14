import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import Livro from '../classes/modelo/Livro';
import ControleEditora from '../classes/controle/ControleEditora';
import styles from '../styles/Home.module.css';

const baseURL: string = 'http://localhost:3000/api/livros';

const LivroDados: React.FC = () => {

    const navigate = useRouter().push;
    const controleEditora = new ControleEditora();

    const [opcoes, setOpcoes] = useState<any[]>([]);
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(0);

    const obterOpcoes = () => {
        const editoras = controleEditora.getEditoras();
        const mappedOpcoes = editoras.map((editora) => ({
            value: editora.codEditora,
            text: editora.nome,
        }));
        setOpcoes(mappedOpcoes);
    };

    useEffect(() => {
        obterOpcoes();
    }, []);

    const incluirLivro = async (livro: Livro) => {
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(livro),
            });
            return response.ok;
        } catch (error) {
            console.error('Erro ao incluir livro:', error);
            return false;
        }
    };

    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCodEditora = parseInt(event.target.value, 10);
        setCodEditora(selectedCodEditora);
    };

    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const novoLivro: Livro = {
            codigo: 0,
            titulo,
            resumo,
            autores: autores.split('\n'),
            codEditora,
        };

        const sucesso = await incluirLivro(novoLivro);
        if (sucesso) {
            navigate('/LivroLista');
        }
    };


    return (
        <div className={styles.container}>


            {/* Componente Menu */}
            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.menu}`}>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link href="/" legacyBehavior>
                                <a className="nav-link">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/LivroLista" legacyBehavior>
                                <a className="nav-link">Catálogo</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/LivroDados" legacyBehavior>
                                <a className="nav-link">Novo</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Área principal */}
            <main className="container">
                <h1>Cadastrar Livro</h1>
                <form onSubmit={incluir}>
                    <div className="form-group">
                        <label>Título:</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Resumo:</label>
                        <textarea
                            value={resumo}
                            onChange={(e) => setResumo(e.target.value)}
                            className="form-control"
                            rows={5}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Autores (separados por linha):</label>
                        <textarea
                            value={autores}
                            onChange={(e) => setAutores(e.target.value)}
                            className="form-control"
                            rows={5}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Editora:
                            <br />
                            <select value={codEditora} onChange={tratarCombo} className=" custom-selectcol">
                                {opcoes.map((opcao) => (
                                    <option key={opcao.value} value={opcao.value}>
                                        {opcao.text}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">
                        Salvar Dados
                    </button>
                </form>
            </main>
        </div>
    );
};

export default LivroDados;
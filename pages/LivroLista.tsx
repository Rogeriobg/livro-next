
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Livro from '../classes/modelo/Livro';
import { LinhaLivro } from '../componentes/LinhaLivro';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head';


const baseURL: string = 'http://localhost:3000/api/livros';

const LivroLista: React.FC = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState(false);



    const obterLivros = async () => {
        try {
            const response = await fetch(baseURL);
            if (response.ok) {
                const data = await response.json();
                setLivros(data);
                setCarregado(true);
            } else {
                console.error('Falha ao obter os livros.');
            }
        } catch (error) {
            console.error('Erro na requisição: ', error);
        }
    };

    const excluirLivro = async (codigo: number) => {
        try {
            const response = await fetch(`${baseURL}/${codigo}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setCarregado(false);
            } else {
                console.log('Falha ao excluir o livro.');
            }
        } catch (error) {
            console.log('Erro na requisição: ', error);
        }
    };


    useEffect(() => {
        obterLivros();
    }, [carregado]);

    return (

        <div className={styles.container}>

            <Head>
                <title>LivroLista</title>
                <meta name="description" content="Lista de Livros" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

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


            <main className="container   ">
                <h1 className="text-center ">Catálago de Livros</h1>
                <table className="table table-striped table-hover table-md align-middle ">
                    <thead className="table-dark  ">
                        <tr>


                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Editora</th>
                            <th>Autores</th>

                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                            <LinhaLivro key={livro.codigo} livro={livro} excluir={excluirLivro} />
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default LivroLista;



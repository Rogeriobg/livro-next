import Livro from '../modelo/Livro';

const livrosJSON = '[{"codigo": 1,"codEditora": 1, "titulo": "Use a cabeça:Java", "resumo": "Use a Cabeça! Java é uma experiência completa de aprendizado em programação orientada a objetos(OO)e java", "autores": ["Bert Bates","Kathy Sierra"] },{"codigo": 1,"codEditora": 2, "titulo": "Java como programar", "resumo": "Milhões de alunos e profissionais aprenderam programação e desenvolvimento de software com os livros Deitel", "autores": ["Paul Deitel","Harvery Deitel"]}, {"codigo": 1,"codEditora": 3, "titulo": "Core java for the Impatient", "resumo": "Readers familiar with Horstmann’s original, two-volume “Core Java” books who are looking for a comprehensive, but condensed guide to all of the new features and functions of Java SE 9 will learn how these new features impact the language and core libraries. Instead of the meticulous detail that the much larger two-volume set provides, this condensed treatment focuses on practical examples and is presented in bite-sized chunks.", "autores": ["Cay Horstmann"]}]';
const livros: Array<Livro> = JSON.parse(livrosJSON).map((item: any) => new Livro(item.codigo, item.codEditora, item.titulo, item.resumo, item.autores));

class ControleLivro {
    obterLivros(): Array<Livro> {
        return livros;
    }

    incluir(livro: Livro): void {
        const novoCodigo = livros.reduce((max, livro) => (livro.codigo > max ? livro.codigo : max), 0) + 1;
        livro.codigo = novoCodigo;
        livros.push(livro);
    }

    excluir(codigo: number): void {
        const index = livros.findIndex(livro => livro.codigo === codigo);
        if (index !== -1) {
            livros.splice(index, 1);
        }
    }



}

export default ControleLivro;


import Editora from '../modelo/Editora';

const editorasJSON = '[{"codEditora": 1, "nome": "Alta Books"}, {"codEditora": 2, "nome": "Pearson"}, {"codEditora": 3, "nome": "Addison Wesley"}]';
const editoras: Array<Editora> = JSON.parse(editorasJSON).map((item: any) => new Editora(item.codEditora, item.nome));

class ControleEditora {
    getEditoras(): Array<Editora> {
        return editoras;
    }

    getNomeEditora(codEditora: number): string | undefined {
        const editoraEncontrada = editoras.find(editora => editora.codEditora === codEditora);
        return editoraEncontrada ? editoraEncontrada.nome : undefined;
    }
}

export default ControleEditora;
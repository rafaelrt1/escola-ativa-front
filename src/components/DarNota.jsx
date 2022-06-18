import Navegacao from './Navegacao'
import Select from 'react-select'

const optionsTurma = [
    { value: 'Turma1', label: 'Turma 1' },
    { value: 'Turma2', label: 'Turma 2' },
    { value: 'Turma3', label: 'Turma 3' }
]

const optionsDisciplina = [
    { value: 'Disciplina1', label: 'Disciplina 1' },
    { value: 'Disciplina2', label: 'Disciplina 2' },
    { value: 'Disciplina3', label: 'Disciplina 3' }
]

const optionsAluno = [
    { value: 'Aluno1', label: 'Aluno 1' },
    { value: 'Aluno2', label: 'Aluno 2' },
    { value: 'Aluno3', label: 'Aluno 3' }
]

const optionsConteudo = [
    { value: 'Conteudo1', label: 'Conteudo 1' },
    { value: 'Conteudo2', label: 'Conteudo 2' },
    { value: 'Conteudo3', label: 'Conteudo 3' }
]

const DarNota = () => {
    return (
        <>
        <Navegacao/>
        <section className='content'>
            <div id="cadastro">
                <form method="post" action="">
                    <h1>Vincular Turma e Disciplina</h1>

                    <p>
                        <label for="select_cad">Disciplina</label>
                        <Select className='labelSelect' options={optionsDisciplina} />
                    </p>

                    <p>
                        <label for="select_cad">Turma</label>
                        <Select className='labelSelect' options={optionsTurma} />
                    </p>

                    <p>
                        <label for="select_cad">Aluno</label>
                        <Select className='labelSelect' options={optionsAluno} />
                    </p>

                    <p>
                        <label for="select_cad">Conteudo</label>
                        <Select className='labelSelect' options={optionsConteudo} />
                    </p>

                    <p>
                        <label for="fase">Fase</label>
                        <input name="fase" type="text" placeholder="fase" />
                    </p>

                    <p>
                        <label for="nota">Nota</label>
                        <input name="nota" type="number" placeholder="nota" />
                    </p>

                    <p>
                        <input type="submit" value="Salvar" />
                    </p>

                    <p class="link">
                        Ja deu a nota a todos todos?
                        <a href="http://localhost:3000/Tabela">Tabela</a>
                    </p>
                </form>
            </div>
        </section>
        </>
    )
}

export default DarNota;
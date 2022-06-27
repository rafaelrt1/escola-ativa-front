import Navegacao from './Navegacao'
import Select from 'react-select'
import Footer from './Footer'

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

                        <div>
                            <label for="select_cad">Disciplina</label>
                            <Select className='labelSelect' options={optionsDisciplina} />
                        </div>

                        <div>
                            <label for="select_cad">Turma</label>
                            <Select className='labelSelect' options={optionsTurma} />
                        </div>

                        <div>
                            <label for="select_cad">Aluno</label>
                            <Select className='labelSelect' options={optionsAluno} />
                        </div>

                        <div>
                            <label for="select_cad">Conteúdo</label>
                            <Select className='labelSelect' options={optionsConteudo} />
                        </div>

                        <div>
                            <label for="fase">Fase</label>
                            <input name="fase" type="text" placeholder="Digite a fase" />
                        </div>

                        <div>
                            <label for="nota">Nota</label>
                            <input name="nota" type="number" placeholder="Digite a nota" />
                        </div>

                        <div>
                            <button className="button" type="submit">Salvar</button>
                        </div>

                        <p class="link">
                            Ja deu a nota a todos todos?
                            <a href="http://localhost:3000/Tabela">Tabela</a>
                        </p>
                    </form>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export default DarNota;
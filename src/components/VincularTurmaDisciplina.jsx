import Navegacao from './Navegacao'
import Select from 'react-select'

const optionsTurma = [
    { value: 'Turma1', label: 'Turma 1' },
    { value: 'Turma2', label: 'Turma 2' },
    { value: 'Turma3', label: 'Turma 3' },
    { value: 'Turma4', label: 'Turma 4' },
    { value: 'Turma5', label: 'Turma 5' },
    { value: 'Turma6', label: 'Turma 6' },
    { value: 'Turma7', label: 'Turma 7' }
]

const optionsDisciplina = [
    { value: 'Disciplina1', label: 'Disciplina 1' },
    { value: 'Disciplina2', label: 'Disciplina 2' },
    { value: 'Disciplina3', label: 'Disciplina 3' },
    { value: 'Disciplina4', label: 'Disciplina 4' },
    { value: 'Disciplina5', label: 'Disciplina 5' },
    { value: 'Disciplina6', label: 'Disciplina 6' },
    { value: 'Disciplina7', label: 'Disciplina 7' }
]


const VincularTurmaDisciplina = () => {
    return (
        <>
            <Navegacao />
            <section className='content'>

                <div id="cadastro">
                    <form method="post" action="">
                        <h1>Vincular Turma e Disciplina</h1>

                        <p>
                            <label for="select_cad">Turma</label>
                            <Select className='labelSelect' options={optionsTurma} />
                        </p>

                        <p>
                            <label for="select_cad">Disciplina</label>
                            <Select className='labelSelect' options={optionsDisciplina} />
                        </p>

                        <p>
                            <input type="submit" value="Vincular" />
                        </p>

                        <p class="link">
                            Ja vinculou todos?
                            <a href="http://localhost:3000/Tabela">Alunos</a>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default VincularTurmaDisciplina;
import Select from 'react-select'
import Navegacao from './Navegacao'

const optionsTurma = [
    { value: 'Turma1', label: 'Turma 1' },
    { value: 'Turma2', label: 'Turma 2' },
    { value: 'Turma3', label: 'Turma 3' },
    { value: 'Turma4', label: 'Turma 4' },
    { value: 'Turma5', label: 'Turma 5' },
    { value: 'Turma6', label: 'Turma 6' },
    { value: 'Turma7', label: 'Turma 7' }
]

const CadastroAluno = () => {
    return (
        <>
            <Navegacao />
            <section className='content'>

                <div id="cadastro">
                    <form method="post" action="">
                        <h1>Cadastro de Aluno</h1>

                        <p>
                            <label for="nome_cad">Nome Completo</label>
                            <input id="nome_cad" name="nome_cad" required="required" type="text" placeholder="nome completo" />
                        </p>

                        <p>
                            <label for="select_cad">Turma</label>
                            <Select className='labelSelect' options={optionsTurma} />
                        </p>

                        <p>
                            <input type="submit" value="Cadastrar" />
                        </p>

                        <p class="link">
                            Ja cadastrou todos?
                            <a href="http://localhost:3000/Tabela">Alunos</a>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CadastroAluno;
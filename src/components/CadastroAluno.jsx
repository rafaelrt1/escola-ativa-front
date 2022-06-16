import Select from 'react-select'
import optionsDisciplina from '../options';
import optionsTurma from '../options';

const CadastroAluno = () => {
    return (
        <section className='content'>
            <div id="cadastro">
                <form method="post" action="">
                    <h1>Cadastro de Aluno</h1>

                    <p>
                        <label for="nome_cad">Nome Completo</label>
                        <input id="nome_cad" name="nome_cad" required="required" type="text" placeholder="nome completo" />
                    </p>

                    <p>
                        <label for="select_cad">Disciplina</label>
                        <Select className='labelSelect' options={optionsDisciplina} isMulti/>
                    </p>

                    <p>
                        <label for="select_cad">Turma</label>
                        <Select className='labelSelect' options={optionsTurma}/>
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
    )
}

export default CadastroAluno;
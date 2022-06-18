import Navegacao from './Navegacao'

const RegistroDisciplina = () => {
    return (
        <>
            <Navegacao />
            <section className='content'>
                <div id="cadastro">
                    <form method="" action="">
                        <h1>Registro Turmas/Disciplinas</h1>

                        <p>
                            <label for="turma">Turma</label>
                            <input name="turma" type="text" placeholder="turma" />
                        </p>

                        <p>
                            <label for="disciplina">Disciplina</label>
                            <input name="disciplina" type="text" placeholder="disciplina" />
                        </p>

                        <p>
                            <label for="conteudo">Conteudo</label>
                            <input name="conteudo" type="text" placeholder="conteudo" />
                        </p>

                        <p>
                            <input type="submit" value="Salvar" />
                        </p>

                        <p class="link">
                            Ja registrou todos? Va para os alunos agora!
                            <a href="http://localhost:3000/Tabela">Alunos</a>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default RegistroDisciplina;
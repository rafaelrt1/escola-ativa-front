import Navegacao from './Navegacao'
import Table from 'react-bootstrap/Table';

const Turmas = () => {
    return (
        <>
            <Navegacao />
            <section className='content'>
                <div id="cadastro">
                    <form method="" action="">
                        <h1>Registro de Turmas</h1>

                        <p>
                            <label for="turma">Turma</label>
                            <input name="turma" type="text" placeholder="Digite a nova turma" />
                        </p>
                        <p>
                            <input type="submit" value="Salvar" />
                        </p>

                        <section>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Nome1</td>
                                        <td>
                                            <a href="#"><img src='../remover.png' /></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Nome1</td>
                                        <td>
                                            <a href="#"><img src='../remover.png' /></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Nome1</td>
                                        <td>
                                            <a href="#"><img src='../remover.png' /></a>
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>
                        </section>

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

export default Turmas;
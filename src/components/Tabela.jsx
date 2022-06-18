import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
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

const optionsDisciplina = [
    { value: 'Disciplina1', label: 'Disciplina 1' },
    { value: 'Disciplina2', label: 'Disciplina 2' },
    { value: 'Disciplina3', label: 'Disciplina 3' },
    { value: 'Disciplina4', label: 'Disciplina 4' },
    { value: 'Disciplina5', label: 'Disciplina 5' },
    { value: 'Disciplina6', label: 'Disciplina 6' },
    { value: 'Disciplina7', label: 'Disciplina 7' }
]

const Tabela = () => {
    return (
        <>
            <Navegacao />
            <Container>
                <section>
                    <p>
                        <label for="select_cad">Turma</label>
                        <Select className='labelSelect' options={optionsTurma} />
                    </p>

                    <p>
                        <label for="select_cad">Disciplina</label>
                        <Select className='labelSelect' options={optionsDisciplina} />
                    </p>
                </section>
                <section>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Nota 1</th>
                                <th>Nota 2</th>
                                <th>Nota 3</th>
                                <th>Nota 4</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rafael</td>
                                <td>2</td>
                                <td>2</td>
                                <td>2</td>
                                <td>2</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>Julia</td>
                                <td>2</td>
                                <td>2</td>
                                <td>2</td>
                                <td>2</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>Aline</td>
                                <td>2</td>
                                <td>2</td>
                                <td>2</td>
                                <td>2</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>Gustavo</td>
                                <td>2</td>
                                <td>2</td>
                                <td>2</td>
                                <td>2</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>Samael</td>
                                <td>2</td>
                                <td>2</td>
                                <td>2</td>
                                <td>2</td>
                                <td>8</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Conteudo:</td>
                                <td>Iniciação</td>
                                <td>Planejamento</td>
                                <td>Execução</td>
                                <td>Trabalho final</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </Table>
                </section>
            </Container>
        </>
    )
}
export default Tabela
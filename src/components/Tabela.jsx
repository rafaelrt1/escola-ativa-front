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
                <section >
                    <p>
                        <label for="select_cad">Disciplina</label>
                        <Select className='labelSelect' options={optionsDisciplina} />
                    </p>

                    <p>
                        <label for="select_cad">Turma</label>
                        <Select className='labelSelect' options={optionsTurma} />
                    </p>


                </section>
                <section>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Conteúdo</th>
                                <th>Fase</th>
                                <th>Nota</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rafael</td>
                                <td>teste</td>
                                <td>1</td>
                                <td>8</td>
                                <td>
                                    <a href="#"><img src='../remover.png' /></a>
                                    <a href="#" style={{ marginLeft: "5px" }}><img src='../editar.png' /></a>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>fgadfg</td>
                                <td>1</td>
                                <td>8</td>
                                <td>
                                    <a href="#"><img src='../remover.png' /></a>
                                    <a href="#" style={{ marginLeft: "5px" }}><img src='../editar.png' /></a>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>xxxx</td>
                                <td>1</td>
                                <td>8</td>
                                <td>
                                    <a href="#"><img src='../remover.png' /></a>
                                    <a href="#" style={{ marginLeft: "5px" }}><img src='../editar.png' /></a>
                                </td>
                            </tr>
                            <tr style={{ backgroundColor: "lightblue" }}>
                                <td><b>TOTAL:</b></td>
                                <td></td>
                                <td></td>
                                <td>24</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>ANA</td>
                                <td>aaaaa</td>
                                <td>1</td>
                                <td>8</td>
                                <td>
                                    <a href="#"><img src='../remover.png' /></a>
                                    <a href="#" style={{ marginLeft: "5px" }}><img src='../editar.png' /></a>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>teste</td>
                                <td>1</td>
                                <td>8</td>
                                <td>
                                    <a href="#"><img src='../remover.png' /></a>
                                    <a href="#" style={{ marginLeft: "5px" }}><img src='../editar.png' /></a>
                                </td>
                            </tr>
                            <tr style={{ backgroundColor: "lightblue" }}>
                                <td><b>TOTAL:</b></td>
                                <td></td>
                                <td></td>
                                <td>16</td>
                                <td></td>
                            </tr>

                        </tbody>

                    </Table>
                </section>
            </Container>
        </>
    )
}
export default Tabela
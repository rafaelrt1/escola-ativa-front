import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Navegacao = () => {
    return (
        <>

            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#">
                        <img
                        // https://img.icons8.com/offices/344/school.png
                            src="https://img.icons8.com/external-filled-outline-berkahicon/2x/external-school-survey-filled-outline-berkahicon.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />{'  '}
                        Escola Ativa
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{ marginLeft: "10%" }}>
                            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                                <NavDropdown.Item href="http://localhost:3000/Disciplinas">Disciplina</NavDropdown.Item>
                                <NavDropdown.Item href="http://localhost:3000/Turmas">Turma</NavDropdown.Item>
                                <NavDropdown.Item href="http://localhost:3000/Conteudos">Conteúdo</NavDropdown.Item>
                                <NavDropdown.Item href="http://localhost:3000/CadastroAluno">Aluno</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="http://localhost:3000/VincularTurmaDisciplina">Vincular Turma a Disciplina</Nav.Link>
                            <Nav.Link href="http://localhost:3000/DarNota">Dar Nota</Nav.Link>
                            <Nav.Link href="http://localhost:3000/Tabela">Tabela Pontuação</Nav.Link>
                        </Nav>
                        <Nav style={{ marginLeft: "10%" }} >
                            <Nav.Link href="http://localhost:3000/">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <br />
        </>
    )
}

export default Navegacao
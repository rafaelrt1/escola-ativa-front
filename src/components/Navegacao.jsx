import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Navegacao = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >Escola Ativa</Navbar.Brand>
                    <Nav className="me-auto" style={{marginLeft: "10%"}}>
                        <Nav.Link href="http://localhost:3000/CadastroAluno">Cadastro Aluno</Nav.Link>
                        <Nav.Link href="http://localhost:3000/Disciplinas">Disciplinas</Nav.Link>
                        <Nav.Link href="http://localhost:3000/Turmas">Turmas</Nav.Link>
                        <Nav.Link href="http://localhost:3000/Conteudos">Conteúdos</Nav.Link>
                        <Nav.Link href="http://localhost:3000/VincularTurmaDisciplina">Vincular Turma a Disciplina</Nav.Link>                        
                        <Nav.Link href="http://localhost:3000/DarNota">Dar Nota</Nav.Link>
                        <Nav.Link href="http://localhost:3000/Tabela">Tabela</Nav.Link>                        
                        <Nav.Link href="http://localhost:3000/">Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br/>
        </>
    )
}

export default Navegacao
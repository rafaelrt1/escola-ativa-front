import Select from 'react-select'
import Navegacao from './Navegacao'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';

const CadastroAluno = () => {
    const [optionsTurma, setOptionsTurma] = useState([]);
    const [alunos, setAlunos] = useState();
    const [newAluno, setNewAluno] = useState();
    const [selectedTurma, setSelectedTurma] = useState([]);

    const getTurmas = () => {
        try {
            fetch('http://localhost:5000/turmas', {
                method:'GET', 
                mode:"cors"
            }
            ).then(res => res.json())
            .then((result) => {
                let turmas = [];
                result.forEach(function(turma) {
                    turmas.push({ value: turma.id, label: turma.nome})
                });
                setOptionsTurma(turmas);
                console.log(turmas);
            },(error) => {
                console.error(error)
            });
        } catch(e) {
            console.error(e)  
        }
    }

    const getAlunos = () => {
        try {
            fetch('http://localhost:5000/alunos', {
                method:'GET', 
                mode:"cors"
            }
            ).then(res => res.json())
            .then((result) => {
                setAlunos(result)
            },(error) => {
                console.error(error)
            });
        } catch(e) {
            console.error(e)  
        }
    }

    const handleChange = (e) => {
        setSelectedTurma(e.value);      
    }

    const apagarAluno = () => {
        return
    }

    useEffect(() => {
        getTurmas();
        getAlunos();
    }, []);

    return (
        <>
            <Navegacao />
            <section className='content'>

                <div id="cadastro">
                    <form method="post" action="">
                        <h1>Cadastro de Aluno</h1>

                        <p>
                            <label for="nome_cad">Nome Completo</label>
                            <input id="nome_cad" name="nome_cad" required="required" type="text" placeholder="Digite o nome completo" />
                        </p>

                        <p>
                            <label for="select_cad">Turma</label>
                            <Select className='labelSelect' options={optionsTurma} onChange={handleChange}/>
                        </p>

                        <p>
                            <input type="submit" value="Cadastrar" />
                        </p>

                        { (alunos && alunos.length) ?
                            <section>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nome</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { alunos.map(function(aluno, key) {
                                        return (
                                        <tr key={key}>
                                            <td>{aluno.idAluno}</td>
                                            <td className='nome' id={aluno.idAluno}>{aluno.nome}</td>
                                            <td className='turma' id={aluno.idTurma}>{aluno.turma}</td>
                                            <td key={aluno.id}>
                                                <a href="#" onClick={apagarAluno} id={aluno.id}><img src='../remover.png' id={aluno.id} /></a>
                                            </td>
                                        </tr>
                                        )
                                    }) }
                                    </tbody>
                                </Table>
                            </section>
                        :   <>
                            </> 
                        }

                        {/* <section>
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
                        </section> */}

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
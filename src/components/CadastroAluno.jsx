import Select from 'react-select'
import Navegacao from './Navegacao'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Footer from './Footer';

const CadastroAluno = () => {
    const [optionsTurma, setOptionsTurma] = useState([]);
    const [alunos, setAlunos] = useState();
    const [newAluno, setNewAluno] = useState('');
    const [newAlunoId, setNewAlunoId] = useState();
    const [selectedTurma, setSelectedTurma] = useState('');
    const [selectedTurmaNome, setSelectedTurmaNome] = useState('');
    const [visibleRegister, setVisibleRegister] = useState(true);
    const [visibleFeedback, setVisibleFeedback] = useState(false);
    const [feedback, setFeedback] = useState();

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

    const createAluno = (e) => {
        try {
            e.preventDefault();
            fetch('http://localhost:5000/aluno', {
                method:'POST',
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"aluno": newAluno, "turma": selectedTurma})
            }
            ).then(res => res.json())
            .then((result) => {
                getAlunos();
                setNewAlunoId();
                setNewAluno('');
                setSelectedTurmaNome('');
                setSelectedTurma('');
            },(error) => {
                console.error(error)
            });
        } catch(e) {
            console.error(e)  
        }
    }

    const apagarAluno = (event) => {
        let id = parseInt(event.target.id);
        try {
            event.preventDefault();
            fetch('http://localhost:5000/aluno', {
                method:'DELETE', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"aluno": id}
            )}).then(res => res.json())
            .then((result) => {
                if(result.error) {
                    setFeedback('Esta aluno não pode ser excluída porque existem registros relacionados a ela');
                    setVisibleFeedback(true);
                    setNewAlunoId();
                    setNewAluno('');
                    setSelectedTurmaNome('');
                    setSelectedTurma('');
                    setTimeout(function() {
                        setVisibleFeedback(false);
                    },1500);
                }
                else {
                    setFeedback('Aluno excluído');
                    setVisibleFeedback(true);
                    getTurmas();
                    setNewAlunoId();
                    setNewAluno('');
                    setSelectedTurmaNome('');
                    setSelectedTurma('');
                    setTimeout(function() {
                        setVisibleFeedback(false);
                    },1500);
                }
                getAlunos();
            },(error) => {
                console.error(error)
            });
        } catch(e) {
              console.error(e)  
        }
    }

    const editarTurmaAluno = (event) => {
        try {
            event.preventDefault();
            fetch('http://localhost:5000/turma-aluno',{
                method:'PUT', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"turma": selectedTurma, "novoAluno": newAluno, "aluno": newAlunoId}
            )}).then(res => res.json())
            .then((result) => {
                    getTurmas();
                    getAlunos();
                    setVisibleRegister(true);
                    setNewAlunoId();
                    setNewAluno('');
                    setSelectedTurmaNome('');
                    setSelectedTurma('');
            },(error) => {
                console.error(error)
            });
        } catch(e) {
              console.error(e)  
        }
    }

    const Parent = ({ children }) => {
        return (
            <div className="feedback-message">
                {children}
            </div>
        );
    }
    
    const Child = () => {
        return (
            <div className="feedback">
                 <span className="text">{feedback}</span>
             </div>
        );
    }

    useEffect(() => {
        getTurmas();
        getAlunos();
    }, []);

    return (
        <>
            <Navegacao />
            <Parent>{visibleFeedback ? <Child /> : null}</Parent>
            <section className='content'>

                <div id="cadastro">
                    <form>
                        <h1>Cadastro de Aluno</h1>

                        <div>
                            <label htmlFor="nome_cad">Nome Completo</label>
                            <input id="nome_cad" value={newAluno} onChange={(e)=>{setNewAluno(e.target.value)}} name="nome_cad" required="required" type="text" placeholder="Digite o nome completo" />
                        </div>

                        <div>
                            <label htmlFor="select_cad">Turma</label>
                            <Select className='labelSelect' value={{label: selectedTurmaNome, value: selectedTurma}} options={optionsTurma} onChange={(e) => {
                                setSelectedTurma(e.value);
                                setSelectedTurmaNome(e.label);
                            }}/>
                        </div>

                        { visibleRegister ?
                            <div>
                                <button className="button" onClick={ createAluno } disabled={!newAluno || !selectedTurma}>Cadastrar</button>
                            </div> :
                            <div>
                                <div>
                                    <button className="button" onClick={(e)=>{ editarTurmaAluno(e) }} disabled={!newAluno || !selectedTurma}>Alterar</button>
                                </div>
                                <div>
                                    <button className="button red" onClick={() => { 
                                        setVisibleRegister(true);
                                        setNewAlunoId();
                                        setNewAluno('');
                                        setSelectedTurmaNome('');
                                        setSelectedTurma(''); 
                                    }}>Cancelar</button>
                                </div>
                            </div>
                        }

                        { (alunos && alunos.length) ?
                            <section>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nome</th>
                                            <th>Turma</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { alunos.map(function(aluno, key) {
                                        return (
                                        <tr key={key}>
                                            <td>{aluno.idAluno}</td>
                                            <td className='nome' id={aluno.idAluno}>{aluno.nome}</td>
                                            <td className='turma' id={aluno.idTurma} data-aluno={aluno.idAluno}>{aluno.turma}</td>
                                            <td key={aluno.id}>
                                                <a href="#" onClick={apagarAluno} id={aluno.idAluno}><img src='../remover.png' id={aluno.idAluno} /></a>
                                                <a href="#" onClick={(e)=>{
                                                    e.preventDefault();
                                                    let id = parseInt(e.target.id);
                                                    let selected = alunos.filter(function(aluno) {
                                                        return aluno.idAluno === id;
                                                    });
                                                    setNewAluno(selected[0].nome);
                                                    setNewAlunoId(selected[0].idAluno);
                                                    setSelectedTurmaNome(selected[0].turma);
                                                    setSelectedTurma(selected[0].idTurma)
                                                    setVisibleRegister(false);}} id={aluno.idAluno}><img src='../editar.png' id={aluno.idAluno} /></a>
                                            </td>
                                        </tr>
                                        )
                                    }) }
                                    </tbody>
                                </Table>
                            </section>
                        :   null
                        }

                        <p className="link">
                            Pronto para cadastrar os conteúdos?
                            <a href="http://localhost:3000/Conteudos">Conteúdos</a>
                        </p>
                    </form>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export default CadastroAluno;
import Navegacao from './Navegacao'
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import Footer from './Footer';

const Turmas = () => {
    const [turmas, setTurmas] = useState();
    const [newTurma, setNewTurma] = useState('');
    const [newTurmaId, setNewTurmaId] = useState();
    const [visibleFeedback, setVisibleFeedback] = useState(false);
    const [visibleRegister, setVisibleRegister] = useState(true);
    const [feedback, setFeedback] = useState();

    const getTurmas = () => {
        try {
            fetch('http://localhost:5000/turmas', {
                method:'GET', 
                mode:"cors"
            }
            ).then(res => res.json())
            .then((result) => {
                setTurmas(result)
            },(error) => {
                console.error(error)
            });
        } catch(e) {
            console.error(e)  
        }
    }

    const enviarTurma = (event) => {
        event.preventDefault();
        try {
            fetch('http://localhost:5000/turma',{
                method:'POST', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"turma": newTurma}
            )}).then(res => res.json())
            .then((result) => {
                    getTurmas();
                },(error) => {
                    console.error(error)
                }
            );
        } catch(e) {
              console.error(e)  
        }
    }

    const apagarTurma = (event) => {
        event.preventDefault();
        let turma = parseInt(event.target.id);
        try {           
            fetch('http://localhost:5000/turma', {
                method:'DELETE', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"turma": turma}
            )}).then(res => res.json())
            .then((result) => {
                if(result.error) {
                    setFeedback('Esta turma não pode ser excluída porque existem registros relacionados a ela');
                    setVisibleFeedback(true);
                    setTimeout(function() {
                        setVisibleFeedback(false);
                    },1500);
                }
                else if (result.success) {
                    setFeedback('Turma excluída');
                    setVisibleFeedback(true);
                    getTurmas();
                    setTimeout(function() {
                        setVisibleFeedback(false);
                    },1500);
                }
            },(error) => {
                console.error(error)
            });
        
        } catch(e) {
            console.error(e)  
        }
    }

    const editarTurma = (event) => {
        try {
            event.preventDefault();
            fetch('http://localhost:5000/turma',{
                method:'PUT', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"turma": newTurmaId, "novoNomeTurma": newTurma}
            )}).then(res => res.json())
            .then((result) => {
                    getTurmas();
                    setVisibleRegister(true);
            },(error) => {
                console.error(error)
            });
        } catch(e) {
              console.error(e)  
        }
    }

    useEffect(() => {
        getTurmas();
    }, []);

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

    return (
        <>
            <Navegacao />
            <Parent>{visibleFeedback ? <Child /> : null}</Parent>
            <section className='content'>
                <div id="cadastro">
                    <form>
                        <h1>Registro de Turmas</h1>

                        <div>
                            <label htmlFor="turma">Turma</label>
                            <input value={newTurma} onChange={(e)=>{setNewTurma(e.target.value)}} name="turma" type="text" placeholder="Digite a nova turma" />
                        </div>
                        { visibleRegister ?
                            <div>
                                <button className="button" onClick={ enviarTurma } disabled={!newTurma}>Salvar</button>
                            </div> :
                            <div>
                                <div>
                                    <button className="button" onClick={(e)=>{ editarTurma(e) }} disabled={!newTurma}>Alterar</button>
                                </div>
                                <div>
                                    <button className="button red" onClick={() => { setVisibleRegister(true) }}>Cancelar</button>
                                </div>
                            </div>
                        }

                        { (turmas && turmas.length > 0) ?
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
                                    { turmas.map(function(turma, key) {
                                        return (
                                        <tr key={key}>
                                            <td>{turma.id}</td>
                                            <td className='nome' id={turma.id}>{turma.nome}</td>
                                            <td key={turma.id}>
                                                <a href="#" onClick={(e) => apagarTurma(e) } id={turma.id}><img src='../remover.png' id={turma.id} /></a>
                                                <a href="#" onClick={(e)=>{
                                                    e.preventDefault();
                                                    let id = parseInt(e.target.id);
                                                    let selected = turmas.filter(function(turma) {
                                                        return turma.id === id;
                                                    });
                                                    setNewTurma(selected[0].nome);
                                                    setNewTurmaId(selected[0].id);
                                                    setVisibleRegister(false);}} 
                                                    id={turma.id}><img src='../editar.png' id={turma.id} /></a>
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
                            Pronto para vincular as turmas às disciplinas?
                            <a href="http://localhost:3000/VincularTurmaDisciplina">Vincular Turmas às Disciplinas</a>
                        </p>
                    </form>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export default Turmas;
import Navegacao from './Navegacao'
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import Footer from './Footer';

const Disciplinas = () => {
    const [disciplinas, setDisciplinas] = useState();
    const [newDisciplina, setNewDisciplina] = useState('');
    const [newDisciplinaId, setNewDisciplinaId] = useState();
    const [visibleRegister, setVisibleRegister] = useState(true);
    const [feedback, setFeedback] = useState();
    const [visibleFeedback, setVisibleFeedback] = useState(false);

    const getDisciplinas = () => {
        try {
            fetch('http://localhost:5000/disciplinas', {
                method:'GET', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            }
            ).then(res => res.json())
            .then((result) => {
                setDisciplinas(result);
            },(error) => {
                console.error(error);
            });
        } catch(e) {
            console.error(e);
        }
    }

    const enviarDisciplina = (event) => {
        event.preventDefault();
        try {
            fetch('http://localhost:5000/disciplina',{
                method:'POST', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"disciplina": newDisciplina}
            )}).then(res => res.json())
            .then((result) => {
                    getDisciplinas();
                    setNewDisciplina('');
                    setNewDisciplinaId();
                },(error) => {
                    console.error(error);
                }
            );
        } catch(e) {
              console.error(e);
        }
    }

    const apagarDisciplina = (event) => {
        event.preventDefault();
        let id = parseInt(event.target.id);
        try {
            fetch('http://localhost:5000/disciplina',{
                method:'DELETE', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"disciplina": id}
            )}).then(res => res.json())
            .then((result) => {
                if(result.error) {
                    setFeedback('Esta disciplina não pode ser excluída porque existem registros relacionados a ela');
                    setVisibleFeedback(true);
                    setNewDisciplina('');
                    setNewDisciplinaId();
                    setTimeout(function() {
                        setVisibleFeedback(false);
                    },1500);
                }
                else if (result.success) {
                    setFeedback('Disciplina excluída');
                    setVisibleFeedback(true);
                    setNewDisciplina('');
                    setNewDisciplinaId();
                    setTimeout(function() {
                        setVisibleFeedback(false);
                    },1500);
                    getDisciplinas();
                }
                },(error) => {
                    console.error(error);
                }
            );
        } catch(e) {
              console.error(e)  
        }
    }

    const editarDisciplina = (event) => {
        event.preventDefault();
        try {
            fetch('http://localhost:5000/disciplina',{
                method:'PUT', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"id": newDisciplinaId, "nome": newDisciplina})
            }).then(res => res.json())
            .then((result) => {
                    setVisibleRegister(true);
                    getDisciplinas();
                    setNewDisciplina('');
                    setNewDisciplinaId();
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
        getDisciplinas();
    }, []);

    return (
        <>
            <Navegacao />
            <Parent>{visibleFeedback ? <Child /> : null}</Parent>
            <section className='content'>
                <div id="cadastro">
                    <form>
                        <h1>Registro de Disciplinas</h1>

                        <div>
                            <label htmlFor="disciplina">Disciplina</label>
                            <input value={newDisciplina} onChange={(e)=>{ setNewDisciplina(e.target.value) }} name="disciplina" type="text" placeholder="Digite a nova disciplina" />
                        </div>
                        { visibleRegister ?
                            <div>
                                <button className="button" onClick={ enviarDisciplina } disabled={!newDisciplina} >Salvar</button>
                            </div> :
                            <div>
                                <div>
                                    <button className="button" onClick={(e)=>{ editarDisciplina(e) }} disabled={!newDisciplina}>Alterar</button>
                                </div>
                                <div>
                                    <button className="button red" onClick={() => { setVisibleRegister(true); setNewDisciplina(''); setNewDisciplinaId(); }}>Cancelar</button>
                                </div>
                            </div>
                        }

                        { (disciplinas && disciplinas.length > 0) ?
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
                                    { disciplinas.map(function(disciplina, key) {
                                        return (
                                        <tr key={key}>
                                            <td>{disciplina.id}</td>
                                            <td className='nome' id={disciplina.id}>{disciplina.nome}</td>
                                            <td key={disciplina.id}>
                                                <a href="#" onClick={apagarDisciplina} id={disciplina.id}><img alt='iconTrash' src='../remover.png' id={disciplina.id} /></a>
                                                <a href="#" onClick={(e)=>{
                                                    e.preventDefault();
                                                    let id = parseInt(e.target.id);
                                                    let selected = disciplinas.filter(function(disciplina) {
                                                        return disciplina.id === id;
                                                    });
                                                    setNewDisciplina(selected[0].nome);
                                                    setNewDisciplinaId(selected[0].id);
                                                    setVisibleRegister(false);}} 
                                                    id={disciplina.id}><img alt='iconTrash' src='../editar.png' id={disciplina.id} /></a>
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
                            Pronto para cadastrar as turmas?
                            <a href="http://localhost:3000/Turmas">Turmas</a>
                        </p>
                    </form>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export default Disciplinas;
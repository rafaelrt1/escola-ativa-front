import Navegacao from './Navegacao'
import Table from 'react-bootstrap/Table';
import Footer from './Footer';
import { useEffect, useState } from 'react';

const Conteudos = () => {
    const [conteudos, setConteudos] = useState();
    const [newConteudo, setNewConteudo] = useState('');
    const [newConteudoId, setNewConteudoId] = useState();
    const [visibleRegister, setVisibleRegister] = useState(true);
    const [feedback, setFeedback] = useState();
    const [visibleFeedback, setVisibleFeedback] = useState(false);

    const getConteudos = () => {
        try {
            fetch('http://localhost:5000/conteudos', {
                method:'GET', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            }
            ).then(res => res.json())
            .then((result) => {
                setConteudos(result)
            },(error) => {
                console.error(error)
            });
        } catch(e) {
            console.error(e)  
        }
    }

    const enviarConteudo = (event) => {
        event.preventDefault();
        try {
            fetch('http://localhost:5000/conteudo',{
                method:'POST', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"conteudo": newConteudo}
            )}).then(res => res.json())
            .then((result) => {
                    getConteudos();
                },(error) => {
                    console.error(error)
                }
            );
        } catch(e) {
              console.error(e)  
        }
    }

    const apagarConteudo = (event) => {
        event.preventDefault();
        let id = parseInt(event.target.id);
        try {
            fetch('http://localhost:5000/conteudo',{
                method:'DELETE', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"conteudo": id}
            )}).then(res => res.json())
            .then((result) => {
                if(result.error) {
                    setFeedback('Esta conteúdo não pode ser excluída porque existem registros relacionados a ela');
                    setVisibleFeedback(true);
                    setTimeout(function() {
                        setVisibleFeedback(false);
                    },1500);
                }
                else if (result.success) {
                    setFeedback('Conteúdo excluído');
                    setVisibleFeedback(true);
                    setTimeout(function() {
                        setVisibleFeedback(false);
                    },1500);
                    getConteudos();
                }
                },(error) => {
                    console.error(error)
                }
            );
        } catch(e) {
              console.error(e)  
        }
    }

    const editarConteudo = (event) => {
        event.preventDefault();
        try {
            fetch('http://localhost:5000/conteudo',{
                method:'PUT', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"id": newConteudoId, "nome": newConteudo})
            }).then(res => res.json())
            .then((result) => {
                    setVisibleRegister(true);
                    getConteudos();
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
        getConteudos();
    }, []);

    return (
        <>
            <Navegacao />
            <Parent>{visibleFeedback ? <Child /> : null}</Parent>
            <section className='content'>
                <div id="cadastro">
                    <form method="" action="">
                        <h1>Registro de Conteúdos</h1>

                        <div>
                            <label for="conteudo">Conteúdo</label>
                            <input value={newConteudo} onChange={(e)=>{ setNewConteudo(e.target.value) }} name="conteudo" type="text" placeholder="Digite o novo conteúdo" />
                        </div>

                        { visibleRegister ?
                            <div>
                                <button className="button" onClick={ enviarConteudo } disabled={!newConteudo}>Salvar</button>
                            </div> :
                            <div>
                                <div>
                                    <button className="button" onClick={(e)=>{ editarConteudo(e) }} disabled={!newConteudo}>Alterar</button>
                                </div>
                                <div>
                                    <button className="button red" onClick={() => { setVisibleRegister(true) }}>Cancelar</button>
                                </div>
                            </div>
                        }

                        { (conteudos && conteudos.length > 0) ?
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
                                    { conteudos.map(function(conteudo, key) {
                                        return (
                                        <tr key={key}>
                                            <td>{conteudo.id}</td>
                                            <td className='nome' id={conteudo.id}>{conteudo.nome}</td>
                                            <td key={conteudo.id}>
                                                <a href="#" onClick={apagarConteudo} id={conteudo.id}><img alt='iconTrash' src='../remover.png' id={conteudo.id} /></a>
                                                <a href="#" onClick={(e)=>{
                                                    e.preventDefault();
                                                    let id = parseInt(e.target.id);
                                                    let selected = conteudos.filter(function(conteudo) {
                                                        return conteudo.id === id;
                                                    });
                                                    setNewConteudo(selected[0].nome);
                                                    setNewConteudoId(selected[0].id);
                                                    setVisibleRegister(false);}} 
                                                    id={conteudo.id}><img alt='iconTrash' src='../editar.png' id={conteudo.id} /></a>
                                            </td>
                                        </tr>
                                        )
                                    }) }
                                    </tbody>
                                </Table>
                            </section>
                        :   null
                        }

                        <p class="link">
                            Ja registrou todos? Va para os alunos agora!
                            <a href="http://localhost:3000/Tabela">Alunos</a>
                        </p>
                    </form>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export default Conteudos;
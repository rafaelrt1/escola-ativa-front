import Navegacao from './Navegacao'
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import $, { event } from 'jquery';

const Turmas = () => {
    const [turmas, setTurmas] = useState();
    const [newTurma, setNewTurma] = useState();
    const [visible, setVisible] = useState(false);
    const [selectedTurma, setSelectedTurma] = useState(false);

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

    const apagarTurma = () => {
        console.log(selectedTurma);
        // try {
        //     fetch('http://localhost:5000/turma', {
        //         method:'DELETE', 
        //         mode:"cors",
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json;charset=UTF-8'
        //         },
        //         body: JSON.stringify({"turma": id}
        //     )}).then(res => res.json())
        //     .then((result) => {
        //         getTurmas();
        //     },(error) => {
        //         console.error(error)
        //     });
        // } catch(e) {
        //     console.error(e)  
        // }
    }

    const editarTurma = (id, novoNome) => {
        try {
            fetch('http://localhost:5000/turma',{
                method:'PUT', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"turma": id, "novoNomeTurma":novoNome}
            )}).then(res => res.json())
            .then((result) => {
                    getTurmas();
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
    
    $(function () {
        $("td.nome").dblclick(function () {
            let conteudoOriginal = $(this).text();
            if(conteudoOriginal) {
                let divOriginal = $(this);
                let id = $(this)[0].id;
            
                $(this).addClass("celulaEmEdicao");
                $(this).html(`<input type='text' value="${conteudoOriginal}" />`);
                $(this).children().first().focus();

                $(this).children().first().keypress(function (e) {
                    if (e.which === 13) {
                        var novoConteudo = $(this).val();
                        $(this).parent().text(novoConteudo);
                        $(this).parent().removeClass("celulaEmEdicao");
                        editarTurma(parseInt(id), novoConteudo);
                    }
                });

                $(this).children().first().blur(function(){
                    $(this).parent().text(conteudoOriginal);
                    $(this).parent().removeClass("celulaEmEdicao");
                });
            }
        });
    });

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
                 <p className="text">Esta ação também irá remover tudo que é vinculado a esta turma. Deseja realmente prosseguir?</p>
                 <div className="buttons">
                     <button className="button" onClick={() => {apagarTurma()}}>Sim</button>
                     <button className="button" onClick={() => {setVisible(false)}}>Não</button>
                 </div>
             </div>
        );
    }

    const handleClick = (e) => {
        setSelectedTurma(parseInt(e.target.id));
        setVisible(true);
    }

    return (
        <>
            <Navegacao />
            <Parent>{visible ? <Child /> : null}</Parent>
            <section className='content'>
                <div id="cadastro">
                    <form onSubmit={enviarTurma}>
                        <h1>Registro de Turmas</h1>

                        <p>
                            <label htmlFor="turma">Turma</label>
                            <input onChange={(e)=>{setNewTurma(e.target.value)}} name="turma" type="text" placeholder="Digite a nova turma" />
                        </p>
                        <p>
                            <input type="submit" value="Salvar" />
                        </p>

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
                                                <a href="#" onClick={(e) => handleClick(e)} id={turma.id}><img src='../remover.png' id={turma.id} /></a>
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

                        <p className="link">
                            Pronto para vincular as turmas às disciplinas?
                            <a href="http://localhost:3000/VincularTurmaDisciplina">Vincular Turmas às Disciplinas</a>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Turmas;
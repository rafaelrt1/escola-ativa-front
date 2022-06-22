import Navegacao from './Navegacao'
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import $ from 'jquery';

const Disciplinas = () => {
    const [disciplinas, setDisciplinas] = useState();
    const [newDisciplina, setNewDisciplina] = useState();

    const getDisciplinas = () => {
        try {
            fetch('http://localhost:5000/disciplinas', {
                method:'GET', 
                mode:"cors"
            }
            ).then(res => res.json())
            .then((result) => {
                setDisciplinas(result)
                console.log(disciplinas)
            },(error) => {
                console.error(error)
            });
        } catch(e) {
            console.error(e)  
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
                    console.log(result);
                    getDisciplinas();
                },(error) => {
                    console.error(error)
                }
            );
        } catch(e) {
              console.error(e)  
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
                    console.log(result);
                    getDisciplinas();
                },(error) => {
                    console.error(error)
                }
            );
        } catch(e) {
              console.error(e)  
        }
    }

    const editarDisciplina = (id, novoNome) => {
        try {
            fetch('http://localhost:5000/disciplina',{
                method:'PUT', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"id": id, "nome": novoNome}
            )}).then(res => res.json())
            .then((result) => {
                    getDisciplinas();
            },(error) => {
                console.error(error)
            });
        } catch(e) {
              console.error(e)  
        }
    }

    useEffect(() => {
        getDisciplinas();
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
                        editarDisciplina(parseInt(id), novoConteudo);
                    }
                });

                $(this).children().first().blur(function(){
                    $(this).parent().text(conteudoOriginal);
                    $(this).parent().removeClass("celulaEmEdicao");
                });
            }
        });
    });

    return (
        <>
            <Navegacao />
            <section className='content'>
                <div id="cadastro">
                    <form onSubmit={enviarDisciplina}>
                        <h1>Registro de Disciplinas</h1>

                        <p>
                            <label htmlFor="disciplina">Disciplina</label>
                            <input onChange={(e)=>{setNewDisciplina(e.target.value)}} name="disciplina" type="text" placeholder="Digite a nova disciplina" required />
                        </p>

                        <p>
                            <input type="submit" value="Salvar" />
                        </p>

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
                            Pronto para cadastrar as turmas?
                            <a href="http://localhost:3000/Turmas">Turmas</a>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Disciplinas;
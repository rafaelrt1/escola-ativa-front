import Select from 'react-select'
import Navegacao from './Navegacao'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import $ from 'jquery';

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
                setOptionsTurma(turmas)
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
        e.preventDefault();
        try {
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

    const apagarAluno = (event) => {
        let id = parseInt(event.target.id);
        console.log(id)
        try {
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
                getAlunos();
            },(error) => {
                console.error(error)
            });
        } catch(e) {
              console.error(e)  
        }
    }

    const editarTurmaAluno = (id, novoNome) => {
        console.log(id, novoNome)
        // try {
        //     fetch('http://localhost:5000/turma-aluno',{
        //         method:'PUT', 
        //         mode:"cors",
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json;charset=UTF-8'
        //         },
        //         body: JSON.stringify({"turma": id, "novoNomeTurma":novoNome}
        //     )}).then(res => res.json())
        //     .then((result) => {
        //             getTurmas();
        //     },(error) => {
        //         console.error(error)
        //     });
        // } catch(e) {
        //       console.error(e)  
        // }
    }

    const editarAluno = (id, novoNome) => {
        console.log(id, novoNome)
        // try {
        //     fetch('http://localhost:5000/turma',{
        //         method:'PUT', 
        //         mode:"cors",
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json;charset=UTF-8'
        //         },
        //         body: JSON.stringify({"turma": id, "novoNomeTurma":novoNome}
        //     )}).then(res => res.json())
        //     .then((result) => {
        //             getTurmas();
        //     },(error) => {
        //         console.error(error)
        //     });
        // } catch(e) {
        //       console.error(e)  
        // }
    }

    useEffect(() => {
        getTurmas();
        getAlunos();
    }, []);

    $(function () {
        $("td.nome, td.turma").dblclick(function () {
            let conteudoOriginal = $(this).text();
            if(conteudoOriginal) {
                console.log($(this).parent())
                let type = ($(this).parent().prevObject[0].classList[0]);
                let divOriginal = $(this);
                if (type === "turma") {
                    let idAluno = $(this).parent().prevObject[0].attributes["data-aluno"].value;
                    console.log(idAluno)
                }
                let id = $(this)[0].id;
            
                $(this).addClass("celulaEmEdicao");
                $(this).html(`<input type='text' value="${conteudoOriginal}" />`);
                $(this).children().first().focus();

                $(this).children().first().keypress(function (e) {
                    if (e.which === 13) {
                        var novoConteudo = $(this).val();
                        $(this).parent().text(novoConteudo);
                        $(this).parent().removeClass("celulaEmEdicao");
                        if (type === 'turma')
                            editarTurmaAluno(parseInt(id), novoConteudo);
                        else 
                            editarAluno(parseInt(id), novoConteudo);
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
                    <form onSubmit={createAluno}>
                        <h1>Cadastro de Aluno</h1>

                        <div>
                            <label htmlFor="nome_cad">Nome Completo</label>
                            <input id="nome_cad" onChange={(e)=>{setNewAluno(e.target.value)}} name="nome_cad" required="required" type="text" placeholder="Digite o nome completo" />
                        </div>

                        <div>
                            <label htmlFor="select_cad">Turma</label>
                            <Select className='labelSelect' options={optionsTurma} onChange={handleChange}/>
                        </div>

                        <div>
                            <input type="submit" value="Cadastrar" />
                        </div>

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
                                            <td className='turma' id={aluno.idTurma} data-aluno={aluno.idAluno}>{aluno.turma}</td>
                                            <td key={aluno.id}>
                                                <a href="#" onClick={apagarAluno} id={aluno.idAluno}><img src='../remover.png' id={aluno.idAluno} /></a>
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
                            Pronto para cadastrar os conteúdos?
                            <a href="http://localhost:3000/Conteudos">Conteúdos</a>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CadastroAluno;
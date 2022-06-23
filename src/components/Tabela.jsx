import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import BaseSelect from 'react-select'
import Navegacao from './Navegacao'
import RequiredSelect from "./RequiredSelect"

const Tabela = () => {
    const [optionsTurma, setOptionsTurma] = useState([]);
    const [optionsDisciplina, setOptionsDisciplina] = useState([]);
    const [selectedTurma, setSelectedTurma] = useState([]);
    const [selectedDisciplina, setSelectedDisciplina] = useState([]);
    const [dadosTabela, setDadosTabela] = useState([]);
    const [notasFinais, setNotasFinais] = useState([]);

    const SelectD = props => (
        <RequiredSelect
          {...props}
          SelectComponent={BaseSelect}
          options={optionsDisciplina}
        />
      );
    
      const SelectT = props => (
        <RequiredSelect
          {...props}
          SelectComponent={BaseSelect}
          options={optionsTurma}
        />
      );

    const getDisciplinas = () => {
        try {
            fetch('http://localhost:5000/disciplinas', {
                method: 'GET',
                mode: "cors"
            }
            ).then(res => res.json())
                .then((result) => {
                    let disciplinas = [];
                    result.forEach(function (disciplina) {
                        disciplinas.push({ value: disciplina.id, label: disciplina.nome })
                    });
                    setOptionsDisciplina(disciplinas)
                }, (error) => {
                    console.error(error)
                });
        } catch (e) {
            console.error(e)
        }
    }

    const getTurmas = () => {
        if (selectedDisciplina) {
            try {
                fetch('http://localhost:5000/turmas/' + selectedDisciplina, {
                    method: 'GET',
                    mode: "cors"
                }
                ).then(res => res.json())
                    .then((result) => {
                        let turmas = [];
                        result.forEach(function (turma) {
                            turmas.push({ value: turma.id, label: turma.nome })
                        });
                        setOptionsTurma(turmas)
                    }, (error) => {
                        console.error(error)
                    });
            } catch (e) {
                console.error(e)
            }
            // }else{
            //     setOptionsTurma([{value: '', label: 'Selecione uma disciplina'}])
        }
    }



    const getPontuacao = () => {
        if (selectedDisciplina && selectedTurma) {
            try {
                fetch(`http://localhost:5000/pontuacao?disc=${selectedDisciplina}&tur=${selectedTurma}`, {
                    method: 'GET',
                    mode: "cors"
                }
                ).then(res => res.json())
                    .then((result) => {
                        let pontuacao = [];
                        result.forEach(function (data) {
                            pontuacao.push({
                                aluno: data.nomeAluno,
                                conteudo: data.conteudo,
                                fase: data.fase,
                                nota: data.nota,
                                idPon: data.idPon
                            })
                        });
                        setDadosTabela(pontuacao)
                    }, (error) => {
                        console.error(error)
                    });
            } catch (e) {
                console.error(e)
            }
        }
    }

    const getNotaFinal = () => {
        if (selectedDisciplina && selectedTurma) {
            try {
                fetch(`http://localhost:5000/notafinal?disc=${selectedDisciplina}&tur=${selectedTurma}`, {
                    method: 'GET',
                    mode: "cors"
                }
                ).then(res => res.json())
                    .then((result) => {
                        let notas = [];
                        result.forEach(function (data) {
                            notas.push({
                                aluno: data.nomeAlu,
                                notaFinal: data.notaFinal
                            })
                        });
                        setNotasFinais(notas)
                    }, (error) => {
                        console.error(error)
                    });
            } catch (e) {
                console.error(e)
            }
        }
    }


    useEffect(() => {
        getTurmas();
        getDisciplinas();
        getPontuacao();
        getNotaFinal();
    }, [selectedDisciplina, selectedTurma]);

    const handleChange = (type, e, action) => {
        if (type === "turma"){
            setSelectedTurma(e.value);
        }else{
            setSelectedDisciplina(e.value);
            // setSelectedTurma(null);
        }
    }

    function apagarPontuacao(id) {
        try {
            fetch('http://localhost:5000/pontuacao', {
                method: 'DELETE',
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({ "pontuacao": id }
                )
            }).then(res => res.json())
                .then((result) => {
                    console.log(result);
                    getPontuacao();
                }, (error) => {
                    console.error(error)
                }
                );
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <Navegacao />
            <Container>
                <section>
                    <h1>Pontuação</h1>
                </section>
                <section >
                    <p>
                        <label for="select_cad">Disciplina</label>
                        <SelectD className='labelSelect'  onChange={handleChange.bind("disciplina", "disciplina")} required/>
                    </p>

                    <p>
                        <label for="select_cad">Turma</label>
                        <SelectT className='labelSelect' onChange={handleChange.bind("turma", "turma")} required/>
                    </p>


                </section>
                {(dadosTabela && dadosTabela.length) ?
                    <section>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Aluno</th>
                                    <th>Conteúdo</th>
                                    <th>Fase</th>
                                    <th>Nota</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dadosTabela.map(function (dados, key) {
                                    return (
                                        <tr key={key}>
                                            {/* <td>{dados.idAluno}</td> */}
                                            <th className='nome' id={dados.aluno}>{dados.aluno}</th>
                                            <td className='conteudo' id={dados.conteudo}>{dados.conteudo}</td>
                                            <td className='fase' id={dados.fase}>{dados.fase}</td>
                                            <td className='nota' id={dados.nota}>{dados.nota}</td>
                                            <td key={dados.idPon}>
                                                <a title='Apagar pontuação' href="#" onClick={() => apagarPontuacao(dados.idPon)} id={dados.idPon}><img src='../remover.png' id={dados.idPon} /></a>

                                                {/* <a href="#" style={{ marginLeft: "5px" }}><img src='../editar.png' /></a> */}
                                            </td>
                                        </tr>
                                    )
                                })}
                                {/* <tr><td>Total</td></tr> */}
                            </tbody>
                        </Table>
                        <p style={{fontSize: '14px'}}>Alguma nota faltando? <a href='http://localhost:3000/DarNota'>Adicionar nota</a></p>
                    </section>
                    : (selectedDisciplina.length === 0 || selectedTurma.length === 0) ?
                        <seccion>
                            <p>Selecione disciplina e turma para visualizar a pontuação dos alunos.</p>

                        </seccion>
                        :
                        <seccion>

                            <p>Nenhuma nota cadastrada. <a href='http://localhost:3000/DarNota'>Cadastrar nota</a></p>
                        </seccion>
                }


                
                    
                    {(notasFinais && notasFinais.length) ?
                       <section className='mt-5'>
                        <h3>Notas finais</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Aluno</th>
                                    <th>Nota Final</th>
                                </tr>
                            </thead>

                            <tbody>
                                {notasFinais.map(function (dados, key) {
                                    return (
                                        <tr key={key}>
                                            <th className='nome' id={dados.aluno}>{dados.aluno}</th>
                                            <td className='nota' style={{ background:dados.notaFinal > 5 ? '#87f38e' : '#ffa79d' }} id={dados.notaFinal}>{dados.notaFinal}</td>
                                        </tr>
                                    )
                                })}
                                {/* <tr><td>Total</td></tr> */}
                            </tbody>
                        </Table>
                        </section>
                        : 
                            <></>
                     
                     }
               
            </Container>
        </>
    )
}
export default Tabela
import Navegacao from './Navegacao'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import Footer from './Footer'

const DarNota = () => {
    const [optionsTurma, setOptionsTurma] = useState([]);
    const [optionsDisciplina, setOptionsDisciplina] = useState([]);
    const [optionsAluno, setOptionsAluno] = useState([]);
    const [optionsConteudo, setOptionsConteudo] = useState([]);

    const [selectedTurma, setSelectedTurma] = useState([]);
    const [selectedDisciplina, setSelectedDisciplina] = useState([]);
    const [selectedConteudo, setSelectedConteudo] = useState([]);
    const [selectedAluno, setSelectedAluno] = useState([]);

    const [selectedTurmaNome, setSelectedTurmaNome] = useState();
    const [selectedDisciplinaNome, setSelectedDisciplinaNome] = useState();
    const [selectedConteudoNome, setSelectedConteudoNome] = useState();
    const [selectedAlunoNome, setSelectedAlunoNome] = useState();

    const [pontuacoes, setPontuacoes] = useState([]);
    const [idPon, setIdPon] = useState();

    const [nota, setNota] = useState();
    const [fase, setFase] = useState('');
    const [respostaHTTP, setRespostaHTTP] = useState({ message: '', status: '' });
    const [visibleRegister, setVisibleRegister] = useState(true);

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
        }
    }

    const getAlunos = () => {
        if (selectedDisciplina && selectedTurma) {
            try {
                fetch(`http://localhost:5000/alunos?tur=${selectedTurma}`, {
                    method: 'GET',
                    mode: "cors"
                }
                ).then(res => res.json())
                    .then((result) => {
                        let alunos = [];
                        result.forEach(function (aluno) {
                            alunos.push({ value: aluno.id, label: aluno.nome })
                        });
                        setOptionsAluno(alunos)
                    }, (error) => {
                        console.error(error)
                    });
            } catch (e) {
                console.error(e)
            }
        }
    }

    const getConteudos = () => {
        try {
            fetch(`http://localhost:5000/conteudos`, {
                method: 'GET',
                mode: "cors"
            }
            ).then(res => res.json())
                .then((result) => {
                    let conteudos = [];
                    result.forEach(function (conteudo) {
                        conteudos.push({ value: conteudo.id, label: conteudo.nome })
                    });
                    setOptionsConteudo(conteudos)
                }, (error) => {
                    console.error(error)
                });
        } catch (e) {
            console.error(e)
        }
    }

    const getPontuacoes = () => {
        try {
            fetch(`http://localhost:5000/pontuacoes`, {
                method: 'GET',
                mode: "cors"
            }
            ).then(res => res.json())
                .then((result) => {
                    let pontuacoes = [];
                    result.forEach(function (pontuacao) {
                        pontuacoes.push({
                            idPon: pontuacao.idPon,
                            idDisc: pontuacao.idDisc,
                            nomeDisc: pontuacao.nomeDisc,
                            idTur: pontuacao.idTur,
                            nomeTur: pontuacao.nomeTur,
                            idAlu: pontuacao.idAlu,
                            nomeAlu: pontuacao.nomeAlu,
                            idCont: pontuacao.idCont,
                            nomeCont: pontuacao.nomeCont,
                            fase: pontuacao.fase,
                            nota: pontuacao.nota
                        })
                    });
                    setPontuacoes(pontuacoes)
                }, (error) => {
                    console.error(error)
                });
        } catch (e) {
            console.error(e)
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
                    // console.log(result);
                    getPontuacoes();
                }, (error) => {
                    console.error(error)
                }
                );
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getAlunos();
        getConteudos();
        getPontuacoes();
    });

    useEffect(() => {
        getTurmas();
        getDisciplinas();
    }, [selectedDisciplina, selectedTurma]);

    const createPontuacao = (e) => {
        e.preventDefault();
        // console.log(selectedAluno, selectedTurma, selectedDisciplina, selectedConteudo, fase, nota)
        try {
            fetch('http://localhost:5000/pontuacao', {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "aluno": selectedAluno,
                    "turma": selectedTurma,
                    "disciplina": selectedDisciplina,
                    "conteudo": selectedConteudo,
                    "fase": fase,
                    "nota": nota
                }
                )
            }
            ).then(res => res.json())
                .then((data) => {
                    setRespostaHTTP({
                        message: data.message,
                        status: data.status
                    })
                    limparCampos();
                }, (error) => {
                    console.error(error)
                });
        } catch (e) {
            console.error(e)
        }
    }

    const editPontuacao = (event) => {
        console.log(idPon);
        console.log('dados edit:', idPon, selectedAluno, selectedTurma, selectedDisciplina, selectedConteudo, fase, nota);
        try {
            event.preventDefault();
            fetch('http://localhost:5000/pontuacao', {
                method: 'PUT',
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "idPon": idPon,
                    "aluno": selectedAluno,
                    "turma": selectedTurma,
                    "disciplina": selectedDisciplina,
                    "conteudo": selectedConteudo,
                    "fase": fase,
                    "nota": nota
                })
            }).then(res => res.json())
                .then((result) => {
                    getTurmas();
                    getAlunos();
                    setVisibleRegister(true);
                    limparCampos();
                }, (error) => {
                    console.error(error)
                });
        } catch (e) {
            console.error(e)
        }
    }

    const limparCampos = () =>{
        setSelectedAluno('');
        setSelectedAlunoNome('');
        setSelectedDisciplina('');
        setSelectedDisciplinaNome('');
        setSelectedConteudo('');
        setSelectedConteudoNome('');
        setSelectedTurma('');
        setSelectedTurmaNome('');
        setFase('');
        setNota('');
        setIdPon('');
        // console.log(respostaHTTP.status)
    }

    const scrollTop = function() {
        window.scrollTo(0, 50);
    };

    return (
        <>
            <Navegacao />
                <section className='content mb-5' >
                <span id='topo'></span>
                    <div id="cadastroNotas">
                        <form onSubmit={createPontuacao} >
                            <h1>Registrar Nota</h1>
                            <p>
                                <label for="select_cad">Disciplina</label>
                                <Select className='labelSelect' options={optionsDisciplina}
                                value={{ label: selectedDisciplinaNome, value: selectedDisciplina }} 
                                onChange={(e) => {setSelectedDisciplina(e.value); setSelectedDisciplinaNome(e.label); setSelectedTurma('');
                                setSelectedTurmaNome(''); setSelectedAluno(''); setSelectedAlunoNome('');
                                }} />
                            </p>

                            <p>
                                <label for="select_cad">Turma</label>
                                <Select className='labelSelect' options={optionsTurma} 
                                value={{ label: selectedTurmaNome, value: selectedTurma }} 
                                onChange={(e) => {setSelectedTurma(e.value); setSelectedTurmaNome(e.label); setSelectedAluno(''); setSelectedAlunoNome('');
                                }}  />
                            </p>

                            <p>
                                <label for="select_cad">Aluno</label>
                                <Select className='labelSelect' options={optionsAluno} 
                                value={{ label: selectedAlunoNome, value: selectedAluno }} 
                                onChange={(e) => {setSelectedAluno(e.value); setSelectedAlunoNome(e.label);
                                }} />
                            </p>

                            <p>
                                <label for="select_cad">Conteúdo</label>
                                <Select className='labelSelect' options={optionsConteudo} 
                                value={{ label: selectedConteudoNome, value: selectedConteudo }} 
                                onChange={(e) => {setSelectedConteudo(e.value); setSelectedConteudoNome(e.label);
                                }} />
                            </p>

                            <p>
                                <label for="fase">Fase</label>
                                <input value={fase}  min='0' onChange={(e) => { setFase(e.target.value) }} name="fase" type="number" placeholder="Digite a fase" />
                            </p>

                            <p>
                                <label for="nota">Nota</label>
                                <input value={nota}  min='0' onChange={(e) => { setNota(e.target.value) }} name="nota" type="number" placeholder="Digite a nota" />
                            </p>

                             {/* mensagem para usuário
                             {respostaHTTP?.status === 'erro' ?
                                <p style={{ color: 'red' }}>{respostaHTTP.message}</p>
                                : respostaHTTP?.status === 'success' ?
                                    <p style={{ color: 'green' }}>{respostaHTTP.message}</p>
                                    :
                                    ""
                            } */}

                            {/* se for editar... */}
                            {visibleRegister ?
                                <div>
                                    <button className="button" onClick={createPontuacao} disabled={!selectedAluno || !selectedTurma || !selectedConteudo || !selectedDisciplina || !nota || !fase}>Cadastrar</button>
                                </div>
                                :
                                <div>
                                    <div>
                                        <button className="button" onClick={(e) => { editPontuacao(e) }} disabled={!selectedAluno || !selectedTurma || !selectedConteudo || !selectedDisciplina || !nota || !fase}>Alterar</button>
                                    </div>
                                    <div>
                                        <button className="button red" onClick={() => { setVisibleRegister(true); limparCampos(); }}>Cancelar</button>
                                    </div>
                                </div>
                            }

                            <p class="link">
                                Ja registrou todas as notas?
                                <a href="http://localhost:3000/Tabela">Tabela Pontuação</a>
                            </p>
                        </form>
                        </div >

                   
                    {(pontuacoes?.length) ?
                    <div>
                        <section className='mt-5'>
                            <h4>Notas cadastradas</h4>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Disciplina</th>
                                        <th>Turma</th>
                                        <th>Conteudo</th>
                                        <th>Aluno</th>
                                        <th>Fase</th>
                                        <th>Nota</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pontuacoes.map(function (pontuacao, key) {
                                        return (
                                            
                                            <tr key={key}>
                                                {/* <td>{pontuacao.idPon}</td> */}
                                                <td id={pontuacao.idDisc}>{pontuacao.nomeDisc}</td>
                                                <td id={pontuacao.idTur} >{pontuacao.nomeTur}</td>
                                                <td id={pontuacao.idCont} >{pontuacao.nomeCont}</td>
                                                <td id={pontuacao.idAlu} >{pontuacao.nomeAlu}</td>
                                                <td id={pontuacao.fase} >{pontuacao.fase}</td>
                                                <td id={pontuacao.nota} >{pontuacao.nota}</td>
                                                <td key={pontuacao.idPon}>
                                                   
                                                    <a href="#topo" onClick={(e) => {
                                                        scrollTop();
                                                        e.preventDefault();
                                                        let id = parseInt(e.target.id);
                                                        let selected = pontuacoes.filter(function (pontuacao) {
                                                            return pontuacao.idPon === id;
                                                        });
                                                        setSelectedAluno(selected[0].idAlu);
                                                        setSelectedAlunoNome(selected[0].nomeAlu);
                                                        setSelectedDisciplina(selected[0].idDisc);
                                                        setSelectedDisciplinaNome(selected[0].nomeDisc);
                                                        setSelectedConteudo(selected[0].idCont);
                                                        setSelectedConteudoNome(selected[0].nomeCont);
                                                        setSelectedTurma(selected[0].idTur);
                                                        setSelectedTurmaNome(selected[0].nomeTur);
                                                        setFase(selected[0].fase);
                                                        setNota(selected[0].nota);
                                                        setVisibleRegister(false);
                                                        setIdPon(selected[0].idPon);
                                                    }} id={pontuacao.idPon}>
                                                        <img alt='icone editar' src='../editar.png' id={pontuacao.idPon} />
                                                    </a>
                                                    <br/>
                                                    <a  onClick={() => apagarPontuacao(pontuacao.idPon)} id={pontuacao.idPon}><img alt="icone lixeira" src='../remover.png' id={pontuacao.idPon} /></a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </section>
                        </div>
                        : null
                    }
               
               
                </section >
                
        </>
    )

}
export default DarNota;
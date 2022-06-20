import Navegacao from './Navegacao'
import Select from 'react-select'
import { useState, useEffect } from 'react'

const VincularTurmaDisciplina = () => {
    const [optionsTurma, setOptionsTurma] = useState([]);
    const [optionsDisciplina, setOptionsDisciplina ]= useState([]);
    const [selectedTurma, setSelectedTurma] = useState([]);
    const [selectedDisciplina, setSelectedDisciplina ]= useState([]);

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

    const showSuccessMessage = (result) => {
        return (
            <div>
                {(result.status) ?
                    <div> 
                        <span>{result.status}</span>
                        <img></img>
                    </div>
                :   <div> 
                        <span>Concluído com sucesso</span>
                        <img></img>
                    </div>
                }
            </div>
        )
    }

    const getDisciplinas = () => {
        try {
            fetch('http://localhost:5000/disciplinas', {
                method:'GET', 
                mode:"cors"
            }
            ).then(res => res.json())
            .then((result) => {
                let disciplinas = [];
                result.forEach(function(disciplina) {
                    disciplinas.push({ value: disciplina.id, label: disciplina.nome})
                });
                setOptionsDisciplina(disciplinas)
            },(error) => {
                console.error(error)
            });
        } catch(e) {
            console.error(e)  
        }
    }

    const vincular = (e) => {
        e.preventDefault();
        console.log(selectedDisciplina)
        console.log(selectedTurma)
        try {
            fetch('http://localhost:5000/turma-disciplina', {
                method:'POST', 
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"turma": selectedTurma, "disciplina": selectedDisciplina})
            }
            ).then(res => res.json())
            .then((result) => {
                if(result)
                    showSuccessMessage(result);
            },(error) => {
                console.error(error)
            });
        } catch(e) {
            console.error(e)  
        }
    }

    const handleChange = (type, e, action) => {
        if (type === "turma")
            setSelectedTurma(e.value);
        else 
            setSelectedDisciplina(e.value);      
    }

    useEffect(() => {
        getTurmas();
        getDisciplinas();
    }, []);

    return (
        <>
            <Navegacao />
            <section className='content'>

                <div id="cadastro">
                    <form onSubmit={vincular}>
                        <h1>Vincular Turma a Disciplina</h1>

                        <div>
                            <label htmlFor="select_cad">Turma</label>
                            <Select className='labelSelect' options={optionsTurma} onChange={handleChange.bind("turma","turma")} />
                        </div>

                        <div>
                            <label htmlFor="select_cad">Disciplina</label>
                            <Select className='labelSelect' options={optionsDisciplina} onChange={handleChange.bind("disciplina","disciplina")} />
                        </div>

                        <div>
                            <input type="submit" value="Vincular" />
                        </div>

                        <p className="link">
                            Ja vinculou todos?
                            <a href="http://localhost:3000/CadastroAluno">Alunos</a>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default VincularTurmaDisciplina;
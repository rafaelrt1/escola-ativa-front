import { useState } from "react";
import Footer from "./Footer";

const Login = () => {

    const[email,setEmail] = useState(); 
    const[senha,setSenha] = useState();

    const tryLogin = (e) => {
        try {
            e.preventDefault();
            fetch('http://localhost:5000/login', {
                method:'POST',
                mode:"cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"username": email, "password": senha})
            }).then(res => res.json())
            .then((result) => {
                // setTurmas(result)
            },(error) => {
                console.error(error)
            });
        } catch(e) {
            console.error(e)  
        }
    }

    return (
        <>
            <section className='content'>
                <div id="login">
                    <form onSubmit={tryLogin} method="" action="http://localhost:3000/Disciplinas">
                        <h1>Login</h1>
                        <p>
                            <label htmlFor="user">Seu Email</label>
                            <input autoComplete="username" onChange={(e)=>setEmail(e.target.value)} id="user" name="user"  type="text" placeholder="ex. professor@gmail.com" />
                        </p>

                        <p>
                            <label htmlFor="password">Sua Senha</label>
                            <input autoComplete="current-password" onChange={(e)=>setSenha(e.target.value)} id="password" name="password" type="password" placeholder="ex. senha" />
                        </p>

                        <button className="button" type="submit" disabled={!email || !senha}>Entrar</button>

                        <p className="link">
                            Ainda não tem conta?
                            <a href="http://localhost:3000/Cadastro">Cadastre-se</a>
                        </p>
                    </form>
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}

export default Login;
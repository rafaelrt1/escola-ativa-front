import { useState } from "react";
import Footer from "./Footer";

const Login = () => {

    const[email,setEmail] = useState(''); 
    const[senha,setSenha] = useState('');

    return (
        <>
            <section className='content'>
                <div id="login">
                    <form method="" action="http://localhost:3000/Disciplinas">
                        <h1>Login</h1>
                        <p>
                            <label for="nome_login">Seu Email</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} id="nome_login" name="nome_login"  type="email" placeholder="ex. professor@gmail.com" />
                        </p>

                        <p>
                            <label for="email_login">Sua Senha</label>
                            <input value={senha} onChange={(e)=>setSenha(e.target.value)} id="email_login" name="email_login" type="password" placeholder="ex. senha" />
                        </p>

                        <p>
                        <input type="submit" value="Logar" />
                        </p>

                        <p class="link">
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

const Login = () => {
    return (
        <section className='content'>
            <div id="login">
                <form method="" action="http://localhost:3000/RegistroDisciplina">
                    <h1>Login</h1>
                    <p>
                        <label for="nome_login">Seu nome</label>
                        <input id="nome_login" name="nome_login" type="text" placeholder="ex. professor@gmail.com" />
                    </p>

                    <p>
                        <label for="email_login">Seu e-mail</label>
                        <input id="email_login" name="email_login" type="password" placeholder="ex. senha" />
                    </p>

                    <p>
                        <input type="checkbox" name="manterlogado" id="manterlogado" value="" />
                        <label for="manterlogado">Manter-me logado</label>
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
    );
}

export default Login;
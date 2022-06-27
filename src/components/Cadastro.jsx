import Footer from "./Footer";

const Cadastro = () => {
  return (
    <>
    <section className='content'>
      <div id="cadastro">
        <form method="post" action="">
          <h1>Cadastro</h1>

          <div>
            <label for="nome_cad">Seu nome</label>
            <input id="nome_cad" name="nome_cad" required="required" type="text" placeholder="Seu usuário" />
          </div>

          <div>
            <label for="senha_cad">Sua senha</label>
            <input id="senha_cad" name="senha_cad" required="required" type="password" placeholder="ex. 1234" />
          </div>

          <div>
            <input type="submit" value="Cadastrar" />
          </div>

          <p class="link">
            Já tem conta?
            <a href="http://localhost:3000/"> Ir para Login </a>
          </p>
        </form>
      </div>
    </section>
    <Footer></Footer>
    </>
  )
}

export default Cadastro;
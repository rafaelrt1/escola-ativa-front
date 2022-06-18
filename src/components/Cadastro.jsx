const Cadastro = () => {
  return (
    <section className='content'>
      <div id="cadastro">
        <form method="post" action="">
          <h1>Cadastro</h1>

          <p>
            <label for="nome_cad">Seu nome</label>
            <input id="nome_cad" name="nome_cad" required="required" type="text" placeholder="Seu usuário" />
          </p>

          <p>
            <label for="senha_cad">Sua senha</label>
            <input id="senha_cad" name="senha_cad" required="required" type="password" placeholder="ex. 1234" />
          </p>

          <p>
            <input type="submit" value="Cadastrar" />
          </p>

          <p class="link">
            Já tem conta?
            <a href="http://localhost:3000/"> Ir para Login </a>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Cadastro;
const API_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz';

const funcoesApi = {
  obterQuizzes() {
    const promise = axios.get(`${API_URL}/quizzes`);

    promise.then((resposta) => {
      resposta.data.forEach((quizz) => {
        funcoesQuizzes.quizzes.push(quizz);
      })

      funcoesQuizzes.listarTodosOsQuizzes();
    })

    promise.catch((err) => {
      console.error(err.status, err.message);
    })
  },

  obterUmQuizz() {
    // **************** FALTA ADICIONAR O ID DEPOIS DE "quizzes/"
    const promise = axios.get(`${API_URL}/quizzes/ID_DO_QUIZZ`);

    promise.then((resposta) => {
      return resposta.data;
    })
    promise.catch((err) => {
      console.error(err.status, err.message);
    })
  }
}

const funcoesDeControle = {
  // Esconder e mostrar a tela 1
  toogleTela1() {
    const quizzesContainer = document.querySelector(".quizzes-container")

    quizzesContainer.classList.toggle("--escondido")
  },

  toogleTela1SemQuizzes() {
    const semQuizzes = document.querySelector(".sem-quizzes")

    semQuizzes.classList.toggle("--escondido")
  },

  toogleTela1SeusQuizzes() {
    const seusQuizzes = document.querySelector(".seus-quizzes")

    seusQuizzes.classList.toggle("--escondido")
  },

  // Esconder e mostrar a tela 2
  toogleTela2() {
    const respondeQuizz = document.querySelector(".responde-quizz")

    respondeQuizz.classList.toggle("--escondido")
  },

  // Esconder e mostrar a tela 2
  toogleTela3Parte1() {
    const criaQuizzParte1 = document.querySelector(".cria-quizz.passo-um")

    criaQuizzParte1.classList.toggle("--escondido")
  },

  toogleTela3Parte2() {
    const criaQuizzParte2 = document.querySelector(".cria-quizz.passo-dois")

    criaQuizzParte2.classList.toggle("--escondido")
  },

  toogleTela3Parte3() {
    const criaQuizzParte3 = document.querySelector(".cria-quizz.passo-tres")

    criaQuizzParte3.classList.toggle("--escondido")
  },

  validaUrl(url) {
    let validaUrl = null
    try {
      validaUrl = new URL(url)
    } catch(erro) {
      alert("⚠ URL INVÁLIDA -> Preencha os dados do seu quizz novamente!")
    }

    return (validaUrl) ? true : false
  },

  validaHex() {
    const corDeFundoCriacao = document.querySelector(".cor-pergunta-um").value

    let hex = corDeFundoCriacao.split("#")[1]
    const regexp = /^[0-9a-fA-F]+$/;

    if(regexp.test(hex)) {
      return true;
    }
    else {
      alert("⚠ COR INFORMADA NÃO É HEXADECIMAL")

      return false;
    }
  }
}

const funcoesQuizzes = {
  quizzes: [],
  seus_quizzes: [{
    title: "testete",
    image: "https://source.unsplash.com/random"
  }],

  criarQuizz() {
    funcoesDeControle.toogleTela1();
    funcoesDeControle.toogleTela3Parte1();
  },

  criarQuizzPasso2() {
    funcoesDeControle.toogleTela3Parte1();
    funcoesDeControle.toogleTela3Parte2();
  },

  criarQuizzPasso3() {
    funcoesDeControle.toogleTela3Parte2();
    funcoesDeControle.toogleTela3Parte3();
    funcoesDeControle.validaHex();
  },

  responderQuizz(quizz) {
    funcoesDeControle.toogleTela1();
    funcoesDeControle.toogleTela2();
  },

  validaCriacaoDeQuizz() {
    const tituloQuizzInput = document.querySelector(".cria-quizz.passo-um .titulo-quizz")
    const urlDaImagemInput = document.querySelector(".cria-quizz.passo-um .url-quizz")
    const qtdPerguntasInput = document.querySelector(".cria-quizz.passo-um .qtd-perguntas")
    const qtdNiveisInput = document.querySelector(".cria-quizz.passo-um .qtd-niveis")

    const tituloQuizz = tituloQuizzInput.value
    const urlDaImagem = urlDaImagemInput.value
    const qtdPerguntas = qtdPerguntasInput.value
    const qtdNiveis = qtdNiveisInput.value

    tituloQuizzInput.value = ''
    urlDaImagemInput.value = ''
    qtdPerguntasInput.value = ''
    qtdNiveisInput.value = ''

    funcoesDeControle.validaUrl(urlDaImagem)

    // if(validaUrl) {
    funcoesQuizzes.criarQuizzPasso2()
    // }
  },

  validaCriacaoDeQuizzParte3() {

  },

  listarTodosOsQuizzes() {
    const listaDeTodosOsQuizzes = document.querySelector(".quizzes-todos");

    listaDeTodosOsQuizzes.innerHTML = funcoesQuizzes.montaEstruturaQuizzPrimeiraTela();
    funcoesQuizzes.montaEstruturaQuizzPrimeiraTela();
    funcoesQuizzes.montaEstruturaQuizzSegundaTela();
  },

  montaEstruturaQuizzPrimeiraTela() {
    let quizzesEstruturaTela1 = '<li class="quizzes-titulo"><h2>Todos os Quizzes</h2></li>';

    funcoesQuizzes.quizzes.forEach((quizzData) => {
      const titulo = quizzData.title;
      const imagem = quizzData.image;

      const quizzEstrutura = `
        <li class="quizz" onclick="funcoesQuizzes.responderQuizz(this)">
          <div class="quizz-gradiente"></div>
          <img src="${imagem}" alt="Imagem de capa do Quizz">
          <p>${titulo}</p>
        </li>`;

      quizzesEstruturaTela1 += quizzEstrutura;
    })

    return quizzesEstruturaTela1;
  },

  listaSeusQuizzes() {
    const listaDeSeusQuizzes = document.querySelector(".lista-seus-quizzes");

    if(funcoesQuizzes.seus_quizzes.length !== 0) {
      funcoesDeControle.toogleTela1SemQuizzes();
      funcoesDeControle.toogleTela1SeusQuizzes();

      listaDeSeusQuizzes.innerHTML = funcoesQuizzes.montaEstruturaSeusQuizzes();
    }
  },

  montaEstruturaSeusQuizzes() {
    let seusQuizzesEstrutura = `
  <li class="quizzes-titulo">
    <h2>Seus Quizzes</h2>
    <ion-icon name="add-circle" onclick="funcoesQuizzes.criarQuizz()"></ion-icon>
  </li>`;

    funcoesQuizzes.seus_quizzes.forEach((quizzData) => {
      const titulo = quizzData.title;
      const imagem = quizzData.image;

      const quizzEstrutura = `
        <li class="quizz" onclick="funcoesQuizzes.responderQuizz(this)">
          <div class="quizz-gradiente"></div>
          <img src="${imagem}" alt="Imagem de capa do seu Quizz">
          <p>${titulo}</p>
        </li>`;

      seusQuizzesEstrutura += quizzEstrutura;
    })

    return seusQuizzesEstrutura;
  },
  
  montaEstruturaQuizzSegundaTela() {
    this.quizzes.forEach((quizzData) => {

<<<<<<< HEAD
    let responde_quizz = document.querySelector(".responde-quizz");
    responde_quizz.innerHTML = responde_quizz.innerHTML + `
=======
      let responde_quizz = document.querySelector(".responde-quizz");
      responde_quizz.innerHTML = responde_quizz.innerHTML + `
>>>>>>> bea55ba677aa9c22e21fd91974adcfcc64f8021d
          <div class="cabecalho-do-quizz">
            <div class="cabecalho-gradiente"></div>
            <h1>${quizzData.title}</h1>
            <img
            src = ${quizzData.image}
            alt="imagem da opcao">
          </div>

        <article>
              <div class="cabecalho-da-pergunta" style = "background-color: ${quizzData.questions[0].color}">
                <h1>${quizzData.questions[0].title}</h1>
              </div>

              <div class="conteudo-das-opcoes">
                <div class="opcao ${quizzData.questions[0].answers[0].isCorrectAnswer}" >
                  <div class="imagem">
                    <div class="opcao-gradiente --escondido"></div>
                    <img
                    src="${quizzData.questions[0].answers[0].image}"
                    alt="imagem da opcao">
                    <p><b>${quizzData.questions[0].answers[0].text}</b></p>
                  </div>
                </div>
              
                <div class="opcao ${quizzData.questions[0].answers[1].isCorrectAnswer}" >
                  <div class="imagem">
                    <div class="opcao-gradiente --escondido"></div>
                    <img
                    src="${quizzData.questions[0].answers[1].image}"
                    alt="imagem da opcao">
                    <p><b>${quizzData.questions[0].answers[1].text}</b></p>
                  </div>
                </div>
        </article>

        <article>
              <div class="cabecalho-da-pergunta" style = "background-color: ${quizzData.questions[1].color}">
                <h1>${quizzData.questions[1].title}</h1>
              </div>

              <div class="conteudo-das-opcoes">
                <div class="opcao ${quizzData.questions[1].answers[0].isCorrectAnswer}" >
                  <div class="imagem">
                    <div class="opcao-gradiente --escondido"></div>
                    <img
                    src="${quizzData.questions[1].answers[0].image}"
                    alt="imagem da opcao">
                    <p><b>${quizzData.questions[1].answers[0].text}</b></p>
                  </div>
                </div>
              
                <div class="opcao ${quizzData.questions[1].answers[1].isCorrectAnswer}" >
                  <div class="imagem">
                    <div class="opcao-gradiente --escondido"></div>
                    <img
                    src="${quizzData.questions[1].answers[1].image}"
                    alt="imagem da opcao">
                    <p><b>${quizzData.questions[1].answers[1].text}</b></p>
                  </div>
                </div>
        </article>

        <article>
              <div class="cabecalho-da-pergunta" style = "background-color: ${quizzData.questions[2].color}">
                <h1>${quizzData.questions[2].title}</h1>
              </div>

              <div class="conteudo-das-opcoes">
                <div class="opcao ${quizzData.questions[2].answers[0].isCorrectAnswer}" >
                  <div class="imagem">
                    <div class="opcao-gradiente --escondido"></div>
                    <img
                    src="${quizzData.questions[2].answers[0].image}"
                    alt="imagem da opcao">
                    <p><b>${quizzData.questions[2].answers[0].text}</b></p>
                  </div>
                </div>
              
                <div class="opcao ${quizzData.questions[2].answers[1].isCorrectAnswer}" >
                  <div class="imagem">
                    <div class="opcao-gradiente --escondido"></div>
                    <img
                    src="${quizzData.questions[2].answers[1].image}"
                    alt="imagem da opcao">
                    <p><b>${quizzData.questions[2].answers[1].text}</b></p>
                  </div>
                </div>
        </article>
        
        `
  })
}

}

funcoesApi.obterQuizzes()
funcoesQuizzes.listaSeusQuizzes();

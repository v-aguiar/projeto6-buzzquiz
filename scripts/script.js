const API_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz'

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

  validaCriacaoDeQuizz() {
    const tituloQuizz = document.querySelector(".cria-quizz.passo-um .titulo-quizz")
    const urlDaImagem = document.querySelector(".cria-quizz.passo-um .url-quizz").value
    const qtdPerguntas = document.querySelector(".cria-quizz.passo-um .qtd-perguntas")
    const qtdNiveis = document.querySelector(".cria-quizz.passo-um .qtd-niveis")

    const validaUrl = funcoesDeControle.validaUrl(urlDaImagem)
  },

  validaUrl(url) {
    let validaUrl = null
    try {
      validaUrl = new URL(url).preventDefault()
    } catch(erro) {
      console.error("URL INVÁLIDA")
    }

    return (validaUrl) ? true : false
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

  responderQuizz(quizz) {
    funcoesDeControle.toogleTela1();
    funcoesDeControle.toogleTela2();
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
    for(let i = 0; i < this.quizzes[i]; i++) {
      let pergunta = this.quizzes[i].questions;

      let responde_quizz = document.querySelector(".responde-quizz");
      responde_quizz.innerHTML = responde_quizz.innerHTML + `
          <div class="cabecalho-do-quizz">
          <div class="cabecalho-gradiente"></div>
            <h1>Título do quizz</h1>
            <img
            src="https://s3-alpha-sig.figma.com/img/7212/aa92/e0229a2cb5aea15ab3fd2b5d36cb9a60?Expires=1646006400&Signature=TnUIsDc13Ad-HM7eeka0F0rNPmyiU-Uk6T3ZGhjRz40vLKz7jwt4GVd0zLf-OQPu7d22MhhO5dyxuWN3Epxpy6n11A90jVncb8qf1BAcgojvJK0w7jNoJ7DhpHKtXz4iqkMz6oPHv08bYsMdFjsd8NOpAnCVlNXEv7bcHZ0AUbeW41tUTfWu6dSgzfPXkgWCvucTfjzNRNcbWhPhNIaSlnB9a5XO72iKnq8z5LOXorZJbMlyviFL2I0Jq0kOsBf2yLILTevst6l5kb-f9VU3MeosmOGskz9UDKUkcbFj4pQ-URE-adsk5qR6v7zPdshQ0xddmHJse8C7zH4qw07rBA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt="imagem da opcao">
          </div>
        
          <article>
            <div class="cabecalho-da-pergunta">
              <h1>Título da Pergunta 1</h1>
            </div>

            <div class="conteudo-das-opcoes">
              <div class="opcao">
                <div class="imagem">
                  <div class="opcao-gradiente --escondido"></div>
                  <img
                  src="https://s3-alpha-sig.figma.com/img/7212/aa92/e0229a2cb5aea15ab3fd2b5d36cb9a60?Expires=1646006400&Signature=TnUIsDc13Ad-HM7eeka0F0rNPmyiU-Uk6T3ZGhjRz40vLKz7jwt4GVd0zLf-OQPu7d22MhhO5dyxuWN3Epxpy6n11A90jVncb8qf1BAcgojvJK0w7jNoJ7DhpHKtXz4iqkMz6oPHv08bYsMdFjsd8NOpAnCVlNXEv7bcHZ0AUbeW41tUTfWu6dSgzfPXkgWCvucTfjzNRNcbWhPhNIaSlnB9a5XO72iKnq8z5LOXorZJbMlyviFL2I0Jq0kOsBf2yLILTevst6l5kb-f9VU3MeosmOGskz9UDKUkcbFj4pQ-URE-adsk5qR6v7zPdshQ0xddmHJse8C7zH4qw07rBA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                  alt="imagem da opcao">
                  <p><b>Texto da opção 1</b></p>
                </div>
              </div>
              <div class="opcao">
                <div class="imagem">
                  <div class="opcao-gradiente --escondido"></div>
                  <img
                  src="https://s3-alpha-sig.figma.com/img/7212/aa92/e0229a2cb5aea15ab3fd2b5d36cb9a60?Expires=1646006400&Signature=TnUIsDc13Ad-HM7eeka0F0rNPmyiU-Uk6T3ZGhjRz40vLKz7jwt4GVd0zLf-OQPu7d22MhhO5dyxuWN3Epxpy6n11A90jVncb8qf1BAcgojvJK0w7jNoJ7DhpHKtXz4iqkMz6oPHv08bYsMdFjsd8NOpAnCVlNXEv7bcHZ0AUbeW41tUTfWu6dSgzfPXkgWCvucTfjzNRNcbWhPhNIaSlnB9a5XO72iKnq8z5LOXorZJbMlyviFL2I0Jq0kOsBf2yLILTevst6l5kb-f9VU3MeosmOGskz9UDKUkcbFj4pQ-URE-adsk5qR6v7zPdshQ0xddmHJse8C7zH4qw07rBA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                  alt="imagem da opcao">
                  <p><b>Texto da opção 1</b></p>
                </div>
              </div>
              <div class="opcao">
                <div class="imagem">
                  <div class="opcao-gradiente --escondido"></div>
                  <img
                  src="https://s3-alpha-sig.figma.com/img/7212/aa92/e0229a2cb5aea15ab3fd2b5d36cb9a60?Expires=1646006400&Signature=TnUIsDc13Ad-HM7eeka0F0rNPmyiU-Uk6T3ZGhjRz40vLKz7jwt4GVd0zLf-OQPu7d22MhhO5dyxuWN3Epxpy6n11A90jVncb8qf1BAcgojvJK0w7jNoJ7DhpHKtXz4iqkMz6oPHv08bYsMdFjsd8NOpAnCVlNXEv7bcHZ0AUbeW41tUTfWu6dSgzfPXkgWCvucTfjzNRNcbWhPhNIaSlnB9a5XO72iKnq8z5LOXorZJbMlyviFL2I0Jq0kOsBf2yLILTevst6l5kb-f9VU3MeosmOGskz9UDKUkcbFj4pQ-URE-adsk5qR6v7zPdshQ0xddmHJse8C7zH4qw07rBA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                  alt="imagem da opcao">
                  <p><b>Texto da opção 1</b></p>
                </div>
              </div>
              <div class="opcao">
                <div class="imagem">
                  <div class="opcao-gradiente --escondido"></div>
                  <img
                  src="https://s3-alpha-sig.figma.com/img/7212/aa92/e0229a2cb5aea15ab3fd2b5d36cb9a60?Expires=1646006400&Signature=TnUIsDc13Ad-HM7eeka0F0rNPmyiU-Uk6T3ZGhjRz40vLKz7jwt4GVd0zLf-OQPu7d22MhhO5dyxuWN3Epxpy6n11A90jVncb8qf1BAcgojvJK0w7jNoJ7DhpHKtXz4iqkMz6oPHv08bYsMdFjsd8NOpAnCVlNXEv7bcHZ0AUbeW41tUTfWu6dSgzfPXkgWCvucTfjzNRNcbWhPhNIaSlnB9a5XO72iKnq8z5LOXorZJbMlyviFL2I0Jq0kOsBf2yLILTevst6l5kb-f9VU3MeosmOGskz9UDKUkcbFj4pQ-URE-adsk5qR6v7zPdshQ0xddmHJse8C7zH4qw07rBA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                  alt="imagem da opcao">
                  <p><b>Texto da opção 1</b></p>
                </div>
              </div>
            </div>
          </article>`
    }
  }
}

funcoesApi.obterQuizzes()
funcoesQuizzes.listaSeusQuizzes();

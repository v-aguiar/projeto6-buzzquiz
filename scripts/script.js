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

  validaHex(cor) {
    let hex = cor.toString().split("#")[1]
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
  seus_quizzes: [],

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

    const validaUrl = funcoesDeControle.validaUrl(urlDaImagem)

    // if(validaUrl) {
    funcoesQuizzes.criarQuizzPasso2()
    // } else {
    // alert("⚠ Dados inválidos, preencha o formulário novamente!")

    // tituloQuizzInput.value = ''
    // urlDaImagemInput.value = ''
    // qtdPerguntasInput.value = ''
    // qtdNiveisInput.value = ''
    // }
  },

  validaCriacaoDeQuizzParte2() {
    const pergunta1Input = document.querySelector(".cria-quizz.passo-dois .texto-pergunta-um")
    const corDeFundoInput = document.querySelector(".cria-quizz.passo-dois .cor-pergunta-um")
    const respostaCorretaInput = document.querySelector(".cria-quizz.passo-dois .texto-resposta-correta")
    const urlImagemCorretaInput = document.querySelector(".cria-quizz.passo-dois .url-imagem-correta")
    const respostaIncorretaUmInput = document.querySelector(".cria-quizz.passo-dois .texto-incorreto-um")
    const urlImagemIncorretaUmInput = document.querySelector(".cria-quizz.passo-dois .url-incorreto-um")
    const respostaIncorretaDoisInput = document.querySelector(".cria-quizz.passo-dois .texto-incorreto-dois")
    const urlImagemIncorretaDoisInput = document.querySelector(".cria-quizz.passo-dois .url-incorreto-dois")
    const respostaIncorretaTresInput = document.querySelector(".cria-quizz.passo-dois .texto-incorreto-tres")
    const urlImagemIncorretaTresInput = document.querySelector(".cria-quizz.passo-dois .url-incorreto-tres")

    const pergunta1 = pergunta1Input.value
    const corDeFundo = corDeFundoInput.value
    const respostaCorreta = respostaCorretaInput.value
    const urlImagemCorreta = urlImagemCorretaInput.value
    const respostaIncorretaUm = respostaIncorretaUmInput.value
    const urlImagemIncorretaUm = urlImagemIncorretaUmInput.value
    const respostaIncorretaDois = respostaIncorretaDoisInput.value
    const urlImagemIncorretaDois = urlImagemIncorretaDoisInput.value
    const respostaIncorretaTres = respostaIncorretaTresInput.value
    const urlImagemIncorretaTres = urlImagemIncorretaTresInput.value

    pergunta1Input.value = ''
    corDeFundoInput.value = ''
    respostaCorretaInput.value = ''
    urlImagemCorretaInput.value = ''
    respostaIncorretaUmInput.value = ''
    urlImagemIncorretaUmInput.value = ''
    respostaIncorretaDoisInput.value = ''
    urlImagemIncorretaDoisInput.value = ''
    respostaIncorretaTresInput.value = ''
    urlImagemIncorretaTresInput.value = ''

    // Valida todas as urls dessa tela
    const urls = [urlImagemCorreta, urlImagemIncorretaUm]
    if(urlImagemIncorretaDois) {
      urls.push(urlImagemIncorretaDois)
    }
    if(urlImagemIncorretaTres) {
      urls.push(urlImagemIncorretaTres)
    }
    let urlsSaoValidas = true

    urls.forEach((url) => {
      const validaCadaUrl = funcoesDeControle.validaUrl(url)

      urlsSaoValidas = (urlsSaoValidas && validaCadaUrl)
    })

    // Valida se a cor passada é HEX
    const corEhValida = funcoesDeControle.validaHex(corDeFundo)

    if(urlsSaoValidas && corEhValida) {
      funcoesQuizzes.criarQuizzPasso3()
    } else {
      alert("⚠ Dados inválidos, preencha o formulário novamente!")

      // reseta os inputs
      pergunta1Input.value = ''
      corDeFundoInput.value = ''
      respostaCorretaInput.value = ''
      urlImagemCorretaInput.value = ''
      respostaIncorretaUmInput.value = ''
      urlImagemIncorretaUmInput.value = ''
      respostaIncorretaDoisInput.value = ''
      urlImagemIncorretaDoisInput.value = ''
      respostaIncorretaTresInput.value = ''
      urlImagemIncorretaTresInput.value = ''
    }
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

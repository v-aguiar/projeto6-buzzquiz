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

  toogleTela2() {
    const respondeQuizz = document.querySelector(".responde-quizz")

    respondeQuizz.classList.toggle("--escondido")
  },

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
  },

  abrePergunta2(icon) {
    const perguntaDentro = document.querySelector(".pergunta-dois.fechado .pergunta-dentro")
    const tituloPergunta2 = document.querySelector(".pergunta-dois.fechado > h1")
    const pergunta2 = document.querySelector(".pergunta-dois.fechado")

    pergunta2.style.flexDirection = "column"
    pergunta2.style.height = "fit-content"

    tituloPergunta2.style.alignSelf = "flex-start"
    tituloPergunta2.style.marginTop = "27px"

    perguntaDentro.classList.remove("--escondido")
    icon.classList.add("--escondido")
  },

  abrePergunta3(icon) {
    const perguntaDentro = document.querySelector(".pergunta-tres.fechado .pergunta-dentro")
    const tituloPergunta3 = document.querySelector(".pergunta-tres.fechado > h1")
    const pergunta3 = document.querySelector(".pergunta-tres.fechado")

    pergunta3.style.flexDirection = "column"
    pergunta3.style.height = "fit-content"

    tituloPergunta3.style.alignSelf = "flex-start"
    tituloPergunta3.style.marginTop = "27px"

    perguntaDentro.classList.remove("--escondido")
    icon.classList.add("--escondido")
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

    // Armazena dados recebidos

    infoBaseCriaQuizz.titulo = tituloQuizz
    infoBaseCriaQuizz.imagem = urlDaImagem
    infoBaseCriaQuizz.qtdPerguntas = qtdPerguntas
    infoBaseCriaQuizz.qtdNiveis = qtdNiveis

    // Reseta o valor dos inputs
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
    // 
    // const urls = [urlImagemCorreta, urlImagemIncorretaUm]
    // if(urlImagemIncorretaDois) {
    //   urls.push(urlImagemIncorretaDois)
    // }
    // if(urlImagemIncorretaTres) {
    //   urls.push(urlImagemIncorretaTres)
    // }
    // let urlsSaoValidas = true

    // urls.forEach((url) => {
    // const validaCadaUrl = funcoesDeControle.validaUrl(url)

    //   urlsSaoValidas = (urlsSaoValidas && validaCadaUrl)
    // })

    // Valida se a cor passada é HEX

    // const corEhValida = funcoesDeControle.validaHex(corDeFundo)

    // if(urlsSaoValidas && corEhValida) {
    funcoesQuizzes.criarQuizzPasso3()
    // } else {
    //   alert("⚠ Dados inválidos, preencha o formulário novamente!")

    //   // reseta os inputs
    //   pergunta1Input.value = ''
    //   corDeFundoInput.value = ''
    //   respostaCorretaInput.value = ''
    //   urlImagemCorretaInput.value = ''
    //   respostaIncorretaUmInput.value = ''
    //   urlImagemIncorretaUmInput.value = ''
    //   respostaIncorretaDoisInput.value = ''
    //   urlImagemIncorretaDoisInput.value = ''
    //   respostaIncorretaTresInput.value = ''
    //   urlImagemIncorretaTresInput.value = ''
    // }
  },

  validaCriacaoDeQuizzParte3() {
    const tituloNivelUmInput = document.querySelector(".cria-quizz.passo-tres .titulo-nivel-um")
    const acertoMinimoUmInput = document.querySelector(".cria-quizz.passo-tres .acerto-minimo-um")
    const nivelUmUrlInput = document.querySelector(".cria-quizz.passo-tres .nivel-um-url")
    const descricaoNivelTextarea = document.querySelector(".cria-quizz.passo-tres .descricao-nivel-um")

    const tituloNivelUm = tituloNivelUmInput.value
    const acertoMinimoUm = acertoMinimoUmInput.value
    const nivelUmUrl = nivelUmUrlInput.value
    const descricaoNivel = descricaoNivelTextarea.value

    tituloNivelUm.value = ''
    acertoMinimoUm.value = ''
    nivelUmUrl.value = ''
    descricaoNivel.value = ''

    // const validaUrl = funcoesDeControle.validaUrl(nivelUmUrl)
    // if(validaUrl) {
    //   funcoesQuizzes.enviaQuizzParaServidor()
    // } else {
    //   alert("⚠ Dados inválidos, preencha o formulário novamente!")

    //   tituloQuizzInput.value = ''
    //   urlDaImagemInput.value = ''
    //   qtdPerguntasInput.value = ''
    //   qtdNiveisInput.value = ''
    // }
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
      let responde_quizz = document.querySelector(".responde-quizz");
      responde_quizz.innerHTML = responde_quizz.innerHTML + `
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

const infoBaseCriaQuizz = new Object()

funcoesApi.obterQuizzes()
funcoesQuizzes.listaSeusQuizzes();

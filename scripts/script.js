const API_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let quizzDaSegundaTela

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
    const promise = axios.get(`${API_URL}/quizzes/${ident}`);

    promise.then((resposta) => {
      console.log(resposta.data);
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
    const respondeQuizz = document.querySelector(".tela-de-perguntas")

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

  toogleTela3Parte4() {
    const criaQuizzParte4 = document.querySelector(".cria-quizz.passo-quatro")

    criaQuizzParte4.classList.toggle("--escondido")
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

  abrePergunta(numero) {
    const perguntaDentro = document.querySelector(`.pergunta-${numero}.fechado .pergunta-${numero}-dentro`)
    const tituloPergunta = document.querySelector(`.pergunta-${numero}.fechado > h1`)
    const pergunta = document.querySelector(`.pergunta-${numero}.fechado`)
    const icone = document.querySelector(`.pergunta-${numero}.fechado ion-icon`)
    pergunta.style.flexDirection = "column"
    pergunta.style.height = "fit-content"
    tituloPergunta.style.alignSelf = "flex-start"
    tituloPergunta.style.marginTop = "27px"
    perguntaDentro.classList.remove("--escondido")
    icone.classList.add("--escondido")
  },
  abreNivel(numero) {
    const nivelDentro = document.querySelector(`.nivel-${numero}.fechado .nivel-${numero}-dentro`)
    const tituloNivel = document.querySelector(`.nivel-${numero}.fechado > h1`)
    const nivel = document.querySelector(`.nivel-${numero}.fechado`)
    const icone = document.querySelector(`.nivel-${numero}.fechado ion-icon`)
    nivel.style.flexDirection = "column"
    nivel.style.height = "fit-content"
    tituloNivel.style.alignSelf = "flex-start"
    tituloNivel.style.marginTop = "27px"
    nivelDentro.classList.remove("--escondido")
    icone.classList.add("--escondido")
  }
}

const funcoesQuizzes = {
  quizzes: [],
  seus_quizzes: [],
  created_ids: [],

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

  criarQuizzPasso4() {
    funcoesDeControle.toogleTela3Parte3();
    funcoesDeControle.toogleTela3Parte4();

    funcoesQuizzes.montaEstruturaSucessoCriacao()
  },

  responderQuizz(quizz) {
    console.log(quizz)

    const titulo = quizz.querySelector("p").innerHTML

    console.log(titulo)

    funcoesQuizzes.quizzes.forEach((card) => {
      if(card.title === titulo)
        quizzDaSegundaTela = card
    })

    console.log(quizzDaSegundaTela)
    funcoesDeControle.toogleTela1();
    funcoesDeControle.toogleTela2();

    funcoesQuizzes.montaEstruturaQuizzSegundaTela();
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
    // Armazena dados básicos do quizz a ser criado
    infoBaseCriaQuizz.title = tituloQuizz
    infoBaseCriaQuizz.image = urlDaImagem
    NUM_PERGUNTAS = qtdPerguntas
    NUM_NIVEIS = qtdNiveis
    // Reseta o valor dos inputs
    tituloQuizzInput.value = ''
    urlDaImagemInput.value = ''
    qtdPerguntasInput.value = ''
    qtdNiveisInput.value = ''
    const validaUrl = funcoesDeControle.validaUrl(urlDaImagem)
    if(validaUrl) {
      funcoesQuizzes.criarQuizzPasso2()
    } else {
      alert("⚠ Dados inválidos, preencha o formulário novamente!")
      tituloQuizzInput.value = ''
      urlDaImagemInput.value = ''
      qtdPerguntasInput.value = ''
      qtdNiveisInput.value = ''
    }
  },

  validaCriacaoDeQuizzParte2() {
    infoBaseCriaQuizz.questions = []
    let validacao = false
    // Recebe todos os dados de cada pergunta e já os coloca dentro do objeto a ser enviado pra API
    for(let index = 1; index <= NUM_PERGUNTAS; index++) {
      const perguntaInput = document.querySelector(`.cria-quizz.passo-dois .texto-pergunta-${index}`)
      const corDeFundoInput = document.querySelector(`.cria-quizz.passo-dois .cor-pergunta-${index}`)
      const respostaCorretaInput = document.querySelector(`.cria-quizz.passo-dois .texto-resposta-correta-p${index}`)
      const urlImagemCorretaInput = document.querySelector(`.cria-quizz.passo-dois .url-imagem-correta-p${index}`)
      const respostaIncorretaUmInput = document.querySelector(`.cria-quizz.passo-dois .texto-incorreto-um-p${index}`)
      const urlImagemIncorretaUmInput = document.querySelector(`.cria-quizz.passo-dois .url-incorreto-um-p${index}`)
      const respostaIncorretaDoisInput = document.querySelector(`.cria-quizz.passo-dois .texto-incorreto-dois-p${index}`)
      const urlImagemIncorretaDoisInput = document.querySelector(`.cria-quizz.passo-dois .url-incorreto-dois-p${index}`)
      const respostaIncorretaTresInput = document.querySelector(`.cria-quizz.passo-dois .texto-incorreto-tres-p${index}`)
      const urlImagemIncorretaTresInput = document.querySelector(`.cria-quizz.passo-dois .url-incorreto-tres-p${index}`)
      const pergunta = perguntaInput.value
      const corDeFundo = corDeFundoInput.value
      const respostaCorreta = respostaCorretaInput.value
      const urlImagemCorreta = urlImagemCorretaInput.value
      const respostaIncorretaUm = respostaIncorretaUmInput.value
      const urlImagemIncorretaUm = urlImagemIncorretaUmInput.value
      const respostaIncorretaDois = respostaIncorretaDoisInput.value
      const urlImagemIncorretaDois = urlImagemIncorretaDoisInput.value
      const respostaIncorretaTres = respostaIncorretaTresInput.value
      const urlImagemIncorretaTres = urlImagemIncorretaTresInput.value
      // Armazena os dados das perguntas do quizz a ser criado
      infoBaseCriaQuizz.questions.push({
        title: pergunta,
        color: corDeFundo,
        answers: [
          {
            text: respostaCorreta,
            image: urlImagemCorreta,
            isCorrectAnswer: true
          },
          {
            text: respostaIncorretaUm,
            image: urlImagemIncorretaUm,
            isCorrectAnswer: false
          },
          {
            text: respostaIncorretaDois,
            image: urlImagemIncorretaDois,
            isCorrectAnswer: false
          },
          {
            text: respostaIncorretaTres,
            image: urlImagemIncorretaTres,
            isCorrectAnswer: false
          }
        ]
      })
      perguntaInput.value = ''
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
        validacao = true
      } else {
        alert("⚠ Dados inválidos, preencha o formulário novamente!")
        // reseta os inputs
        perguntaInput.value = ''
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
    }
    validacao ? funcoesQuizzes.criarQuizzPasso3() : concole.log("Validação falhou")
  },

  validaCriacaoDeQuizzParte3() {
    const tituloNivelUmInput = document.querySelector(".cria-quizz.passo-tres .titulo-nivel-um")
    const acertoMinimoUmInput = document.querySelector(".cria-quizz.passo-tres .acerto-minimo-um")
    const nivelUmUrlInput = document.querySelector(".cria-quizz.passo-tres .nivel-um-url")
    const descricaoNivelTextarea = document.querySelector(".cria-quizz.passo-tres .descricao-nivel-um")
    infoBaseCriaQuizz.levels = []
    let validaPorcentagemAcertoMinimo = 1
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

    if(Number(acertoMinimoUm) === 0) {
      validaPorcentagemAcertoMinimo = true
    }

    infoBaseCriaQuizz.levels.push(
      {
        title: tituloNivelUm,
        minValue: acertoMinimoUm,
        image: nivelUmUrl,
        text: descricaoNivel
      })

    tituloNivelUmInput.value = ''
    acertoMinimoUmInput.value = ''
    nivelUmUrlInput.value = ''
    descricaoNivelTextarea.value = ''

    const validaUrl = funcoesDeControle.validaUrl(nivelUmUrl)
    if(validaUrl) {
      console.log(infoBaseCriaQuizz)
    } else {
      alert("⚠ Dados inválidos, preencha o formulário novamente!")
    }

    validaPorcentagemAcertoMinimo ? funcoesQuizzes.criarQuizzPasso4() : alert("⚠ Pelo menos um dos níveis deve possuir % de acerto igual a 0!")
  },

  enviaQuizzParaServidor() {
    const promise = axios.post(`${API_URL}/quizzes`, infoBaseCriaQuizz)
    promise.then((response) => {console.log("Resposta: ", response)})
    promise.catch((err) => {console.log("Error: ", err)})
  },

  listarTodosOsQuizzes() {
    const listaDeTodosOsQuizzes = document.querySelector(".quizzes-todos");

    listaDeTodosOsQuizzes.innerHTML = funcoesQuizzes.montaEstruturaQuizzPrimeiraTela();
    funcoesQuizzes.montaEstruturaQuizzPrimeiraTela();
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
    let respostas_pergunta_um = [{
      booleano: quizzDaSegundaTela.questions[0].answers[0].isCorrectAnswer,
      resposta_um_imagem: quizzDaSegundaTela.questions[0].answers[0].image,
      resposta_um_texto: quizzDaSegundaTela.questions[0].answers[0].text,
    }, {
      booleano: quizzDaSegundaTela.questions[0].answers[1].isCorrectAnswer,
      resposta_dois_imagem: quizzDaSegundaTela.questions[0].answers[1].image,
      resposta_dois_texto: quizzDaSegundaTela.questions[0].answers[1].text,
    }, {
      booleano: quizzDaSegundaTela.questions[0].answers[2].isCorrectAnswer,
      resposta_tres_imagem: quizzDaSegundaTela.questions[0].answers[2].image,
      resposta_tres_texto: quizzDaSegundaTela.questions[0].answers[2].text,
    }, {
      booleano: quizzDaSegundaTela.questions[0].answers[3].isCorrectAnswer,
      resposta_quatro_imagem: quizzDaSegundaTela.questions[0].answers[3].image,
      resposta_quatro_texto: quizzDaSegundaTela.questions[0].answers[3].text,
    }]
    respostas_pergunta_um.sort(comparador);

    let respostas_pergunta_dois = [{
      booleano: quizzDaSegundaTela.questions[1].answers[0].isCorrectAnswer,
      resposta_um_imagem: quizzDaSegundaTela.questions[1].answers[0].image,
      resposta_um_texto: quizzDaSegundaTela.questions[1].answers[0].text,
    }, {
      booleano: quizzDaSegundaTela.questions[1].answers[1].isCorrectAnswer,
      resposta_dois_imagem: quizzDaSegundaTela.questions[1].answers[1].image,
      resposta_dois_texto: quizzDaSegundaTela.questions[1].answers[1].text,
    }, {
      booleano: quizzDaSegundaTela.questions[1].answers[2].isCorrectAnswer,
      resposta_tres_imagem: quizzDaSegundaTela.questions[1].answers[2].image,
      resposta_tres_texto: quizzDaSegundaTela.questions[1].answers[2].text,
    }, {
      booleano: quizzDaSegundaTela.questions[1].answers[3].isCorrectAnswer,
      resposta_quatro_imagem: quizzDaSegundaTela.questions[1].answers[3].image,
      resposta_quatro_texto: quizzDaSegundaTela.questions[1].answers[3].text,
    }]
    respostas_pergunta_dois.sort(comparador);

    let respostas_pergunta_tres = [{
      booleano: quizzDaSegundaTela.questions[2].answers[0].isCorrectAnswer,
      resposta_um_imagem: quizzDaSegundaTela.questions[2].answers[0].image,
      resposta_um_texto: quizzDaSegundaTela.questions[2].answers[0].text,
    }, {
      booleano: quizzDaSegundaTela.questions[2].answers[1].isCorrectAnswer,
      resposta_dois_imagem: quizzDaSegundaTela.questions[2].answers[1].image,
      resposta_dois_texto: quizzDaSegundaTela.questions[2].answers[1].text,
    }, {
      booleano: quizzDaSegundaTela.questions[2].answers[2].isCorrectAnswer,
      resposta_tres_imagem: quizzDaSegundaTela.questions[2].answers[2].image,
      resposta_tres_texto: quizzDaSegundaTela.questions[2].answers[2].text,
    }, {
      booleano: quizzDaSegundaTela.questions[2].answers[3].isCorrectAnswer,
      resposta_quatro_imagem: quizzDaSegundaTela.questions[2].answers[3].image,
      resposta_quatro_texto: quizzDaSegundaTela.questions[2].answers[3].text,
    }]
    respostas_pergunta_tres.sort(comparador);


    let responde_quizz = document.querySelector(".responde-quizz");
    responde_quizz.innerHTML = responde_quizz.innerHTML + `
            <div class="cabecalho-gradiente"></div>
            <h1>${quizzDaSegundaTela.title}</h1>
            <img
            src = ${quizzDaSegundaTela.image}
            alt="imagem da opcao">`

    let cabecalho_um = document.querySelector(".cabecalho-um");
    cabecalho_um.innerHTML = cabecalho_um.innerHTML = `
              <div class="cabecalho-da-pergunta" style = "background-color: ${quizzDaSegundaTela.questions[0].color}">
                <h1>${quizzDaSegundaTela.questions[0].title}</h1>
              </div>`

    let resposta_um_pergunta_um = document.querySelector(".resposta-um-pergunta-um")
    resposta_um_pergunta_um.innerHTML = resposta_um_pergunta_um.innerHTML + `
                    <div class="imagem ${respostas_pergunta_um[0].booleano}">
                      <div class="opcao-gradiente --escondido"></div>
                      <img
                      src="${respostas_pergunta_um[0].resposta_um_imagem}"
                      alt="imagem da opcao">
                      <p><b>${respostas_pergunta_um[0].resposta_um_texto}</b></p>
                    </div>`

    let resposta_dois_pergunta_um = document.querySelector(".resposta-dois-pergunta-um")
    resposta_dois_pergunta_um.innerHTML = resposta_dois_pergunta_um.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[1].booleano}">
                    <div class="opcao-gradiente --escondido"></div>_dois
                    <img
                    src="${respostas_pergunta_um[1].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[1].resposta_um_texto}</b></p>
                  </div>`

    let resposta_tres_pergunta_um = document.querySelector(".resposta-tres-pergunta-um")
    resposta_tres_pergunta_um.innerHTML = resposta_tres_pergunta_um.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[2].booleano}">
                    <div class="opcao-gradiente --escondido"></div>_dois
                    <img
                    src="${respostas_pergunta_um[2].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[2].resposta_um_texto}</b></p>
                  </div>`

    let resposta_quatro_pergunta_um = document.querySelector(".resposta-quatro-pergunta-um")
    resposta_quatro_pergunta_um.innerHTML = resposta_quatro_pergunta_um.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[3].booleano}">
                    <div class="opcao-gradiente --escondido"></div>_dois
                    <img
                    src="${respostas_pergunta_um[3].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[3].resposta_um_texto}</b></p>
                  </div>`

    let cabecalho_dois = document.querySelector(".cabecalho-dois");
    cabecalho_dois.innerHTML = cabecalho_dois.innerHTML = `
              <div class="cabecalho-da-pergunta" style = "background-color: ${quizzDaSegundaTela.questions[1].color}">
                <h1>${quizzDaSegundaTela.questions[1].title}</h1>
              </div>`

    let resposta_um_pergunta_dois = document.querySelector(".resposta-um-pergunta-dois")
    resposta_um_pergunta_dois.innerHTML = resposta_um_pergunta_dois.innerHTML + `
                  <div class="imagem ${respostas_pergunta_dois[0].booleano}">
                    <div class="opcao-gradiente --escondido"></div>
                    <img
                    src="${respostas_pergunta_dois[0].resposta_dois_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_dois[0].resposta_dois_texto}</b></p>
                  </div>`

    let resposta_dois_pergunta_dois = document.querySelector(".resposta-dois-pergunta-dois")
    resposta_dois_pergunta_dois.innerHTML = resposta_dois_pergunta_dois.innerHTML + `
                  <div class="imagem ${respostas_pergunta_dois[1].booleano}">
                    <div class="opcao-gradiente --escondido"></div>
                    <img
                    src="${respostas_pergunta_dois[1].resposta_dois_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_dois[1].resposta_dois_imagem}</b></p>
                  </div>`

    let resposta_tres_pergunta_dois = document.querySelector(".resposta-tres-pergunta-dois")
    resposta_tres_pergunta_dois.innerHTML = resposta_tres_pergunta_dois.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[2].booleano}">
                    <div class="opcao-gradiente --escondido"></div>_dois
                    <img
                    src="${respostas_pergunta_um[2].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[2].resposta_um_texto}</b></p>
                  </div>`

    let resposta_quatro_pergunta_dois = document.querySelector(".resposta-quatro-pergunta-dois")
    resposta_quatro_pergunta_dois.innerHTML = resposta_quatro_pergunta_dois.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[3].booleano}">
                    <div class="opcao-gradiente --escondido"></div>_dois
                    <img
                    src="${respostas_pergunta_um[3].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[3].resposta_um_texto}</b></p>
                  </div>`

    let cabecalho_tres = document.querySelector(".cabecalho-tres");
    cabecalho_tres.innerHTML = cabecalho_tres.innerHTML = `
              <div class="cabecalho-da-pergunta" style = "background-color: ${quizzDaSegundaTela.questions[2].color}">
                <h1>${quizzDaSegundaTela.questions[2].title}</h1>
              </div>`

    let resposta_um_pergunta_tres = document.querySelector(".resposta-um-pergunta-tres")
    resposta_um_pergunta_tres.innerHTML = resposta_um_pergunta_tres.innerHTML + `
                  <div class="imagem ${respostas_pergunta_tres[0].booleano}">
                    <div class="opcao-gradiente --escondido"></div>
                    <img
                    src="${respostas_pergunta_tres[0].resposta_tres_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_tres[0].resposta_tres_texto}</b></p>
                  </div>`

    let resposta_dois_pergunta_tres = document.querySelector(".resposta-dois-pergunta-tres")
    resposta_dois_pergunta_tres.innerHTML = resposta_dois_pergunta_tres.innerHTML + `
                  <div class="imagem {respostas_pergunta_tres[1].booleano}">
                    <div class="opcao-gradiente --escondido"></div>
                    <img
                    src="${respostas_pergunta_tres[1].resposta_tres_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_tres[1].resposta_tres_texto}</b></p>
                  </div>`

    let resposta_tres_pergunta_tres = document.querySelector(".resposta-tres-pergunta-tres")
    resposta_tres_pergunta_tres.innerHTML = resposta_tres_pergunta_tres.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[2].booleano}">
                    <div class="opcao-gradiente --escondido"></div>_dois
                    <img
                    src="${respostas_pergunta_um[2].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[2].resposta_um_texto}</b></p>
                  </div>`

    let resposta_quatro_pergunta_tres = document.querySelector(".resposta-quatro-pergunta-tres")
    resposta_quatro_pergunta_tres.innerHTML = resposta_quatro_pergunta_tres.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[3].booleano}">
                    <div class="opcao-gradiente --escondido"></div>_dois
                    <img
                    src="${respostas_pergunta_um[3].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[3].resposta_um_texto}</b></p>
                  </div>`
  },

  verificaRespostaCorreta(classe) {
    let opcao_gradiente = document.querySelectorAll(".opcao_gradiente");
    if(classe.checked) {
      opcao_gradiente.forEach((elemento) => {
        elemento.classList.remove("--escondido");
        classe.classList.add("--escondido");
      })
    }
  },

  montaEstruturaDaPergunta(numero) {
    const perguntaAnterior = document.querySelector(`.pergunta-${numero - 1}`)
    const estruturaPergunta = `
        <h1>Pergunta ${numero}</h1>
        <ion-icon onclick="funcoesDeControle.abrePergunta(${numero})" name="create-outline"></ion-icon>
        <div class="pergunta-${numero}-dentro --escondido">
          <input type="text" placeholder="Texto da pergunta" class="texto-pergunta-${numero}" id="pergunta-${numero}"
            minlength="20" required>
          <label for="pergunta-${numero}-cor" class="--sr-only">Cor de Fundo</label>
          <input type="text" placeholder="Cor de fundo da pergunta" class="cor-pergunta-${numero}" id="pergunta-${numero}-cor"
            maxlength="7" required>
          <label for="resposta-correta-p${numero}">Resposta correta</label>
          <input type="text" placeholder="Resposta correta" class="texto-resposta-correta-p${numero}" id="resposta-correta-p${numero}"
            required>
          <label for="resposta-correta-url-p${numero}" class="--sr-only">Url da imagem correspondente a resposta
            correta</label>
          <input type="text" placeholder="URL da imagem" class="url-imagem-correta-p${numero}" id="resposta-correta-url-p${numero}">
          <label for="resposta-incorreta-1-p${numero}">Respostas incorretas</label>
          <input type="text" placeholder="Resposta incorreta 1" class="texto-incorreto-um-p${numero}" id="resposta-incorreta-1-p${numero}"
            required>
          <label for="resposta-incorreta-1-url-p${numero}" class="--sr-only">URL da 1ª resposta errada</label>
          <input type="text" placeholder="URL da imagem 1" class="url-incorreto-um-p${numero}" id="resposta-incorreta-1-url-p${numero}">
          <label for="resposta-incorreta-2-p${numero}" class="--sr-only">2ª resposta errada</label>
          <input type="text" placeholder="Resposta incorreta 2" class="texto-incorreto-dois-p${numero}"
            id="resposta-incorreta-2">
          <label for="resposta-incorreta-2-url-p${numero}" class="--sr-only">URL da 2ª resposta errada</label>
          <input type="text" placeholder="URL da imagem 2" class="url-incorreto-dois-p${numero}" id="resposta-incorreta-2-url-p${numero}">
          <label for="resposta-incorreta-3-p${numero}" class="--sr-only">3ª resposta errada</label>
          <input type="text" placeholder="Resposta incorreta 3" class="texto-incorreto-tres-p${numero}"
            id="resposta-incorreta-3">
          <label for="resposta-incorreta-3-url-p${numero}" class="--sr-only">URL da 3ª resposta errada</label>
          <input type="text" placeholder="URL da imagem 3" class="url-incorreto-tres-p${numero}" id="resposta-incorreta-3-url-p${numero}">
        </div>
    `

    const perguntaAdicional = document.createElement('div')
    perguntaAdicional.classList.add(`pergunta-${numero}`, '--adicional', 'fechado')
    perguntaAdicional.innerHTML = estruturaPergunta;

    perguntaAnterior.insertAdjacentElement('afterend', perguntaAdicional)
  },

  montaEstruturaDoNível(numero) {
    const nivelAnterior = document.querySelector(`.nivel-${numero - 1}`)
    const estruturaNivel = `
      <h1>Nível ${numero}</h1>
      <ion-icon onclick="funcoesDeControle.abreNivel(${numero})" name="create-outline"></ion-icon>
      <div class="nivel-${numero}-dentro --escondido">
        <input type="text" placeholder="Título do nível" class="titulo-nivel-${numero}" id="nivel-${numero}" minlength="10" required>

        <label for="acerto-minimo-${numero}" class="--sr-only">% de acerto mínima</label>
        <input type="number" placeholder="% de acerto mínima" class="acerto-minimo-${numero}" id="acerto-minimo-${numero}" min="0" max="100" required>

        <label for="nivel-${numero}-url" class="--sr-only">Url da imagem correspondente ao nível</label>
        <input type="text" placeholder="URL da imagem do nível" class="nivel-${numero}-url" id="nivel-${numero}-url" required>

        <label for="descricao-nivel-${numero}" class="--sr-only">Descrição do nível</label>
        <textarea name="descricao-nivel-${numero}" type="text" rows="10" minlength="30" placeholder="Descrição do nível" class="descricao-nivel-${numero}" id="descricao-nivel-${numero}" required></textarea>
      </div>
    `

    const nivelAdicional = document.createElement('div')
    nivelAdicional.classList.add(`nivel-${numero}`, '--adicional', 'fechado')
    nivelAdicional.innerHTML = estruturaNivel

    nivelAnterior.insertAdjacentElement("afterend", nivelAdicional)
  },

  montaEstruturaSucessoCriacao() {
    funcoesQuizzes.enviaQuizzParaServidor()

    const passoQuatro = document.querySelector(".cria-quizz.passo-quatro")
    const estruturaSucesso = `
      <h1>Seu quizz está pronto</h1>
      <div class="quizz --criado">
        <div class="quizz-gradiente"></div>
        <img src="${infoBaseCriaQuizz.image}" alt="Imagem de capa do quizz">
        <p>${infoBaseCriaQuizz.title}</p>
      </div>
      <button class="botao-criacao" type="button" onclick="funcoesQuizzes.responderQuizz(this.previousElementSibling)">Acessar Quizz</button>
      <a href="/" onclick="window.location.reload()"><p>Voltar pra home</p></a>
    `

    passoQuatro.innerHTML = estruturaSucesso
  }
}

const infoBaseCriaQuizz = new Object()

funcoesApi.obterQuizzes()
funcoesQuizzes.listaSeusQuizzes();

function comparador() {
  return Math.random() - 0.5;
}

console.log(quizzDaSegundaTela)
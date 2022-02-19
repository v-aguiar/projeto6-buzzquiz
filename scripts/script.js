const API_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let NUM_PERGUNTAS = 3
let NUM_NIVEIS = 2
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
  created_ids: [],

  criarQuizz() {
    funcoesDeControle.toogleTela1();
    funcoesDeControle.toogleTela3Parte1();
  },

  criarQuizzPasso2() {
    funcoesDeControle.toogleTela3Parte1();
    funcoesDeControle.toogleTela3Parte2();

    for(let index = 2; index <= NUM_PERGUNTAS; index++) {
      funcoesQuizzes.montaEstruturaDaPergunta(index);
    }
  },

  criarQuizzPasso3() {
    funcoesDeControle.toogleTela3Parte2();
    funcoesDeControle.toogleTela3Parte3();

    for(let index = 2; index <= NUM_NIVEIS; index++) {
      funcoesQuizzes.montaEstruturaDoNível(index);
    }
  },

  criarQuizzPasso4() {
    funcoesDeControle.toogleTela3Parte3();
    funcoesDeControle.toogleTela3Parte4();

    funcoesQuizzes.montaEstruturaSucessoCriacao()
  },

  responderQuizz(quizz) {

    const titulo = quizz.querySelector("p").innerHTML

    console.log(titulo)

    funcoesQuizzes.quizzes.forEach((card) => {
      if(card.title === titulo)
        quizzDaSegundaTela = card
    })


    funcoesDeControle.toogleTela1();
    funcoesDeControle.toogleTela2();

    funcoesQuizzes.montaEstruturaQuizzSegundaTela();
  },

  responderQuizzCriado(id_criado) {
    funcoesQuizzes.quizzes.forEach((quizz) => {
      if(quizz.id === id_criado)
        quizzDaSegundaTela = quizz
    })

    funcoesDeControle.toogleTela3Parte4()
    funcoesDeControle.toogleTela2()

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

  enviaQuizzParaServidor() {
    const promise = axios.post(`${API_URL}/quizzes`, infoBaseCriaQuizz)
    promise.then((response) => {
      const idsAntigos = localStorage.getItem("ids")
      const arrayIdsAntigos = JSON.parse(idsAntigos)

      arrayIdsAntigos.push(response.data.id)

      funcoesQuizzes.created_ids.push(response.data.id)

      const ids = JSON.stringify(arrayIdsAntigos)

      localStorage.setItem("ids", ids)
    })
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
    funcoesQuizzes.checaQuizzesCriadosNoStorage()

    setTimeout(() => {
      if(funcoesQuizzes.seus_quizzes.length !== 0) {
        funcoesDeControle.toogleTela1SemQuizzes();
        funcoesDeControle.toogleTela1SeusQuizzes();

        listaDeSeusQuizzes.innerHTML = funcoesQuizzes.montaEstruturaSeusQuizzes();
      }
    }, 1000)
  },

  checaQuizzesCriadosNoStorage() {
    const idsNoStorage = localStorage.getItem('ids')
    const ids = JSON.parse(idsNoStorage)

    console.log("Ids: ", ids)


    const arrayQuizzes = funcoesQuizzes.quizzes
    setTimeout(() => {
      ids.forEach((id) => {
        const quizzFinder = arrayQuizzes.find(quizz => quizz.id === id)

        if(quizzFinder !== undefined) {
          funcoesQuizzes.seus_quizzes.push(quizzFinder)
        }

        console.log("retorno do find: ", quizzFinder)
        console.log("seus quizzes: ", funcoesQuizzes.seus_quizzes)
      })
    }, 1000)
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
    if(quizzDaSegundaTela.questions[0].answers.length > 2){
    let respostas_pergunta_um = [{
      booleano: quizzDaSegundaTela.questions[0].answers[0].isCorrectAnswer,
      resposta_um_imagem: quizzDaSegundaTela.questions[0].answers[0].image,
      resposta_um_texto: quizzDaSegundaTela.questions[0].answers[0].text,
    },{
      booleano: quizzDaSegundaTela.questions[0].answers[1].isCorrectAnswer,
      resposta_dois_imagem: quizzDaSegundaTela.questions[0].answers[1].image,
      resposta_dois_texto: quizzDaSegundaTela.questions[0].answers[1].text,
    },{ 
      booleano: quizzDaSegundaTela.questions[0].answers[2].isCorrectAnswer,
      resposta_tres_imagem: quizzDaSegundaTela.questions[0].answers[2].image,
      resposta_tres_texto: quizzDaSegundaTela.questions[0].answers[2].text,
    },{
      booleano: quizzDaSegundaTela.questions[0].answers[3].isCorrectAnswer,
      resposta_quatro_imagem: quizzDaSegundaTela.questions[0].answers[3].image,
      resposta_quatro_texto: quizzDaSegundaTela.questions[0].answers[3].text,
    }]
    respostas_pergunta_um.sort(comparador);

    let respostas_pergunta_dois = [{
      booleano: quizzDaSegundaTela.questions[1].answers[0].isCorrectAnswer,
      resposta_um_imagem: quizzDaSegundaTela.questions[1].answers[0].image,
      resposta_um_texto: quizzDaSegundaTela.questions[1].answers[0].text,
    },{
      booleano: quizzDaSegundaTela.questions[1].answers[1].isCorrectAnswer,
      resposta_dois_imagem: quizzDaSegundaTela.questions[1].answers[1].image,
      resposta_dois_texto: quizzDaSegundaTela.questions[1].answers[1].text,
    },{
      booleano: quizzDaSegundaTela.questions[1].answers[2].isCorrectAnswer,
      resposta_tres_imagem: quizzDaSegundaTela.questions[1].answers[2].image,
      resposta_tres_texto: quizzDaSegundaTela.questions[1].answers[2].text,
    },{
      booleano: quizzDaSegundaTela.questions[1].answers[3].isCorrectAnswer,
      resposta_quatro_imagem: quizzDaSegundaTela.questions[1].answers[3].image,
      resposta_quatro_texto: quizzDaSegundaTela.questions[1].answers[3].text,
    }]
    respostas_pergunta_dois.sort(comparador);

    let respostas_pergunta_tres = [{
      booleano: quizzDaSegundaTela.questions[2].answers[0].isCorrectAnswer,
      resposta_um_imagem: quizzDaSegundaTela.questions[2].answers[0].image,
      resposta_um_texto: quizzDaSegundaTela.questions[2].answers[0].text,
    },{
      booleano: quizzDaSegundaTela.questions[2].answers[1].isCorrectAnswer,
      resposta_dois_imagem: quizzDaSegundaTela.questions[2].answers[1].image,
      resposta_dois_texto: quizzDaSegundaTela.questions[2].answers[1].text,
    },{
      booleano: quizzDaSegundaTela.questions[2].answers[2].isCorrectAnswer,
      resposta_tres_imagem: quizzDaSegundaTela.questions[2].answers[2].image,
      resposta_tres_texto: quizzDaSegundaTela.questions[2].answers[2].text,
    },{
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
                      <div class="opcao-um-pergunta-um opcao-gradiente-um --escondido"></div>
                      <img
                      src="${respostas_pergunta_um[0].resposta_um_imagem}"
                      alt="imagem da opcao">
                      <p><b>${respostas_pergunta_um[0].resposta_um_texto}</b></p>
                    </div>`
    
    let resposta_dois_pergunta_um = document.querySelector(".resposta-dois-pergunta-um")
    resposta_dois_pergunta_um.innerHTML = resposta_dois_pergunta_um.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[1].booleano}">
                    <div class="opcao-dois-pergunta-um opcao-gradiente-um --escondido"></div>
                    <img
                    src="${respostas_pergunta_um[1].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[1].resposta_um_texto}</b></p>
                  </div>`

    let resposta_tres_pergunta_um = document.querySelector(".resposta-tres-pergunta-um")
    resposta_tres_pergunta_um.innerHTML = resposta_tres_pergunta_um.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[2].booleano}">
                    <div class="opcao-tres-pergunta-um opcao-gradiente-um --escondido"></div>
                    <img
                    src="${respostas_pergunta_um[2].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[2].resposta_um_texto}</b></p>
                  </div>`

    let resposta_quatro_pergunta_um = document.querySelector(".resposta-quatro-pergunta-um")
    resposta_quatro_pergunta_um.innerHTML = resposta_quatro_pergunta_um.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[3].booleano}">
                    <div class="opcao-quatro-pergunta-um opcao-gradiente-um --escondido"></div>
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
                    <div class="opcao-um-pergunta-dois opcao-gradiente-dois --escondido"></div>
                    <img
                    src="${respostas_pergunta_dois[0].resposta_dois_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_dois[0].resposta_dois_texto}</b></p>
                  </div>`
                
      let resposta_dois_pergunta_dois = document.querySelector(".resposta-dois-pergunta-dois")
      resposta_dois_pergunta_dois.innerHTML = resposta_dois_pergunta_dois.innerHTML + `
                  <div class="imagem ${respostas_pergunta_dois[1].booleano}">
                    <div class="opcao-dois-pergunta-dois opcao-gradiente-dois --escondido"></div>
                    <img
                    src="${respostas_pergunta_dois[1].resposta_dois_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_dois[1].resposta_dois_imagem}</b></p>
                  </div>`

    let resposta_tres_pergunta_dois = document.querySelector(".resposta-tres-pergunta-dois")
    resposta_tres_pergunta_dois.innerHTML = resposta_tres_pergunta_dois.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[2].booleano}">
                    <div class="opcao-tres-pergunta-dois opcao-gradiente-dois --escondido"></div>_dois
                    <img
                    src="${respostas_pergunta_um[2].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[2].resposta_um_texto}</b></p>
                  </div>`

    let resposta_quatro_pergunta_dois = document.querySelector(".resposta-quatro-pergunta-dois")
    resposta_quatro_pergunta_dois.innerHTML = resposta_quatro_pergunta_dois.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[3].booleano}">
                    <div class="opcao-quatro-pergunta-dois opcao-gradiente-dois --escondido"></div>_dois
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
                    <div class="opcao-um-pergunta-tres opcao-gradiente-tres --escondido"></div>
                    <img
                    src="${respostas_pergunta_tres[0].resposta_tres_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_tres[0].resposta_tres_texto}</b></p>
                  </div>`
              
    let resposta_dois_pergunta_tres = document.querySelector(".resposta-dois-pergunta-tres")
    resposta_dois_pergunta_tres.innerHTML = resposta_dois_pergunta_tres.innerHTML + `
                  <div class="imagem {respostas_pergunta_tres[1].booleano}">
                    <div class="opcao-dois-pergunta-tres opcao-gradiente-tres --escondido"></div>
                    <img
                    src="${respostas_pergunta_tres[1].resposta_tres_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_tres[1].resposta_tres_texto}</b></p>
                  </div>`

        let resposta_tres_pergunta_tres = document.querySelector(".resposta-tres-pergunta-tres")
    resposta_tres_pergunta_tres.innerHTML = resposta_tres_pergunta_tres.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[2].booleano}">
                    <div class="opcao-tres-pergunta-tres opcao-gradiente-tres --escondido"></div>_dois
                    <img
                    src="${respostas_pergunta_um[2].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[2].resposta_um_texto}</b></p>
                  </div>`

    let resposta_quatro_pergunta_tres = document.querySelector(".resposta-quatro-pergunta-tres")
    resposta_quatro_pergunta_tres.innerHTML = resposta_quatro_pergunta_tres.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[3].booleano}">
                    <div class="opcao-quatro-pergunta-tres opcao-gradiente-tres --escondido"></div>_dois
                    <img
                    src="${respostas_pergunta_um[3].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[3].resposta_um_texto}</b></p>
                  </div>`
  }else{
    let respostas_pergunta_um = [{
      booleano: quizzDaSegundaTela.questions[0].answers[0].isCorrectAnswer,
      resposta_um_imagem: quizzDaSegundaTela.questions[0].answers[0].image,
      resposta_um_texto: quizzDaSegundaTela.questions[0].answers[0].text,
    },{
      booleano: quizzDaSegundaTela.questions[0].answers[1].isCorrectAnswer,
      resposta_dois_imagem: quizzDaSegundaTela.questions[0].answers[1].image,
      resposta_dois_texto: quizzDaSegundaTela.questions[0].answers[1].text,
    }]
    respostas_pergunta_um.sort(comparador);

    let respostas_pergunta_dois = [{
      booleano: quizzDaSegundaTela.questions[1].answers[0].isCorrectAnswer,
      resposta_um_imagem: quizzDaSegundaTela.questions[1].answers[0].image,
      resposta_um_texto: quizzDaSegundaTela.questions[1].answers[0].text,
    },{
      booleano: quizzDaSegundaTela.questions[1].answers[1].isCorrectAnswer,
      resposta_dois_imagem: quizzDaSegundaTela.questions[1].answers[1].image,
      resposta_dois_texto: quizzDaSegundaTela.questions[1].answers[1].text,
    }]
    respostas_pergunta_dois.sort(comparador);

    let respostas_pergunta_tres = [{
      booleano: quizzDaSegundaTela.questions[2].answers[0].isCorrectAnswer,
      resposta_um_imagem: quizzDaSegundaTela.questions[2].answers[0].image,
      resposta_um_texto: quizzDaSegundaTela.questions[2].answers[0].text,
    },{
      booleano: quizzDaSegundaTela.questions[2].answers[1].isCorrectAnswer,
      resposta_dois_imagem: quizzDaSegundaTela.questions[2].answers[1].image,
      resposta_dois_texto: quizzDaSegundaTela.questions[2].answers[1].text,
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
                      <div class="opcao-um-pergunta-um opcao-gradiente-um --escondido"></div>
                      <img
                      src="${respostas_pergunta_um[0].resposta_um_imagem}"
                      alt="imagem da opcao">
                      <p><b>${respostas_pergunta_um[0].resposta_um_texto}</b></p>
                    </div>`
    
    let resposta_dois_pergunta_um = document.querySelector(".resposta-dois-pergunta-um")
    resposta_dois_pergunta_um.innerHTML = resposta_dois_pergunta_um.innerHTML + `
                  <div class="imagem ${respostas_pergunta_um[1].booleano}">
                    <div class="opcao-dois-pergunta-um opcao-gradiente-um --escondido"></div>
                    <img
                    src="${respostas_pergunta_um[1].resposta_um_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_um[1].resposta_um_texto}</b></p>
                  </div>`

    let cabecalho_dois = document.querySelector(".cabecalho-dois");
    cabecalho_dois.innerHTML = cabecalho_dois.innerHTML = `
              <div class="cabecalho-da-pergunta" style = "background-color: ${quizzDaSegundaTela.questions[1].color}">
                <h1>${quizzDaSegundaTela.questions[1].title}</h1>
              </div>`

    let resposta_um_pergunta_dois = document.querySelector(".resposta-um-pergunta-dois")
    resposta_um_pergunta_dois.innerHTML = resposta_um_pergunta_dois.innerHTML + `
                  <div class="imagem ${respostas_pergunta_dois[0].booleano}">
                    <div class="opcao-um-pergunta-dois opcao-gradiente-dois --escondido"></div>
                    <img
                    src="${respostas_pergunta_dois[0].resposta_dois_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_dois[0].resposta_dois_texto}</b></p>
                  </div>`
                
      let resposta_dois_pergunta_dois = document.querySelector(".resposta-dois-pergunta-dois")
      resposta_dois_pergunta_dois.innerHTML = resposta_dois_pergunta_dois.innerHTML + `
                  <div class="imagem ${respostas_pergunta_dois[1].booleano}">
                    <div class="opcao-dois-pergunta-dois opcao-gradiente-dois --escondido"></div>
                    <img
                    src="${respostas_pergunta_dois[1].resposta_dois_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_dois[1].resposta_dois_imagem}</b></p>
                  </div>`
        
    let cabecalho_tres = document.querySelector(".cabecalho-tres");
    cabecalho_tres.innerHTML = cabecalho_tres.innerHTML = `
              <div class="cabecalho-da-pergunta" style = "background-color: ${quizzDaSegundaTela.questions[2].color}">
                <h1>${quizzDaSegundaTela.questions[2].title}</h1>
              </div>`

    let resposta_um_pergunta_tres = document.querySelector(".resposta-um-pergunta-tres")
    resposta_um_pergunta_tres.innerHTML = resposta_um_pergunta_tres.innerHTML + `
                  <div class="imagem ${respostas_pergunta_tres[0].booleano}">
                    <div class="opcao-um-pergunta-tres opcao-gradiente-tres --escondido"></div>
                    <img
                    src="${respostas_pergunta_tres[0].resposta_tres_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_tres[0].resposta_tres_texto}</b></p>
                  </div>`
              
    let resposta_dois_pergunta_tres = document.querySelector(".resposta-dois-pergunta-tres")
    resposta_dois_pergunta_tres.innerHTML = resposta_dois_pergunta_tres.innerHTML + `
                  <div class="imagem {respostas_pergunta_tres[1].booleano}">
                    <div class="opcao-dois-pergunta-tres opcao-gradiente-tres --escondido"></div>
                    <img
                    src="${respostas_pergunta_tres[1].resposta_tres_imagem}"
                    alt="imagem da opcao">
                    <p><b>${respostas_pergunta_tres[1].resposta_tres_texto}</b></p>
                  </div>`
  }
  },

    
  verificaRespostaCorretaPerguntaUm(classe, tipo_de_opcao) {
    let opcao_gradiente_um = document.querySelectorAll(".opcao-gradiente-um");
    let esta_opcao = document.querySelector("." + tipo_de_opcao);
    let radios_um = document.querySelectorAll(".radio-um");
    for(let x = 0; x < radios_um.length; x++){
      if(radios_um[x].checked){
        for(let i = 0; i < opcao_gradiente_um.length; i++){
        opcao_gradiente_um[i].classList.remove("--escondido");
        }
      }
    }
    for(let z = 0; z < radios_um.length; z++){
      radios_um[z].disabled = true;
  }
  esta_opcao.classList.add("--escondido");
},

  verificaRespostaCorretaPerguntaDois(classe, tipo_de_opcao) {
    let opcao_gradiente_dois = document.querySelectorAll(".opcao-gradiente-dois");
    let esta_opcao = document.querySelector("." + tipo_de_opcao);
    let radios_dois = document.querySelectorAll(".radio-dois");
    for(let x = 0; x < radios_dois.length; x++){
      if(radios_dois[x].checked){
        for(let i = 0; i < opcao_gradiente_dois.length; i++){
        opcao_gradiente_dois[i].classList.remove("--escondido");
        }
      }
    }
    for(let z = 0; z < radios_dois.length; z++){
      radios_dois[z].disabled = true;
  }
  esta_opcao.classList.add("--escondido");
},

  verificaRespostaCorretaPerguntaTres(classe, tipo_de_opcao) {
    let opcao_gradiente_tres = document.querySelectorAll(".opcao-gradiente-tres");
    let esta_opcao = document.querySelector("." + tipo_de_opcao);
    let radios_tres = document.querySelectorAll(".radio-tres");
    for(let x = 0; x < radios_tres.length; x++){
      if(radios_tres[x].checked){
        for(let i = 0; i < opcao_gradiente_tres.length; i++){
        opcao_gradiente_tres[i].classList.remove("--escondido");
        }
      }
    }
    for(let z = 0; z < radios_tres.length; z++){
      radios_tres[z].disabled = true;
  }
  esta_opcao.classList.add("--escondido");
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
      <button class="botao-criacao --sucesso" type="button" onclick="funcoesQuizzes.responderQuizzCriado(funcoesQuizzes.created_ids[funcoesQuizzes.created_ids.length - 1])">Acessar Quizz</button>
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


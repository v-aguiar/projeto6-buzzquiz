const API_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let QUANTIDADE_DE_ACERTOS = 0
let NUM_PERGUNTAS = 3
let NUM_NIVEIS = 2
let JOGADAS = 0;
let quizzDaSegundaTela
let id_para_reiniciar

const infoBaseCriaQuizz = new Object()

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

  comparador() {
    return Math.random() - 0.5;
  },

  validaUrl(url) {
    let validaUrl = null
    try {
      validaUrl = new URL(url)
    } catch(erro) {
      console.error("⚠ URL INVÁLIDA -> Preencha os dados do seu quizz novamente!")
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
      console.error("⚠ COR INFORMADA NÃO É HEXADECIMAL -> Preencha os dados do seu quizz novamente!")

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

  responderQuizz(quizz) {

    const titulo = quizz.querySelector("p").innerHTML

    funcoesQuizzes.quizzes.forEach((card) => {
      if(card.title === titulo)
        quizzDaSegundaTela = card
    })

    funcoesDeControle.toogleTela1();
    funcoesDeControle.toogleTela2();

    montaEstrutura.montaEstruturaQuizzSegundaTela();

    id_para_reiniciar = quizz;
  },

  responderQuizzCriado(id_criado) {
    funcoesQuizzes.quizzes.forEach((quizz) => {
      if(quizz.id === id_criado)
        quizzDaSegundaTela = quizz
    })

    setTimeout(() => {
      funcoesDeControle.toogleTela3Parte4()
      funcoesDeControle.toogleTela2()

      montaEstrutura.montaEstruturaQuizzSegundaTela();
    }, 1000);
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

    const validaInputs = funcoesQuizzes.escutaInputs(1)
    const validaUrl = funcoesDeControle.validaUrl(urlDaImagem)

    if(validaUrl && validaInputs) {
      criaQuizz.criarQuizzPasso2()
    } else {
      alert("⚠ Dados inválidos, preencha o formulário novamente!")
      tituloQuizzInput.value = ''
      urlDaImagemInput.value = ''
      qtdPerguntasInput.value = ''
      qtdNiveisInput.value = ''
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },

  validaCriacaoDeQuizzParte2() {
    infoBaseCriaQuizz.questions = []
    let validacao = true
    const validaInputs = funcoesQuizzes.escutaInputs(2)

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
      if(urlsSaoValidas) {
        validacao = validacao && true
      }
    }

    (validacao && validaInputs) ? criaQuizz.criarQuizzPasso3() : console.log("⚠ Dados inválidos, preencha o formulário novamente!")
  },

  validaCriacaoDeQuizzParte3() {
    infoBaseCriaQuizz.levels = []
    let validaPorcentagemAcertoMinimo = 1
    let validacaoIteracao = true
    const validaInputs = funcoesQuizzes.escutaInputs(3)

    for(let index = 1; index <= NUM_NIVEIS; index++) {
      const tituloNivelUmInput = document.querySelector(`.cria-quizz.passo-tres .titulo-nivel-${index}`)
      const acertoMinimoUmInput = document.querySelector(`.cria-quizz.passo-tres .acerto-minimo-${index}`)
      const nivelUmUrlInput = document.querySelector(`.cria-quizz.passo-tres .nivel-${index}-url`)
      const descricaoNivelTextarea = document.querySelector(`.cria-quizz.passo-tres .descricao-nivel-${index}`)
      const tituloNivelUm = tituloNivelUmInput.value
      const acertoMinimoUm = acertoMinimoUmInput.value
      const nivelUmUrl = nivelUmUrlInput.value
      const descricaoNivel = descricaoNivelTextarea.value

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
      validacaoIteracao = validacaoIteracao && validaUrl
    }

    const validacao = (validaInputs && validaPorcentagemAcertoMinimo && validacaoIteracao)

    validacao ? criaQuizz.criarQuizzPasso4() : alert("⚠ Dados inválidos, preencha o formulário novamente!")
  },

  checaQuizzesCriadosNoStorage() {
    const idsNoStorage = localStorage.getItem('ids')
    const ids = JSON.parse(idsNoStorage)

    const arrayQuizzes = funcoesQuizzes.quizzes

    if(localStorage.length > 0) {
      const idsNoStorage = localStorage.getItem('ids')
      const ids = JSON.parse(idsNoStorage)

      setTimeout(() => {
        ids.forEach((id) => {
          const quizzFinder = arrayQuizzes.find(quizz => quizz.id === id)

          if(quizzFinder !== undefined) {
            funcoesQuizzes.seus_quizzes.push(quizzFinder)
          }
        })
      }, 1000)
    } else {
      console.log("Sem itens no local storage")
    }
  },

  enviaQuizzParaServidor() {
    const promise = axios.post(`${API_URL}/quizzes`, infoBaseCriaQuizz)
    promise.then((response) => {
      if(localStorage.length > 0) {
        const idsAntigos = localStorage.getItem("ids")
        const arrayIdsAntigos = JSON.parse(idsAntigos)

        arrayIdsAntigos.push(response.data.id)

        funcoesQuizzes.created_ids.push(response.data.id)

        const ids = JSON.stringify(arrayIdsAntigos)
        localStorage.setItem("ids", ids)
      } else {
        funcoesQuizzes.created_ids.push(response.data.id)
        localStorage.setItem("ids", JSON.stringify(funcoesQuizzes.created_ids))
      }
    })
    promise.catch((err) => {console.log("Error: ", err)})
  },

  listarTodosOsQuizzes() {
    const listaDeTodosOsQuizzes = document.querySelector(".quizzes-todos");

    listaDeTodosOsQuizzes.innerHTML = montaEstrutura.montaEstruturaQuizzPrimeiraTela();
    montaEstrutura.montaEstruturaQuizzPrimeiraTela();
  },

  listaSeusQuizzes() {
    const listaDeSeusQuizzes = document.querySelector(".lista-seus-quizzes");
    funcoesQuizzes.checaQuizzesCriadosNoStorage()

    setTimeout(() => {
      if(funcoesQuizzes.seus_quizzes.length !== 0) {
        funcoesDeControle.toogleTela1SemQuizzes();
        funcoesDeControle.toogleTela1SeusQuizzes();

        listaDeSeusQuizzes.innerHTML = montaEstrutura.montaEstruturaSeusQuizzes();
      }
    }, 1000)
  },

  escutaInputs(numero) {
    // TESTING CLIENT-SIDE VALIDATION
    let validacao = true
    const todosInputs = document.querySelectorAll(`.cria-quizz.passo-${numero} .forms input`)

    todosInputs.forEach((input) => {
      validacao = (input.validity.valid && validacao)
    })

    return validacao
  },

  verificaRespostaCorreta(num_pergunta, tipo_de_opcao, tipo_texto) {
    let cabecalho = document.querySelector(".cabecalho-" + (num_pergunta + 1))
    let opcao_gradiente = document.querySelectorAll(".opcao-gradiente-" + num_pergunta);
    let esta_opcao = document.querySelector("." + tipo_de_opcao);
    let radios = document.querySelectorAll(".radio-" + num_pergunta);
    let texto = document.querySelectorAll(".texto-" + num_pergunta);
    let tipo_de_texto = document.querySelector("." + tipo_texto)

    for(let x = 0; x < radios.length; x++) {
      if(radios[x].checked) {
        for(let i = 0; i < opcao_gradiente.length; i++) {
          opcao_gradiente[i].classList.remove("--escondido");
        }
      }
    }
    for(let z = 0; z < radios.length; z++) {
      radios[z].disabled = true;
    }

    esta_opcao.classList.add("--escondido");

    for(let k = 0; k < texto.length; k++) {
      if(texto[k].classList.contains('true')) {
        texto[k].classList.add('verde');
      } else {
        texto[k].classList.add('vermelho')
      }
    }
    setTimeout(() => {
      cabecalho.scrollIntoView({behavior: "smooth"})
    }, 2000);

    if(tipo_de_texto.classList.contains('true')) {
      QUANTIDADE_DE_ACERTOS++;
    }

    JOGADAS++;

    if(JOGADAS === quizzDaSegundaTela.questions.length) {
      funcoesQuizzes.colocaResultadoDoTesteNaTela()

      let tela_de_resposta = document.querySelector(".tela-de-resposta");
      tela_de_resposta.classList.remove("--escondido")

      setTimeout(() => {
        tela_de_resposta.scrollIntoView({behavior: "smooth"})
      }, 1000);

    }
  },

  reiniciarQuizz() {
    let responde_quizz = document.querySelector(".responde-quizz");
    responde_quizz.innerHTML = "";
    let cabecalho = document.querySelector(".cabecalho");
    cabecalho.innerHTML = "";
    montaEstrutura.montaEstruturaQuizzSegundaTela();
    let tela_de_resposta = document.querySelector(".tela-de-resposta");
    tela_de_resposta.classList.add("--escondido")
    JOGADAS = 0;
    QUANTIDADE_DE_ACERTOS = 0;
  },

  voltarHome() {
    window.location.reload()
  },

  colocaResultadoDoTesteNaTela() {
    let resultado = (QUANTIDADE_DE_ACERTOS / 3) * 100;

    for(let i = 0; i < quizzDaSegundaTela.levels.length; i++) {
      if(resultado >= quizzDaSegundaTela.levels[i].minValue) {
        let texto_cabecalho_quatro = document.querySelector(".texto-do-cabecalho-quatro");
        texto_cabecalho_quatro.innerHTML = `
        <h1>${quizzDaSegundaTela.levels[i].title}</h1>
    `
        let imagem_do_resultado = document.querySelector(".imagem-do-resultado");
        imagem_do_resultado.innerHTML = `
        <img src="${quizzDaSegundaTela.levels[i].image}" alt="imagem do seu resultado">
    `

        let texto_do_resultado = document.querySelector(".texto-do-resultado");
        texto_do_resultado.innerHTML = `
        <h1>${Math.round(resultado)}% de acerto: ${quizzDaSegundaTela.levels[i].text}</h1>
    `
      }
    }
  }
}

const criaQuizz = {
  criarQuizz() {
    funcoesDeControle.toogleTela1();
    funcoesDeControle.toogleTela3Parte1();
  },

  criarQuizzPasso2() {
    funcoesDeControle.toogleTela3Parte1();
    funcoesDeControle.toogleTela3Parte2();

    for(let index = 2; index <= NUM_PERGUNTAS; index++) {
      montaEstrutura.montaEstruturaDaPergunta(index);
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

    montaEstrutura.montaEstruturaSucessoCriacao()
  }
}

const montaEstrutura = {
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

  montaEstruturaSeusQuizzes() {
    let seusQuizzesEstrutura = `
  <li class="quizzes-titulo">
    <h2>Seus Quizzes</h2>
    <ion-icon name="add-circle" onclick="criaQuizz.criarQuizz()" data-identifier="create-quizz"></ion-icon>
  </li>`;

    funcoesQuizzes.seus_quizzes.forEach((quizzData) => {
      const titulo = quizzData.title;
      const imagem = quizzData.image;

      const quizzEstrutura = `
        <li data-identifier="quizz-card" class="quizz" onclick="funcoesQuizzes.responderQuizz(this)">
          <div class="quizz-gradiente"></div>
          <img src="${imagem}" alt="Imagem de capa do seu Quizz">
          <p>${titulo}</p>
        </li>`;

      seusQuizzesEstrutura += quizzEstrutura;
    })

    return seusQuizzesEstrutura;
  },

  montaEstruturaQuizzSegundaTela() {
    let cabecalho_do_quizz = document.querySelector(".cabecalho-do-quizz")

    for(let a = 0; a < quizzDaSegundaTela.questions.length; a++) {
      quizzDaSegundaTela.questions[a].answers.sort(funcoesDeControle.comparador);
    }

    let responde_quizz = document.querySelector(".responde-quizz");
    responde_quizz.innerHTML = responde_quizz.innerHTML + `
            <div class="cabecalho-gradiente"></div>
            <h1>${quizzDaSegundaTela.title}</h1>
            <img
            src = ${quizzDaSegundaTela.image}
            alt="imagem da opcao">`

    for(let q = 0; q < quizzDaSegundaTela.questions.length; q++) {
      let cabecalho = document.querySelector(".cabecalho");
      cabecalho.innerHTML = cabecalho.innerHTML + `

              <div class="cabecalho-da-pergunta cabecalho-${q}" style = "background-color: ${quizzDaSegundaTela.questions[q].color}">
                <h1>${quizzDaSegundaTela.questions[q].title}</h1>
              </div>
              <div class="pergunta-${q} conteudo-das-opcoes"></div>
              `

      for(let g = 0; g < quizzDaSegundaTela.questions[q].answers.length; g++) {
        let pergunta = document.querySelector(`.pergunta-${q}`);
        pergunta.innerHTML = pergunta.innerHTML + `
                  <label for="resposta-${g}-pergunta-${q}">
                    <input type="radio" name="pertunta-${q}" id="resposta-${g}-pergunta-${q}" class="radio-${q} radio" onclick="funcoesQuizzes.verificaRespostaCorreta(${q},'opcao-${g}-pergunta-${q}','texto-${g}-pergunta-${q}')"> 
                    <div class="resposta-${g}-pergunta-${q} opcao">
                      <div class="imagem">
                        <div class="gradiente-e-imagem">
                          <div class="opcao-${g}-pergunta-${q} opcao-gradiente-${q} --escondido gradiente-da-opcao"></div>
                          <img
                          src="${quizzDaSegundaTela.questions[q].answers[g].image}"
                          alt="imagem da opcao">
                        </div>
                      <p class="texto-${q} texto-${g}-pergunta-${q} ${quizzDaSegundaTela.questions[q].answers[g].isCorrectAnswer} texto"><b>${quizzDaSegundaTela.questions[q].answers[g].text}</b></p>
                      </div>
                    </div>
                  </label>`
      }
    }
    setTimeout(() => {
      cabecalho_do_quizz.scrollIntoView({behavior: "smooth"});
    }, 500);
  },

  montaEstruturaDaPergunta(numero) {
    const perguntaAnterior = document.querySelector(`.pergunta-${numero - 1}`)
    const estruturaPergunta = `
        <h1>Pergunta ${numero}</h1>
        <ion-icon data-identifier="expand" onclick="funcoesDeControle.abrePergunta(${numero})" name="create-outline"></ion-icon>
        <div data-identifier="question" class="pergunta-${numero}-dentro --escondido">
          <input type="text" placeholder="Texto da pergunta" class="texto-pergunta-${numero}" id="pergunta-${numero}"
            minlength="20" required>
          <label for="pergunta-${numero}-cor" class="--sr-only">Cor de Fundo</label>
          <input type="text" placeholder="Cor de fundo da pergunta" class="cor-pergunta-${numero}" id="pergunta-${numero}-cor"
            maxlength="7" pattern:"/^[0-9a-fA-F]+$/" required>
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
      <ion-icon data-identifier="expand" onclick="funcoesDeControle.abreNivel(${numero})" name="create-outline"></ion-icon>
      <div data-identifier="level" class="nivel-${numero}-dentro --escondido">
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
      <button class="botao-criacao --sucesso" type="button" onclick="setTimeout(() => {funcoesQuizzes.responderQuizzCriado(funcoesQuizzes.created_ids[funcoesQuizzes.created_ids.length - 1])}, 1000)">Acessar Quizz</button>
      <a href="/" onclick="window.location.reload()"><p>Voltar pra home</p></a>
    `

    passoQuatro.innerHTML = estruturaSucesso
  },

}

funcoesApi.obterQuizzes()
funcoesQuizzes.listaSeusQuizzes();


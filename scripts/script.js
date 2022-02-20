const API_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let NUM_PERGUNTAS = 3
let NUM_NIVEIS = 2
let quizzDaSegundaTela
let QUANTIDADE_DE_ACERTOS = 0
let JOGADAS = 0;

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

    console.log(quizzDaSegundaTela)

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
    console.log(id_criado)
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
    let cabecalho_do_quizz = document.querySelector(".cabecalho-do-quizz")

    console.log(quizzDaSegundaTela.questions[0].answers[1].image)
    for(let a = 0; a < quizzDaSegundaTela.questions.length; a++){
      quizzDaSegundaTela.questions[a].answers.sort(comparador);
    }
    
    let responde_quizz = document.querySelector(".responde-quizz");
    responde_quizz.innerHTML = responde_quizz.innerHTML + `
            <div class="cabecalho-gradiente"></div>
            <h1>${quizzDaSegundaTela.title}</h1>
            <img
            src = ${quizzDaSegundaTela.image}
            alt="imagem da opcao">`

    for(let q = 0; q < quizzDaSegundaTela.questions.length; q++){
    let cabecalho = document.querySelector(".cabecalho");
    cabecalho.innerHTML = cabecalho.innerHTML + `

              <div class="cabecalho-da-pergunta cabecalho-${q}" style = "background-color: ${quizzDaSegundaTela.questions[q].color}">
                <h1>${quizzDaSegundaTela.questions[q].title}</h1>
              </div>
              <div class="pergunta-${q} conteudo-das-opcoes"></div>
              `

      for(let g = 0; g < quizzDaSegundaTela.questions[q].answers.length; g++){
        let pergunta = document.querySelector(`.pergunta-${q}`);
        pergunta.innerHTML = pergunta.innerHTML + `
                  <label for="resposta-${g}-pergunta-${q}">
                    <input type="radio" name="pertunta-${q}" id="resposta-${g}-pergunta-${q}" class="radio-${q} radio" onclick="funcoesQuizzes.verificaRespostaCorreta(${q},'opcao-${g}-pergunta-${q}','texto-${g}-pergunta-${q}')"> 
                    <div class="resposta-${g}-pergunta-${q} opcao">
                      <div class="imagem">
                        <div class="opcao-${g}-pergunta-${q} opcao-gradiente-${q} --escondido gradiente-da-opcao"></div>
                        <img
                        src="${quizzDaSegundaTela.questions[q].answers[g].image}"
                        alt="imagem da opcao">
                        <p class="texto-${q} texto-${g}-pergunta-${q} ${quizzDaSegundaTela.questions[q].answers[g].isCorrectAnswer} texto"><b>${quizzDaSegundaTela.questions[q].answers[g].text}</b></p>
                      </div>
                    </div>
                  </label>`
      }
    }
  
  setTimeout(() => {
    cabecalho_do_quizz.scrollIntoView({behavior:"smooth"});
  }, 500);
  },

    
  verificaRespostaCorreta(num_pergunta,tipo_de_opcao, tipo_texto) {

    let cabecalho = document.querySelector(".cabecalho-"+ (num_pergunta + 1))
    let opcao_gradiente = document.querySelectorAll(".opcao-gradiente-" + num_pergunta);
    let esta_opcao = document.querySelector("." + tipo_de_opcao);
    let radios = document.querySelectorAll(".radio-" + num_pergunta);
    let texto = document.querySelectorAll(".texto-" + num_pergunta);
    let tipo_de_texto = document.querySelector("." + tipo_texto)
    console.log(tipo_de_texto)
    for(let x = 0; x < radios.length; x++){
      if(radios[x].checked){
        for(let i = 0; i < opcao_gradiente.length; i++){
        opcao_gradiente[i].classList.remove("--escondido");
        }
      }
    }
    for(let z = 0; z < radios.length; z++){
      radios[z].disabled = true;
  }

  esta_opcao.classList.add("--escondido");

  for(let k = 0; k < texto.length; k++){
    if(texto[k].classList.contains('true')){
      texto[k].classList.add('verde');
    }else{
      texto[k].classList.add('vermelho')
    }
  }
  setTimeout(() => {
    cabecalho.scrollIntoView({behavior:"smooth"})
  }, 2000);

  if(tipo_de_texto.classList.contains('true')){
    QUANTIDADE_DE_ACERTOS++;
    console.log(QUANTIDADE_DE_ACERTOS)
  }

  JOGADAS++;

  console.log(JOGADAS)

  if(JOGADAS === quizzDaSegundaTela.questions.length){
    funcoesQuizzes.colocaResultadoDoTesteNaTela()

    let tela_de_resposta = document.querySelector(".tela-de-resposta");
    tela_de_resposta.classList.remove("--escondido")

    setTimeout(() => {
      tela_de_resposta.scrollIntoView({behavior:"smooth"})
    }, 1000);
  
  }
},

colocaResultadoDoTesteNaTela(){
  let resultado = (QUANTIDADE_DE_ACERTOS / quizzDaSegundaTela.questions.length)*100;

  let respostas_levels = [{
    titulo_levels_um: quizzDaSegundaTela.levels[0].title,
    imagem_levels_um: quizzDaSegundaTela.levels[0].image,
    texto_levels_um: quizzDaSegundaTela.levels[0].text,
    valor_levels_um: quizzDaSegundaTela.levels[0].minValue,
  },{
    titulo_levels_dois: quizzDaSegundaTela.levels[1].title,
    imagem_levels_dois: quizzDaSegundaTela.levels[1].image,
    texto_levels_dois: quizzDaSegundaTela.levels[1].text,
    valor_levels_dois: quizzDaSegundaTela.levels[1].minValue,
  }]

  if(resultado < 50){
    let texto_cabecalho_quatro = document.querySelector(".texto-do-cabecalho-quatro");
    texto_cabecalho_quatro.innerHTML =  `
        <h1>${respostas_levels[0].titulo_levels_um}</h1>
    `
    let imagem_do_resultado = document.querySelector(".imagem-do-resultado");
    imagem_do_resultado.innerHTML = `
        <img src="${respostas_levels[0].imagem_levels_um}" alt="imagem do seu resultado">
    `

    console.log(imagem_do_resultado)

    let texto_do_resultado = document.querySelector(".texto-do-resultado");
    texto_do_resultado.innerHTML = `
        <h1>${Math.round(resultado)}% de acerto: ${respostas_levels[0].texto_levels_um}</h1>
    `
  }

  if(resultado >= 50){
    let texto_cabecalho_quatro = document.querySelector(".texto-do-cabecalho-quatro");
    texto_cabecalho_quatro.innerHTML = `
        <h1>${respostas_levels[1].titulo_levels_dois}</h1>
    `
    let imagem_do_resultado = document.querySelector(".imagem-do-resultado");
    imagem_do_resultado.innerHTML = `
        <img src="${respostas_levels[1].imagem_levels_dois}" alt = "essa é a imagem do seu resultado">
    `

    let texto_do_resultado = document.querySelector(".texto-do-resultado");
    texto_do_resultado.innerHTML = `
        <h1>${Math.round(resultado)}% de acerto: ${respostas_levels[1].texto_levels_dois}</h1>
    `
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
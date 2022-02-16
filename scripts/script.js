const API_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz';

// usando como exemplo o primeiro quizz
let identificacao_do_quizz1 = this.quizzes[0].id; 
let imagem_do_quizz1 = this.quizzes[0].image;
let levels = this.quizzes[0].levels;
let titulo1 = this.quizzes[0].title;

//aqui só precisaria mudar 
let imagem_do_nivel_um = levels[0].image;
let minimo_valor_um = levels[0].minValue;
let nivel_texto_um = levels[0].text;
let nivel_titulo_um = levels[0].title

let imagem_do_nivel_dois = levels[1].image;
let minimo_valor_dois = levels[1].minValue;
let nivel_texto_dois = levels[1].text;
let nivel_titulo_dois = levels[1].title;

let perguntas = this.quizzes[0].questions; //Array com as perguntas

//tudo da primeira pergunta
let respostas_da_pergunta_um = perguntas[0].answers; 

let texto_resposta_um_p1 = respostas_da_pergunta_um[0].text;
let booleano_resposta_um_p1 = respostas_da_pergunta_um[0].isCorrectAnswer;
let imagem_resposta_um_p1 = respostas_da_pergunta_um[0].image;

let texto_resposta_dois_p1 = respostas_da_pergunta_um[1].text;
let booleano_resposta_dois_p1 = respostas_da_pergunta_um[1].isCorrectAnswer;
let imagem_resposta_dois = respostas_da_pergunta_um[1].image;

let texto_resposta_tres_p1 = respostas_da_pergunta_um[2].text;
let booleano_resposta_tres_p1 = respostas_da_pergunta_um[2].isCorrectAnswer;
let imagem_resposta_tres_P1 = respostas_da_pergunta_um[2].image;

let cor_da_pergunta_um = perguntas[0].color;
let titulo_da_pergunta_um = perguntas[0].title;

//tudo da pergunta dois
let respostas_da_pergunta_dois = perguntas[1].answers; 

let texto_resposta_um_p2 = respostas_da_pergunta_dois[0].text;
let booleano_resposta_um_p2 = respostas_da_pergunta_dois[0].isCorrectAnswer;
let imagem_resposta_um_p2 = respostas_da_pergunta_dois[0].image;

let texto_resposta_dois_p2 = respostas_da_pergunta_dois[1].text;
let booleano_resposta_dois_p2 = respostas_da_pergunta_dois[1].isCorrectAnswer;
let imagem_resposta_dois_p2 = respostas_da_pergunta_dois[1].image;

let texto_resposta_tres_p2 = respostas_da_pergunta_dois[2].text;
let booleano_resposta_tres_p2 = respostas_da_pergunta_dois[2].isCorrectAnswer;
let imagem_resposta_tres_p2 = respostas_da_pergunta_dois[2].image;

let cor_da_pergunta_dois = perguntas[1].color;
let titulo_da_pergunta_dois = perguntas[1].title;

//tudo da pergunta tres
let respostas_da_pergunta_tres = perguntas[2].answers; 

let texto_resposta_um_p3 = respostas_da_pergunta_tres[0].text;
let booleano_resposta_um_p3 = respostas_da_pergunta_tres[0].isCorrectAnswer;
let imagem_resposta_um_p3 = respostas_da_pergunta_tres[0].image;

let texto_resposta_dois_p3 = respostas_da_pergunta_tres[1].text;
let booleano_resposta_dois_p3 = respostas_da_pergunta_tres[1].isCorrectAnswer;
let imagem_resposta_dois_p3 = respostas_da_pergunta_tres[1].image;

let texto_resposta_tres_p3 = respostas_da_pergunta_tres[2].text;
let booleano_resposta_tres_p3 = respostas_da_pergunta_tres[2].isCorrectAnswer;
let imagem_resposta_tres_p3 = respostas_da_pergunta_tres[2].image;

let cor_da_pergunta_tres = perguntas[1].color;
let titulo_da_pergunta_tres = perguntas[1].title;

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

  // Esconder e mostrar a tela 2
  toogleTela2() {
    const respondeQuizz = document.querySelector(".responde-quizz")

    respondeQuizz.classList.toggle("--escondido")
  }
}

const funcoesQuizzes = {
  quizzes: [],

  responderQuizz(quizz) {
    funcoesDeControle.toogleTela1()
    funcoesDeControle.toogleTela2()
  },

  listarTodosOsQuizzes() {
    console.log('listando todos os Quizzes', this.quizzes)

    this.montaEstruturaQuizzPrimeiraTela();
    this.montaEstruturaQuizzSegundaTela();
    
  },

  montaEstruturaQuizzPrimeiraTela() {

  },

  montaEstruturaQuizzSegundaTela() {
    let responde_quizz = document.querySelector(".responde-quizz");
    responde_quizz.innerHTML = responde_quizz.innerHTML + `
          <div class="cabecalho-do-quizz">
          <div class="cabecalho-gradiente"></div>
            <h1>${titulo_do_quizz}</h1>
            <img
            src = ${imagem_do_quizz}
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

funcoesApi.obterQuizzes()


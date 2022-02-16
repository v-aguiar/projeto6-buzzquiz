const API_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz'

const funcoesApi = {
  obterQuizzes() {
    const promise = axios.get(`${API_URL}/quizzes`);

    promise.then((resposta) => {
      return resposta.data;
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

    this.montaEstruturaQuizzPrimeiraTela()
  },

  montaEstruturaQuizzPrimeiraTela() {

  }

  montaEstruturaQuizzSegundaTela() {
    
  }
}

funcoesApi.obterQuizzes()


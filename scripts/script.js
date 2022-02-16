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

// exemplo de como receber os quizzes da API
// const quizzes = funcoesApi.obterQuizzes()
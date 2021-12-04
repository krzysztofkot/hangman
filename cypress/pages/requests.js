class Request {
  constructor() {
    this.endpointEasy =
      "randomWord?hasDictionaryDef=true&minCorpusCount=100000&maxCorpusCount=-1&minDictionaryCount=6&maxDictionaryCount=-1&minLength=6&maxLength=12&api_key=jemwxxisvxvt7ln9n363blwz6vx6y3jvx9q3uzngzpybctyvo";
    this.endpointMedium =
      "randomWord?hasDictionaryDef=true&minCorpusCount=1000&maxCorpusCount=12000&minDictionaryCount=4&maxDictionaryCount=-1&minLength=5&maxLength=10&api_key=jemwxxisvxvt7ln9n363blwz6vx6y3jvx9q3uzngzpybctyvo";
    this.endpointHard =
      "randomWord?hasDictionaryDef=true&minCorpusCount=1&maxCorpusCount=20&minDictionaryCount=1&maxDictionaryCount=2&minLength=5&maxLength=10&api_key=jemwxxisvxvt7ln9n363blwz6vx6y3jvx9q3uzngzpybctyvo";
    this.descEndpoint =
      "/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=jemwxxisvxvt7ln9n363blwz6vx6y3jvx9q3uzngzpybctyvo";
  }
}

export default new Request();

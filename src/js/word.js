const API_KEY = "jemwxxisvxvt7ln9n363blwz6vx6y3jvx9q3uzngzpybctyvo";

export default class Word {
  constructor() {}

  replaceWord(element) {
    const replace = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/;
    const re = new RegExp(replace, "ig");
    return element.replace(re, "");
  }

  replaceDescription(element, removable) {
    const replace = removable;
    const re = new RegExp(replace, "ig");
    return element.replace(re, "XXX");
  }

  async fetchWord(difficult) {
    try {
      let replacedDesc;
      const queryParams = this.getQueryParams(difficult);
      if (!queryParams) throw new Error("Incorrect level set! Try again");

      const res = await fetch(
        `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&${queryParams}&api_key=${API_KEY}`
      );

      if (!res.ok)
        throw new Error(`Error occured, status code: ${res.status} `);

      const data = await res.json();

      const descRes = await fetch(
        `https://api.wordnik.com/v4/word.json/${data.word}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=${API_KEY}`
      );
      if (!descRes.ok)
        throw new Error(`Description search failed. CODE: ${descRes.status}`);
      const descData = await descRes.json();

      let desc;
      if (!descData[0].text) desc = descData[0].text;
      else if (Array.isArray(descData[0].text)) desc = descData[0].text[1];
      else desc = descData[0].text;

      return { word: data.word.toLowerCase(), description: desc };
    } catch (err) {
      throw err;
    }
  }

  getQueryParams(difficult) {
    let string;
    switch (difficult) {
      case "easy":
        string =
          "minCorpusCount=100000&maxCorpusCount=-1&minDictionaryCount=6&maxDictionaryCount=-1&minLength=6&maxLength=12";
        break;
      case "medium":
        string =
          "minCorpusCount=1000&maxCorpusCount=12000&minDictionaryCount=4&maxDictionaryCount=-1&minLength=5&maxLength=10";
        break;
      case "hard":
        string =
          "minCorpusCount=1&maxCorpusCount=20&minDictionaryCount=1&maxDictionaryCount=2&minLength=5&maxLength=10";
        break;

      default:
        string = -1;
        break;
    }
    return string;
  }
}

const API_KEY = "";

export default class Word {
  constructor() {}

  // async retrieve(level) {
  //   //simulate API call
  //   try {
  //     return {
  //       word: level,
  //       description:
  //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, sapiente nesciunt! Laudantium dicta, ex ad sed id corrupti, facilis sapiente veniam, deserunt eum expedita optio. Culpa, beatae eligendi.",
  //     };
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  replaceElements(element, removable, substitute) {
    const replace = removable;
    const re = new RegExp(replace, "ig");
    return element.replace(re, substitute);
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
      console.log(descData[0].text);

      console.log(`word: ${data.word} \n desc: ${descData[0].text}`);

      const replacedWord = this.replaceElements(
        data.word,
        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/,
        ""
      );

      if (!descData[0].text) {
        replacedDesc = "Sorry, description not provided!";
      } else {
        if (Array.isArray(descData[0].text))
          replacedDesc = this.replaceElements(
            descData[0].text[1],
            data.word,
            "XXX"
          );
        else
          replacedDesc = this.replaceElements(
            descData[0].text,
            data.word,
            "XXX"
          );
      }

      return { word: replacedWord.toLowerCase(), description: replacedDesc };
    } catch (err) {
      console.error(`${err}`);
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

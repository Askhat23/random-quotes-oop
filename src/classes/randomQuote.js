import quotes from '../data/quotes.js';
import MathUtils from '../utils/MathUtils.js';
import Quote from './Quote.js';

class RandomQuote {
  static getRandomQuote() {
    const randomIndex = MathUtils.generateRandomInt(quotes.length);
    const { id, text, author } = quotes[randomIndex];
    return new Quote(id, text, author);
  }

  /**
   * 1. Each async function always returns a Promise
   * 2. If on the "await" line of code Promise is rejected, code in the same block below "await" won't be executed
   * 3. Promise returned by the getRandomQuoteViaAPI async function will be always "fulfilled"
   * because we catch all possible errors inside the function
   * 4. Result of the "fulfilled" promise will be either a Quote object or undefined in case of error
   * 5. Therefore, there is no need for try-catch blocks where we call this function
   */
  static async getRandomQuoteViaAPI() {
    const url = 'https://quoteslate.vercel.app/api/quotes/random';
    const options = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await fetch(url, options);
      const { id, quote: text, author } = await res.json();
      // resolving the promise to a Quote object (promise fulfilled successfully)
      return new Quote(id, text, author);
    } catch (error) {
      console.error(error);
      /**
       * 1. Returning undefined implicitly in case of error (resolves the promise to undefined)
       * 2. Promise will become "fulfilled"
       */
    }
  }

  // static getRandomQuoteViaAPI() {
  //   const url = 'https://quoteslate.vercel.app/api/quotes/random';
  //   const options = { headers: { 'Content-Type': 'application/json' } };

  //   return fetch(url, options)
  //     .then((response) => response.json())
  //     .then(({ id, quote: text, author }) => new Quote(id, text, author))
  //     .catch((error) => console.error(error));
  // }
}

export default RandomQuote;

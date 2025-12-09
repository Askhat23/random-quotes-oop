import quotes from '../data/quotes.js';
import MathUtils from '../utils/MathUtils.js';
import Quote from './Quote.js';

class RandomQuote {
  static getRandomQuote() {
    const randomIndex = MathUtils.generateRandomInt(quotes.length);
    const { id, text, author } = quotes[randomIndex];
    return new Quote(id, text, author);
  }

  static async getRandomQuoteViaAPI() {
    const url = 'https://quoteslate.vercel.app/api/quotes/random';
    const options = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await fetch(url, options);
      const quotes = await res.json();
      const quote = Array.isArray(quotes) ? quotes[0] : quotes;
      const { id, quote: text, author } = quote;
      if (id && text && author) {
        return new Quote(id, text, author);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default RandomQuote;

import { Ticker } from "../models/ticker";

export class PoloniexApi {
  static async getTickers(): Promise<Ticker[]> {
    let data = [];
    try {
      const response = await fetch(
        "https://poloniex.com/public?command=returnTicker"
      );
      data = await response.json();
    } catch (err) {
      console.log(err);
      throw new Error("Poloniex API error");
    }

    const tickers = [];
    for (let key of Object.keys(data)) {
      tickers.push({
        ...data[key],
        name: key
      } as Ticker);
    }
    return tickers;
  }
}

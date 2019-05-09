import { Ticker } from "../models/ticker";

export class PoloniexApi {
  private static fetchWithTimout(url: string, timeout: number) {
    return Promise.race([
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("API timeout error")), timeout);
      }),
      fetch(url)
    ]);
  }
  static async getTickers(timout: number): Promise<Ticker[]> {
    let data = [];
    try {
      const response = await this.fetchWithTimout(
        "https://poloniex.com/public?command=returnTicker",
        timout
      );
      // @ts-ignore
      data = await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Poloniex API error");
    }

    const tickers = [];
    for (let key of Object.keys(data)) {
      tickers.push({
        ...(data as any)[key],
        name: key
      } as Ticker);
    }
    return tickers;
  }
}

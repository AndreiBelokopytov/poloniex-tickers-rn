import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from "react-navigation";
import { Observable, of, Subscription, timer } from "rxjs";
import { catchError, flatMap, map } from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";
import { Ticker } from "../../models/ticker";
import { PoloniexApi } from "../../services/poloniex-api";
import { TickersTable } from "./tickers-table";

const TIMEOUT = 5000;

interface TickersScreenProps {}
interface TickersScreenState {
  tickers: Ticker[];
  error: string | null;
}

export class TickersScreen extends React.Component<
  NavigationScreenProps & TickersScreenProps,
  TickersScreenState
> {
  static navigationOptions: NavigationScreenOptions = {
    title: "Котировки"
  };

  state = {
    tickers: [],
    error: null
  };

  subscription: Subscription | null = null;

  private $tickersStream: Observable<{
    tickers: Ticker[];
    error: string | null;
  }> = timer(0, TIMEOUT).pipe(
    flatMap(() =>
      fromPromise(PoloniexApi.getTickers(TIMEOUT)).pipe(
        map(tickers => {
          return {
            tickers,
            error: null
          };
        }),
        catchError(err => {
          return of({
            tickers: [],
            error: err.message
          });
        })
      )
    )
  );

  componentDidMount(): void {
    this.subscription = this.$tickersStream.subscribe(({ tickers, error }) => {
      if (!error) {
        this.setState({ tickers, error: null });
      } else {
        this.setState({
          error
        });
      }
    });
  }

  componentWillUnmount(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    const { error, tickers } = this.state;
    return (
      <View style={styles.root}>
        <TickersTable
          tickers={tickers}
          error={!!error}
          isLoading={tickers.length === 0}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

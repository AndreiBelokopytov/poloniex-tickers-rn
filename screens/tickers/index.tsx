import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from "react-navigation";
import { Observable, Subscription, timer } from "rxjs";
import { flatMap } from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";
import { Ticker } from "../../models/ticker";
import { PoloniexApi } from "../../services/poloniex-api";
import { TickersTable } from "./tickers-table";

interface TickersScreenProps {}
interface TickersScreenState {
  tickers: Ticker[];
  errorMessage: string | null;
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
    errorMessage: null
  };

  subscription: Subscription | null = null;

  private $tickersStream: Observable<Ticker[]> = timer(0, 5000).pipe(
    flatMap(() => fromPromise(PoloniexApi.getTickers()))
  );

  componentDidMount(): void {
    this.subscription = this.$tickersStream.subscribe(
      tickers => this.setState({ tickers, errorMessage: null }),
      err =>
        this.setState({
          errorMessage: err.message
        })
    );
  }

  componentWillUnmount(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <TickersTable tickers={this.state.tickers} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

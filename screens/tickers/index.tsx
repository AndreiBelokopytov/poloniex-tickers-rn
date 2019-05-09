import * as React from "react";
import { View, Text } from "react-native";
import {
  FlatList,
  NavigationScreenOptions,
  NavigationScreenProps
} from "react-navigation";
import {Observable, Subscription, timer} from "rxjs";
import { flatMap } from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";
import { Ticker } from "../../models/ticker";
import { PoloniexApi } from "../../services/poloniex-api";

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

  tickerKeyExtractor = (item: Ticker, _: number) => item.id.toString();

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
      <View>
        <FlatList
          data={this.state.tickers}
          keyExtractor={this.tickerKeyExtractor}
          renderItem={({ item }: { item: Ticker }) => (
            <Text key={item.id}>{item.name}</Text>
          )}
        />
      </View>
    );
  }
}

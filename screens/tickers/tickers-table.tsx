import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Ticker } from "../../models/ticker";
import { TickersTableCell } from "./tickers-table-cell";
import { TickersTableRow } from "./tickers-table-row";

interface TickersTableProps {
  tickers: Ticker[];
  error: boolean;
  isLoading?: boolean;
}

const cols = {
  name: {
    title: "Тикер",
    width: 140
  },
  last: {
    title: "last",
    width: 140
  },
  highestBid: {
    title: "highestBid",
    width: 140
  },
  percentChange: {
    title: "percentChange",
    width: 140
  }
};

export class TickersTable extends React.Component<TickersTableProps> {
  tickerKeyExtractor = (item: Ticker, _: number) => item.id.toString();

  renderHeader = () => {
    const cells = Object.keys(cols).map((key, index) => (
      <TickersTableCell
        key={index}
        width={(cols as any)[key].width}
        text={(cols as any)[key].title}
      />
    ));
    return (
      <>
        <TickersTableRow header>{cells}</TickersTableRow>
        {this.rendererror()}
      </>
    );
  };

  rendererror = () => {
    const { error } = this.props;
    return error ? (
      <View style={styles.error}>
        <Text style={styles.errorText}>Ошибка</Text>
      </View>
    ) : null;
  };

  renderItem = ({ item }: { item: Ticker }) => {
    const cells = Object.keys(cols).map((key, index) => (
      <TickersTableCell
        key={index}
        width={(cols as any)[key].width}
        text={(item as any)[key]}
      />
    ));
    return <TickersTableRow key={item.id}>{cells}</TickersTableRow>;
  };

  render() {
    const { tickers } = this.props;
    return this.props.isLoading ? (
      <View style={styles.loadingRoot}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <ScrollView horizontal style={styles.root}>
        <FlatList
          data={tickers}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={this.tickerKeyExtractor}
          renderItem={this.renderItem}
          stickyHeaderIndices={[0]}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  loadingRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    padding: 12,
    backgroundColor: "red"
  },
  errorText: {
    color: "white",
    paddingHorizontal: 12
  }
});

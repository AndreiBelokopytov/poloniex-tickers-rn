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

interface TickersTableProps {
  tickers: Ticker[];
  error: boolean;
  isLoading?: boolean;
}

const cols = {
  name: {
    title: "Тикер",
    width: 120
  },
  last: {
    title: "last",
    width: 120
  },
  highestBid: {
    title: "highestBid",
    width: 120
  },
  percentChange: {
    title: "percentChange",
    width: 120
  }
};

export class TickersTable extends React.Component<TickersTableProps> {
  tickerKeyExtractor = (item: Ticker, _: number) => item.id.toString();

  renderHeader = () => {
    const cells = Object.keys(cols).map((key, index) => (
      <Text
        style={[{ width: (cols as any)[key].width }, styles.cell]}
        key={index}
      >
        {(cols as any)[key].title}
      </Text>
    ));
    return (
      <>
        <View style={[styles.row, styles.header]}>{cells}</View>
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
      <Text
        style={[{ width: (cols as any)[key].width }, styles.cell]}
        key={index}
      >
        {(item as any)[key]}
      </Text>
    ));
    return (
      <View key={item.id} style={styles.row}>
        {cells}
      </View>
    );
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
  header: {
    backgroundColor: "white"
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#9a9a9a"
  },
  cell: {
    paddingHorizontal: 12
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

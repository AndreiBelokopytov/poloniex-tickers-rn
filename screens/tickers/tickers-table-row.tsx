import * as React from "react";
import { View, StyleSheet } from "react-native";

interface TickersTableRowProps {
  header?: boolean;
}
export const TickersTableRow: React.FC<TickersTableRowProps> = ({
  header,
  children
}) => {
  return (
    <View style={[styles.row, header ? styles.header : null]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white"
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#9a9a9a"
  }
});

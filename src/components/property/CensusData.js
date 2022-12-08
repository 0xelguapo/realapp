import { StyleSheet, View, Text } from "react-native";
import useCensus from "../../hooks/census-hook";

export default function CensusData({ zipCode }) {
  const { isLoading, censusData } = useCensus(zipCode);
  const isRendered = {};

  if (!zipCode) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Please enter a valid zip code to fetch data profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Data Profile for {zipCode}</Text>
      </View>
      <View style={styles.detailContainer}>
        {censusData.map((item, index) => {
          if (!isRendered[item.category]) {
            isRendered[item.category] = true;
            return (
              <>
                <Title>{item.category}</Title>
                <Text>{item.value}</Text>
                <Text>{item.title}</Text>
              </>
            );
          }
          return (
            <>
              <Text>{item.value}</Text>
              <Text>{item.title}</Text>
            </>
          );
        })}
      </View>
    </View>
  );
}

function Title({ children }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 18,
    color: "#454545",
  },
  titleContainer: {
    paddingVertical: 5,
  },
  titleText: {
    color: "#6c6c6c",
  },
  detailContainer: {
    paddingHorizontal: 20,
  },
});

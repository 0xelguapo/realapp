import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import useCensus from "../../hooks/census-hook";

export default function CensusData({ zipCode }) {
  const { isLoading, censusData, mainProfileData } = useCensus(zipCode);
  const isRendered = {};

  if (!zipCode) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Please enter a valid zip code to fetch data profile</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Data Profile for {zipCode}</Text>
      </View>
      <View style={styles.mainProfileContainer}>
        {mainProfileData.map(item => (
          <View key={item.variable} style={styles.profileItem}>
            <Stat item={item}/>
          </View>
        ))}
      </View>
      <View style={styles.detailsContainer}>
        {!isLoading ? (
          censusData.map((item, index) => {
            if (!isRendered[item.category]) {
              isRendered[item.category] = true;
              return (
                <View key={item.variable}>
                  <Title>{item.category}</Title>
                  <Stat item={item} />
                </View>
              );
            } else {
              return <Stat item={item} key={item.variable}/>;
            }
          })
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}
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

function Stat({ item }) {
  let itemValue = item.value;
  switch (item.measurement) {
    case "$":
      if (item.variable === "B25077_001E" && parseInt(item.value) > 2000000)
        itemValue = "$2,000,000+";
      else if (item.value == "-666666666" || item.value == null)
        itemValue = "N/A";
      else itemValue = `$${parseInt(item.value).toLocaleString()}`;
      break;
    case "%":
      itemValue = `${item.value}%`
      break;
    default:
      itemValue = parseInt(itemValue).toLocaleString()
  }
  return (
    <View style={styles.statContainer}>
      <Text style={styles.valueText}>{itemValue}</Text>
      <Text style={styles.valueDescription}>{item.title}</Text>
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
  mainProfileContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  profileItem: {
    width: '50%',
    justifyContent: 'center',
    minHeight: 60,
  },
  mainProfileRow: {
    flexDirection: "row",
  },
  titleContainer: {
    paddingVertical: 5,
  },
  titleText: {
    color: "#6c6c6c",
    fontSize: 16,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  statContainer: {
    paddingHorizontal: 5,
    marginVertical: 4,
  },
  valueText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#454545",
  },
  valueDescription: {
    fontSize: 12,
    color: "#6c6c6c",
  },
  loadingContainer: {
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});

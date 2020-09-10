import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import yelp from "../api/yelp";
import * as Linking from "expo-linking";

const ResultsShowScreen = ({ navigation }) => {
  const id = navigation.getParam("id");

  const [results, setResults] = useState(null);
  console.log(results);
  const getResult = async (id) => {
    const result = await yelp.get(`${id}`);
    setResults(result.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!results) {
    return null;
  }
  const _handlePress = () => {
    Linking.openURL(results.url);
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleStyle}>{results.name}</Text>
          <View style={styles.hairline} />
        </View>
        <FlatList
          horizontal
          data={results.photos}
          keyExtractor={(photo) => photo}
          renderItem={({ item }) => {
            return (
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item }} />
              </View>
            );
          }}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionStyle}>Rating: {results.rating}</Text>
        <Text style={styles.descriptionStyle}>
          Working hours: {results.hours[0].open[0].start.split(0, 2)}.00 -{" "}
          {results.hours[0].open[0].end.split(0, 2)}.00
        </Text>
        <Text style={styles.descriptionStyle}>Phone: {results.phone}</Text>
        <Text style={styles.descriptionStyle}>
          Address: {results.location.address1}, {results.location.city}
        </Text>
      </View>
      <View style={styles.yelpContainer}>
        <TouchableOpacity style={styles.linkContainer} onPress={_handlePress}>
          <Text style={styles.linkStyle}>Open in</Text>
          <Text style={styles.linkStyle}>Yelp</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "orange",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageContainer: {
    borderWidth: 25,
    borderColor: "orange",
  },
  descriptionStyle: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
  },
  descriptionContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  linkStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
  linkContainer: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 50,
  },
  titleStyle: {
    fontSize: 34,
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 25,
    marginTop: 40,
    color: "black",
  },
  hairline: {
    backgroundColor: "#000",
    height: 2,
    width: "auto",
  },
  yelpContainer: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    margin: 10,
    height: 200,
    width: 300,
    borderRadius: 4,
  },
});

export default ResultsShowScreen;

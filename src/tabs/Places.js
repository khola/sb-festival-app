import React, { Component } from "react";
import { View, Text, Dimensions, Alert } from "react-native";
import MapView from "react-native-maps";
import places from "../api/places";
import { Marker } from "react-native-maps";
import { MarkerIco } from "../components/icons";
import colors from "../common/colors";
import marker from "../assets/logo.png";
import Header from "../components/header";

class PlacesStack extends Component {
	static navigationOptions = {
		title: "Miejsca",
		tabBarIcon: ({ focused, tintColor }) => <MarkerIco color={focused ? colors.black : colors.white} size={20} />
	};

	askForAction(place) {
		Alert.alert(place.name, "Co chcesz zrobić?", [{ text: "Pokaz wydarzenia" }, { text: "Uruchom nawigacje" }]);
	}

	render() {
		let vw = Dimensions.get("window").width;
		let vh = Dimensions.get("window").height;
		return (
			<View>
				<Header />
				<MapView
					initialRegion={{
						latitude: 52.409538,
						longitude: 16.931992,
						latitudeDelta: 0.0422,
						longitudeDelta: 0.0221
					}}
					style={{ width: vw, height: vh }}
				>
					{places.map(place => (
						<Marker
							coordinate={{ latitude: place.lat, longitude: place.lng }}
							title={place.name}
							onCalloutPress={() => this.askForAction(place)}
						/>
					))}
				</MapView>
			</View>
		);
	}
}

export default PlacesStack;

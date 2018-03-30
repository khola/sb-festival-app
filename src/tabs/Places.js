import React, { Component } from "react";
import { View, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import ArtistsList from "../containers/ArtistsList";
import Artist from "../views/Artist";
import { MarkerIco } from "../components/icons";
import colors from "../common/colors";

class PlacesStack extends Component {
	static navigationOptions = {
		title: "Miejsca",
		tabBarIcon: ({ focused, tintColor }) => <MarkerIco color={focused ? colors.black : colors.white} size={20} />
	};

	render() {
		return <Text>placeholder</Text>;
	}
}

export default PlacesStack;

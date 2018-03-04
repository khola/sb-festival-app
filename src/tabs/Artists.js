import React, { Component } from "react";
import { View, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import ArtistsList from "../containers/ArtistsList";
import Artist from "../components/Artist";

const stackNavigatorConfig = {
	initialRouteName: "ArtistsList",
	headerMode: "none",
	navigationOptions: {
		headerVisible: false
	}
};

const Stack = StackNavigator(
	{
		ArtistsList: {
			screen: ArtistsList
		},
		Artist: {
			screen: Artist
		}
	},
	stackNavigatorConfig
);

class ArtistsStack extends Component {
	static navigationOptions = {
		title: "Wydarzenia"
	};

	render() {
		return <Stack />;
	}
}

export default ArtistsStack;

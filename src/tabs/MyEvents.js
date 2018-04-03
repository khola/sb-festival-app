import React, { Component } from "react";
import { View, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import ArtistsList from "../containers/ArtistsList";
import Artist from "../views/Artist";
import { LikeIco } from "../components/icons";
import colors from "../common/colors";
import { PlacesList, ArtistsListFiltered } from "./Places";

import DeviceInfo from "react-native-device-info";

const deviceLocale = DeviceInfo.getDeviceLocale();
const polish = deviceLocale.includes("pl");

const stackNavigatorConfig = {
	initialRouteName: "ArtistsList",
	headerMode: "none",
	navigationOptions: {
		headerVisible: false
	}
};

const MyEvents = props => {
	return <ArtistsList filter="myevents" {...props} />;
};

const Stack = StackNavigator(
	{
		ArtistsList: {
			screen: ArtistsList
		},
		Artist: {
			screen: Artist
		},
		PlacesList: {
			screen: PlacesList
		},
		ArtistsListFiltered: {
			screen: ArtistsListFiltered
		}
	},
	stackNavigatorConfig
);

class MyEventsStack extends Component {
	static navigationOptions = {
		title: polish ? "Ulubione" : "Favs",
		tabBarIcon: ({ focused, tintColor }) => <LikeIco color={colors.white} size={20} />
	};

	render() {
		return <Stack />;
	}
}

export default MyEventsStack;

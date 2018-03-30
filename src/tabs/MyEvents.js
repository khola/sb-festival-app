import React, { Component } from "react";
import { View, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import ArtistsList from "../containers/ArtistsList";
import Artist from "../views/Artist";
import { LikeIco } from "../components/icons";
import colors from "../common/colors";

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
			screen: MyEvents
		},
		Artist: {
			screen: Artist
		}
	},
	stackNavigatorConfig
);

class MyEventsStack extends Component {
	static navigationOptions = {
		title: "Mój ESB2018",
		tabBarIcon: ({ focused, tintColor }) => <LikeIco color={focused ? colors.black : colors.white} size={20} />
	};

	render() {
		return <Stack />;
	}
}

export default MyEventsStack;

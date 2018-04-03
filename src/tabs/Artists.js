import React, { Component } from "react";
import { View, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import ArtistsList from "../containers/ArtistsList";
import Artist from "../views/Artist";
import { PlacesList, ArtistsListFiltered } from "./Places";
import { MusicIco } from "../components/icons";
import colors from "../common/colors";
import { inject, observer } from "mobx-react";

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

const AllArtists = props => {
	return <ArtistsList filter="all" {...props} />;
};

const Stack = StackNavigator(
	{
		ArtistsList: {
			screen: AllArtists
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

@inject("artistsStore")
@observer
class ArtistsStack extends Component {
	static navigationOptions = {
		title: polish ? "Wydarzenia" : "Events",
		tabBarIcon: ({ focused, tintColor }) => <MusicIco color={colors.white} size={20} />
	};

	componentDidMount() {
		this.props.artistsStore.downloadArtists();
	}

	render() {
		return <Stack />;
	}
}

export default ArtistsStack;

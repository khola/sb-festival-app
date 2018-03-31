import React, { Component } from "react";
import { View, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import ArtistsList from "../containers/ArtistsList";
import Artist from "../views/Artist";
import { CalendarIco } from "../components/icons";
import colors from "../common/colors";
import { inject, observer } from "mobx-react";

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
		}
	},
	stackNavigatorConfig
);

@inject("artistsStore")
@observer
class ArtistsStack extends Component {
	static navigationOptions = {
		title: "Wydarzenia",
		tabBarIcon: ({ focused, tintColor }) => <CalendarIco color={focused ? colors.black : colors.white} />
	};

	componentDidMount() {
		this.props.artistsStore.downloadArtists();
	}

	render() {
		return <Stack />;
	}
}

export default ArtistsStack;

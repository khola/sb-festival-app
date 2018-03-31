import React, { Component } from "react";
import { View, Text, Dimensions, Alert, Platform, Linking } from "react-native";
import MapView from "react-native-maps";
import places from "../api/places";
import { Marker } from "react-native-maps";
import { MarkerIco } from "../components/icons";
import colors from "../common/colors";
import marker from "../assets/logo.png";
import Header from "../components/header";
import ArtistsList from "../containers/ArtistsList";
import Artist from "../views/Artist";
import { StackNavigator } from "react-navigation";
import { NavigationActions } from "react-navigation";

const isIOS = Platform.OS === "ios";

class PlacesList extends Component {
	goToGoogleMaps(place) {
		const latlng = `${place.lat},${place.lng}`;
		const base = isIOS ? "comgooglemaps://" : "https://maps.google.com/";
		let url = base;
		url += `?q={'Location'}`;
		url += isIOS ? "&api=1" : "";
		url += `&ll=${latlng}`;
		Linking.openURL(url);
	}

	navigate(club) {
		const navigateAction = NavigationActions.navigate({
			routeName: "ArtistsList",
			params: { clubId: club },
			action: NavigationActions.navigate({ routeName: "ArtistsList" })
		});
		this.props.navigation.dispatch(navigateAction);
	}

	askForAction(place) {
		Alert.alert(place.name, "Co chcesz zrobić?", [
			{
				text: "Pokaz wydarzenia",
				onPress: () => {
					this.navigate(place.id);
				}
			},
			{
				text: "Uruchom nawigacje Google",
				onPress: () => {
					this.goToGoogleMaps(place);
				}
			},
			{ text: "Anuluj" }
		]);
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

const ArtistsListFiltered = props => {
	const clubId = props.navigation.state.params.clubId;
	return <ArtistsList filter="all" clubId={clubId} navigation={props.navigation} />;
};

const stackNavigatorConfig = {
	initialRouteName: "PlacesList",
	headerMode: "none",
	navigationOptions: {
		headerVisible: false
	}
};
const Stack = StackNavigator(
	{
		PlacesList: {
			screen: PlacesList
		},
		ArtistsList: {
			screen: ArtistsListFiltered
		},
		Artist: {
			screen: Artist
		}
	},
	stackNavigatorConfig
);

class PlacesStack extends Component {
	static navigationOptions = {
		title: "Miejsca",
		tabBarIcon: ({ focused, tintColor }) => <MarkerIco color={focused ? colors.black : colors.white} size={20} />
	};

	render() {
		return <Stack />;
	}
}

export default PlacesStack;

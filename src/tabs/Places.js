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
import SearchBar from "../components/searchBar";

import DeviceInfo from "react-native-device-info";

const deviceLocale = DeviceInfo.getDeviceLocale();
const polish = deviceLocale.includes("pl");

const isIOS = Platform.OS === "ios";

const matchStrings = (str1, str2) => {
	let str1Lower = str1.toLowerCase().replace(/\s/g, "X");
	let str2Lower = str2.toLowerCase().replace(/\s/g, "X");
	return str1Lower.includes(str2Lower);
};

class PlacesList extends Component {
	constructor() {
		super();
		this.state = { searchPhrase: false };
		this.back = false;
	}
	goToGoogleMaps(place) {
		const latlng = `${place.lat},${place.lng}`;
		const base = isIOS ? "comgooglemaps://" : "https://maps.google.com/";
		let url = base;
		url += `?q=${place.name}, Poznan`;
		url += isIOS ? "&api=1" : "";
		url += `&ll=${latlng}`;
		Linking.openURL(url);
	}

	navigate(club) {
		const navigateAction = NavigationActions.navigate({
			routeName: "ArtistsListFiltered",
			params: { clubId: club },
			action: NavigationActions.navigate({ routeName: "ArtistsListFiltered" })
		});
		this.props.navigation.dispatch(navigateAction);
	}
	componentWillMount() {
		if (this.props.navigation.state.params && this.props.navigation.state.params.searchPhrase) {
			const searchPhrase = this.props.navigation.state.params.searchPhrase;
			this.setState({ searchPhrase });
			this.back = true;
		}
	}
	askForAction(place) {
		Alert.alert(place.name, global.polish ? "Co chesz zrobić?" : "What do you want to do?", [
			{
				text: global.polish ? "Wydarzenia" : "Show Events",
				onPress: () => {
					this.navigate(place.id);
				}
			},
			{
				text: global.polish ? "Nawigacja Google Maps" : "Navigate using Google Maps",
				onPress: () => {
					this.goToGoogleMaps(place);
				}
			},
			{ text: global.polish ? "Anuluj" : "Cancel" }
		]);
	}

	setSearchPhase(searchPhrase) {
		this.setState({ searchPhrase });
	}

	goBack() {
		this.props.navigation.goBack();
	}

	render() {
		let vw = Dimensions.get("window").width;
		let vh = Dimensions.get("window").height;
		let screenProps = this.props.navigation;
		const headerParams = this.back
			? {
					backAction: () => {
						this.goBack();
					}
			  }
			: {};
		return (
			<View>
				<Header {...headerParams}>
					{!this.back && (
						<SearchBar
							value={this.state.searchPhrase ? this.state.searchPhrase : ""}
							valueChange={this.setSearchPhase.bind(this)}
						/>
					)}
				</Header>
				<MapView
					initialRegion={{
						latitude: 52.409538,
						longitude: 16.931992,
						latitudeDelta: 0.0422,
						longitudeDelta: 0.0221
					}}
					style={{ width: vw, height: vh }}
				>
					{places
						.filter(place => {
							if (this.state.searchPhrase.length > 2) {
								const placeName = place.name;
								const searchPhrase = this.state.searchPhrase;
								return matchStrings(placeName, searchPhrase);
							}
							return true;
						})
						.map(place => (
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
		ArtistsListFiltered: {
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
		title: polish ? "Miejsca" : "Places",
		tabBarIcon: ({ focused, tintColor }) => <MarkerIco color={colors.white} size={20} />
	};

	render() {
		return <Stack />;
	}
}

export { PlacesStack, PlacesList, ArtistsListFiltered };

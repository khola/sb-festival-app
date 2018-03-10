import React, { Component } from "react";
import { Platform, StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import { inject, observer } from "mobx-react";
import ArtistSingleElement from "../components/artistItem";
import { NavigationActions } from "react-navigation";
import Header from "../components/header";
import { CalendarIco, AZIco } from "../components/icons";

@inject("artistsStore")
@observer
export default class ArtistsList extends Component {
	constructor() {
		super();
		this.state = { sort: "timestamp" };
	}
	componentDidMount() {
		this.props.artistsStore.downloadArtists();
	}
	navigate(artist) {
		const navigateAction = NavigationActions.navigate({
			routeName: "Artist",
			params: { artist },
			action: NavigationActions.navigate({ routeName: "Artist" })
		});
		this.props.navigation.dispatch(navigateAction);
	}

	setSortingState(sort) {
		this.setState({ sort });
	}

	sortArtists(parameter) {
		return (a, b) => {
			{
				if (typeof a[parameter] === "string") {
					return a[parameter].localeCompare(b[parameter]);
				} else {
					return a[parameter] - b[parameter];
				}
			}
		};
	}

	unescapeUrl(url) {
		return url.replace("/", "/");
	}

	render() {
		return (
			<View>
				<Header>
					<TouchableOpacity
						onPress={() => {
							this.setSortingState("timestamp");
						}}
					>
						<CalendarIco style={{ opacity: this.state.sort === "timestamp" ? 1 : 0.5, marginLeft: 10 }} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.setSortingState("title");
						}}
					>
						<AZIco style={{ opacity: this.state.sort === "title" ? 1 : 0.5, marginLeft: 10 }} />
					</TouchableOpacity>
				</Header>
				<ScrollView>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							flexWrap: "wrap"
						}}
					>
						{this.props.artistsStore.artists.sort(this.sortArtists(this.state.sort)).map(artist => (
							<ArtistSingleElement
								key={artist.id}
								artistName={artist.title}
								artistDate={artist.date}
								artistImage={this.unescapeUrl(artist.image)}
								action={() => {
									this.navigate(artist);
								}}
							/>
						))}
					</View>
				</ScrollView>
			</View>
		);
	}
}

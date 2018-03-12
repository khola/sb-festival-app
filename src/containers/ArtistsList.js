import React, { Component } from "react";
import { Platform, StyleSheet, View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from "react-native";
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
			params: {
				artist,
				favToggle: () => {
					this.props.artistsStore.toggleFav(artist.id);
				}
			},
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
				{!this.props.artistsStore.isFetching && (
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
									artistName={artist.title + artist.favourite}
									artistDate={artist.date}
									artistImage={this.unescapeUrl(artist.image)}
									action={() => {
										this.navigate(artist);
									}}
								/>
							))}
						</View>
					</ScrollView>
				)}
				{this.props.artistsStore.isFetching && <ActivityIndicator size="large" color="#444444" />}
			</View>
		);
	}
}

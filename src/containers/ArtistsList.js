import React, { Component } from "react";
import { Platform, StyleSheet, View, ScrollView } from "react-native";
import { inject, observer } from "mobx-react";
import ArtistSingleElement from "../components/artistItem";
import { NavigationActions } from "react-navigation";

@inject("artistsStore")
@observer
export default class ArtistsList extends Component {
	constructor() {
		super();
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
	render() {
		return (
			<View style={{ paddingTop: 20 }}>
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
						{this.props.artistsStore.artists.map(artist => (
							<ArtistSingleElement
								key={artist.id}
								artistName={artist.title}
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

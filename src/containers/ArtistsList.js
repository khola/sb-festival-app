import React, { Component } from "react";
import { Platform, StyleSheet, View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { inject, observer } from "mobx-react";
import ArtistSingleElement from "../components/artistItem";
import { NavigationActions } from "react-navigation";
import Header from "../components/header";
import { CalendarIco, AZIco } from "../components/icons";

import styled from "styled-components/native";
import colors from "../common/colors";

const Day = styled.Text`
	background-color: ${colors.darkGreen};
	color: ${colors.white};
	padding: 10px;
	font-size: 14px;
	text-align: center;
`;

@inject("artistsStore")
@observer
export default class ArtistsList extends Component {
	constructor() {
		super();
		this.state = { sort: "title" };
	}

	navigate(artist) {
		const navigateAction = NavigationActions.navigate({
			routeName: "Artist",
			params: {
				artist,
				favToggle: () => this.props.artistsStore.toggleFav(artist.id)
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

	componentWillMount() {
		console.log(this.props);
		if (this.props.filter !== "all" || this.props.clubId) {
			this.setState({ sort: "timestamp" });
		}
	}

	getData(sort = "title", day = false, clubId = false, my = false) {
		let sortedArr = this.props.artistsStore.artists.sort(this.sortArtists(sort));
		if (my) {
			sortedArr = sortedArr.filter(artist => artist.favourite);
		}
		if (clubId) {
			sortedArr = sortedArr.filter(artist => artist.clubId == clubId);
		}
		if (day) {
			sortedArr = sortedArr.filter(artist => artist.puredate == day);
		}
		return sortedArr;
	}

	render() {
		const headerOptions = !this.props.clubId && this.props.filter !== "myevents";
		return (
			<View>
				<Header
					backAction={
						this.props.clubId
							? () => {
									this.props.navigation.goBack();
							  }
							: false
					}
				>
					{headerOptions && (
						<TouchableOpacity
							onPress={() => {
								this.setSortingState("timestamp");
							}}
						>
							<CalendarIco
								style={{ opacity: this.state.sort === "timestamp" ? 1 : 0.5, marginLeft: 10 }}
							/>
						</TouchableOpacity>
					)}
					{headerOptions && (
						<TouchableOpacity
							onPress={() => {
								this.setSortingState("title");
							}}
						>
							<AZIco style={{ opacity: this.state.sort === "title" ? 1 : 0.5, marginLeft: 10 }} />
						</TouchableOpacity>
					)}
				</Header>
				{!this.props.artistsStore.isFetching && (
					<ScrollView>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								justifyContent: "flex-start",
								alignItems: "center",
								flexWrap: "wrap",
								paddingBottom: 100
							}}
						>
							{this.state.sort === "title" &&
								this.getData("title", false, this.props.clubId, this.props.filter !== "all").map(
									(artist, index) => (
										<ArtistSingleElement
											key={artist.id}
											view={this.state.sort === "title" ? "square" : "row"}
											artistName={artist.title}
											artistDate={artist.date}
											artistImage={this.unescapeUrl(artist.image)}
											action={() => {
												this.navigate(artist);
											}}
											sort={this.state.sort}
											isEven={index % 2}
										/>
									)
								)}
							{this.state.sort === "timestamp" && (
								<View>
									<View style={{ backgroundColor: "red" }}>
										<Day>Czwartek</Day>
									</View>
									{this.getData(
										"title",
										"20.04.2018",
										this.props.clubId,
										this.props.filter !== "all"
									).map((artist, index) => (
										<ArtistSingleElement
											key={artist.id}
											view={this.state.sort === "title" ? "square" : "row"}
											artistName={artist.title}
											artistDate={artist.date}
											artistImage={this.unescapeUrl(artist.image)}
											action={() => {
												this.navigate(artist);
											}}
											sort={this.state.sort}
											isEven={index % 2}
										/>
									))}
									<Day>Piątek</Day>
									{this.getData(
										"title",
										"21.04.2018",
										this.props.clubId,
										this.props.filter === "all"
									).map((artist, index) => (
										<ArtistSingleElement
											key={artist.id}
											view={this.state.sort === "title" ? "square" : "row"}
											artistName={artist.title}
											artistDate={artist.date}
											artistImage={this.unescapeUrl(artist.image)}
											action={() => {
												this.navigate(artist);
											}}
											sort={this.state.sort}
											isEven={index % 2}
										/>
									))}
									<Day>Sobota</Day>
									{this.getData(
										"title",
										"22.04.2018",
										this.props.clubId,
										this.props.filter === "all"
									).map((artist, index) => (
										<ArtistSingleElement
											key={artist.id}
											view={this.state.sort === "title" ? "square" : "row"}
											artistName={artist.title}
											artistDate={artist.date}
											artistImage={this.unescapeUrl(artist.image)}
											action={() => {
												this.navigate(artist);
											}}
											sort={this.state.sort}
											isEven={index % 2}
										/>
									))}
								</View>
							)}
						</View>
					</ScrollView>
				)}
				{this.props.artistsStore.isFetching && <ActivityIndicator size="large" color="#444444" />}
			</View>
		);
	}
}

import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	Text,
	ActivityIndicator,
	FlatList,
	Dimensions
} from "react-native";
import { inject, observer } from "mobx-react";
import ArtistSingleElement from "../components/artistItem";
import { NavigationActions } from "react-navigation";
import Header from "../components/header";
import { CalendarIco, AZIco } from "../components/icons";

import styled from "styled-components/native";
import colors from "../common/colors";
import SearchBar from "../components/searchBar";
import { fetchImage } from "../api/apiCalls";

const vw = Dimensions.get("window").width;
const vh = Dimensions.get("window").height;

const Day = styled.Text`
	background-color: ${colors.darkGreen};
	color: ${colors.white};
	padding: 10px;
	font-size: 14px;
	text-align: center;
`;
const DayButtons = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	background: ${colors.darkGreen};
`;

const DayButton = styled.TouchableOpacity`
	background-color: ${colors.darkGreen};
	width: 33.33%;
	padding: 10px;
`;
const DayButtonLabel = styled.Text`
	font-size: 14px;
	text-align: center;
	color: ${colors.white};
`;

@inject("artistsStore")
@observer
export default class ArtistsList extends Component {
	constructor() {
		super();
		this.state = { sort: "title", day: 1, searchPhrase: false };
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
		const day = this.state.day;
		this.setState({ sort, day, searchPhrase: false });
	}

	setSearchState(searchPhrase) {
		const newState = { ...this.state, searchPhrase };
		this.setState(newState);
	}

	setDayState(day) {
		const newState = { ...this.state, day };
		this.setState(newState);
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

	componentWillMount() {
		if (this.props.filter !== "all" || this.props.clubId) {
			this.setSortingState("timestamp");
		}
	}

	setSearchPhase(phrase) {
		this.setSearchState(phrase);
	}

	getData(sort = "title", day = false, clubId = false, my = false, searchPhrase = false) {
		let sortedArr = this.props.artistsStore.artists.sort(this.sortArtists(sort));
		if (my) {
			sortedArr = sortedArr.filter(artist => artist.favourite);
		}
		if (clubId) {
			sortedArr = sortedArr.filter(artist => artist.clubId == clubId);
		}
		if (day) {
			let dayString = "";
			switch (day) {
				case 1:
					dayString = "19.04.2018";
					break;
				case 2:
					dayString = "20.04.2018";
					break;
				case 3:
					dayString = "21.04.2018";
					break;
			}
			sortedArr = sortedArr.filter(artist => artist.puredate == dayString);
		}
		if (searchPhrase && searchPhrase.length > 2) {
			sortedArr = sortedArr.filter(artist => artist.title.includes(searchPhrase.toUpperCase()));
		}
		return sortedArr;
	}

	render() {
		const headerOptions = !this.props.clubId && this.props.filter !== "myevents";
		const viewStyle = Platform.OS === "android" ? { height: vh - 80 } : { height: vh - 60 };
		return (
			<View {...viewStyle}>
				<Header
					backAction={
						this.props.clubId
							? () => {
									this.props.navigation.goBack();
							  }
							: false
					}
					height={this.props.filter === "myevents" ? 20 : false}
					hideGradient={this.state.sort === "timestamp"}
				>
					{headerOptions && (
						<SearchBar
							value={this.state.searchPhrase ? this.state.searchPhrase : ""}
							valueChange={this.setSearchPhase.bind(this)}
						/>
					)}
					{headerOptions &&
						this.state.sort !== "timestamp" && (
							<TouchableOpacity
								onPress={() => {
									this.setSortingState("timestamp");
								}}
							>
								<CalendarIco style={{ opacity: 1, marginLeft: 10 }} />
							</TouchableOpacity>
						)}
					{headerOptions &&
						this.state.sort !== "title" && (
							<TouchableOpacity
								onPress={() => {
									this.setSortingState("title");
								}}
							>
								<AZIco style={{ opacity: 1, marginLeft: 10 }} />
							</TouchableOpacity>
						)}
				</Header>
				{!this.props.artistsStore.isFetching &&
					this.state.sort === "timestamp" && (
						<View>
							<DayButtons>
								<DayButton
									style={this.state.day === 1 ? { backgroundColor: colors.green } : {}}
									onPress={() => {
										this.setDayState(1);
									}}
								>
									<DayButtonLabel>{global.polish ? "Czwartek" : "Thursday"}</DayButtonLabel>
								</DayButton>
								<DayButton
									style={this.state.day === 2 ? { backgroundColor: colors.green } : {}}
									onPress={() => {
										this.setDayState(2);
									}}
								>
									<DayButtonLabel>{global.polish ? "Piątek" : "Friday"}</DayButtonLabel>
								</DayButton>
								<DayButton
									style={this.state.day === 3 ? { backgroundColor: colors.green } : {}}
									onPress={() => {
										this.setDayState(3);
									}}
								>
									<DayButtonLabel>{global.polish ? "Sobota" : "Satruday"}</DayButtonLabel>
								</DayButton>
							</DayButtons>
							<FlatList
								contentContainerStyle={{ paddingBottom: 100 }}
								data={this.getData(
									"timestamp",
									this.state.day,
									this.props.clubId,
									this.props.filter !== "all",
									this.state.searchPhrase
								)}
								keyExtractor={item => item.id}
								renderItem={({ item }) => (
									<ArtistSingleElement
										view={"row"}
										action={() => {
											this.navigate(item);
										}}
										artist={item}
									/>
								)}
							/>
						</View>
					)}

				{!this.props.artistsStore.isFetching &&
					this.state.sort === "title" && (
						<FlatList
							numColumns={2}
							data={this.getData(
								"title",
								false,
								this.props.clubId,
								this.props.filter !== "all",
								this.state.searchPhrase
							)}
							keyExtractor={item => item.id}
							renderItem={({ item }) => (
								<ArtistSingleElement
									view={"square"}
									action={() => {
										this.navigate(item);
									}}
									artist={item}
								/>
							)}
						/>
					)}
				{this.props.artistsStore.isFetching && <ActivityIndicator size="large" color="#444444" />}
			</View>
		);
	}
}

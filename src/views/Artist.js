import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, ScrollView, Linking, Dimensions, View } from "react-native";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/header";
import colors from "../common/colors";
import { VideoIco, WwwIco, MusicIco, LikeIco } from "../components/icons";

var PushNotification = require("react-native-push-notification");

const vw = Dimensions.get("window").width;
const Name = styled.Text`
	font-size: 20;
	text-align: right;
	color: ${colors.white};
	font-weight: 600;
	background-color: ${colors.darkGreen};
	padding: 10px;
`;

const Desc = styled.Text`
	font-size: 16;
`;

const Icon = styled.TouchableOpacity`
	font-size: 14;
	width: 35;
	height: 35;
	background-color: ${colors.darkGreen};
	border-radius: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 10;
`;

const IconLeft = styled.TouchableOpacity`
	font-size: 14;
	width: 35;
	height: 35;
	background-color: ${colors.green};
	border-radius: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	align-self: flex-start;
`;

const EventDate = styled.Text`
	font-size: 16;
	text-align: center;
	color: ${colors.white};
	font-weight: 600;
	background-color: ${colors.green};
	padding: 10px;
`;

const ArtistImage = styled.Image`
	width: ${vw};
	height: ${vw};
	position: absolute;
	background-color: ${colors.darkGreen};
`;

const ArtistHeader = styled.View`
	width: ${vw};
	height: ${vw};
`;

const ArtistHeaderInner = styled.View`
	width: ${vw};
	height: ${vw};
	padding: 20px;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
`;

const HeaderNav = styled.View`
	width: ${vw};
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	flex-direction: row;
	margin-top: 20;
`;

export default class Artist extends Component {
	constructor() {
		super();
		PushNotification.configure({
			// (optional) Called when Token is generated (iOS and Android)
			onRegister: function(token) {
				console.log("TOKEN:", token);
			},

			requestPermissions: true
		});
	}
	openBrowser(url) {
		Linking.openURL(url);
	}
	unescapeUrl(url) {
		return url.replace("/", "/");
	}
	favouriteArtist(artist) {
		PushNotification.localNotificationSchedule({
			message: `${artist.title} - początek za 15 minut`, // (required)
			date: new Date(Date.now() + 60 * 1000) // in 60 secs
		});
		this.props.navigation.state.params.favToggle();
	}

	render() {
		const artist = this.props.navigation.state.params.artist;
		const descHeight = Dimensions.get("window").height - Dimensions.get("window").width - 60;
		const vw = Dimensions.get("window");
		return (
			<View>
				<ArtistHeader>
					<LinearGradient
						colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
						style={{
							width: "100%",
							height: 100,
							position: "absolute",
							zIndex: 10,
							left: 0,
							top: 0
						}}
					/>

					<ArtistImage source={{ uri: artist.image }} />
					<ArtistHeaderInner>
						<Name>
							{artist.title} {artist.favourite ? "ulubiony" : "nie"}
						</Name>
						<EventDate>{artist.date}</EventDate>
						<HeaderNav>
							<IconLeft onPress={() => this.favouriteArtist(artist.id)}>
								<LikeIco size={18} />
							</IconLeft>
							{artist.www.length && (
								<Icon onPress={() => this.openBrowser(artist.www)}>
									<WwwIco size={15} />
								</Icon>
							)}
							{artist.video.length && (
								<Icon onPress={() => this.openBrowser(artist.video)}>
									<VideoIco size={15} />
								</Icon>
							)}
							{artist.music.length && (
								<Icon onPress={() => this.openBrowser(artist.music)}>
									<MusicIco size={15} />
								</Icon>
							)}
						</HeaderNav>
					</ArtistHeaderInner>
				</ArtistHeader>
				<ScrollView style={{ backgroundColor: "#ffffff", height: descHeight }}>
					<Desc style={{ padding: 20 }}>{artist.desc}</Desc>
				</ScrollView>
			</View>
		);
	}
}

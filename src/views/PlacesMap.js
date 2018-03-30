import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, ScrollView, Linking, Dimensions, View } from "react-native";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/header";
import colors from "../common/colors";
import { VideoIco, WwwIco, MusicIco, LikeIco, BackIco, UnlikeIco } from "../components/icons";
import { fetchImage } from "../api/getBase";

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

const ButtonBack = styled.TouchableOpacity`
	font-size: 14;
	width: 35px;
	height: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 10;
	position: absolute;
	left: 0px;
	top: 30px;

	z-index: 1000;
`;

export default class Artist extends Component {
	constructor() {
		super();
		PushNotification.configure({
			onRegister: function(token) {},

			requestPermissions: true
		});
		this.state = { image: "", isfav: false };
	}
	openBrowser(url) {
		Linking.openURL(url);
	}
	unescapeUrl(url) {
		return url.replace("/", "/");
	}
	favouriteArtist(artist) {
		if (!this.state.favourite) {
			const dateNotification = new Date();
			dateNotification.setTime((artist.timestamp + 45 * 60) * 1000);
			PushNotification.localNotificationSchedule({
				id: artist.id,
				message: `${artist.title} - początek za 15 minut`,
				date: dateNotification
			});
			this.props.navigation.state.params.favToggle();
			this.setState({ image: this.state.image, favourite: true });
		} else {
			PushNotification.cancelLocalNotifications({ id: artist.id });
			this.props.navigation.state.params.favToggle();
			this.setState({ image: this.state.image, favourite: false });
		}
	}

	componentDidMount() {
		fetchImage(this.props.navigation.state.params.artist.image)
			.then(base64 => {
				this.setState({ image: base64, favourite: this.props.navigation.state.params.artist.favourite });
			})
			.catch(() => {});
	}

	goBack() {
		this.props.navigation.goBack();
	}

	render() {
		const vw = Dimensions.get("window").width;
		return <View />;
	}
}

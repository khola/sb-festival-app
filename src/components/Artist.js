import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";
import styled from "styled-components/native";

const Name = styled.Text`
	font-size: 20;
`;

const Desc = styled.Text`
	font-size: 16;
`;

const Icon = styled.Text`
	font-size: 14;
`;

const EventDate = styled.Text`
	font-size: 12;
`;

export default class Artist extends Component {
	constructor() {
		super();
	}
	openBrowser(url) {
		Linking.openURL(url);
	}
	render() {
		const artist = this.props.navigation.state.params.artist;
		return (
			<ScrollView>
				<Name>{artist.title}</Name>
				<EventDate>{artist.date}</EventDate>
				{artist.www.length && (
					<TouchableOpacity onPress={() => this.openBrowser(artist.www)}>
						<Icon>WWW</Icon>
					</TouchableOpacity>
				)}
				{artist.video.length && (
					<TouchableOpacity onPress={() => this.openBrowser(artist.video)}>
						<Icon>Video</Icon>
					</TouchableOpacity>
				)}
				{artist.music.length && (
					<TouchableOpacity onPress={() => this.openBrowser(artist.music)}>
						<Icon>Muzyka</Icon>
					</TouchableOpacity>
				)}
				<Desc>{artist.desc}</Desc>
			</ScrollView>
		);
	}
}

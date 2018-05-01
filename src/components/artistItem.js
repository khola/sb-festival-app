import React, { Component } from "react";
import { Dimensions, Image, View } from "react-native";
import styled from "styled-components/native";
import colors from "../common/colors";
import { fetchImage } from "../api/getBase";

const vw = Dimensions.get("window").width;

const Container = styled.TouchableOpacity`
	width: ${0.5 * vw};
	height: ${0.5 * vw};
	background: ${colors.black};
	padding: 10px;
	justify-content: flex-end;
	align-items: flex-end;
`;
const Name = styled.Text`
	font-size: 20;
	text-align: right;
	color: ${colors.white};
	font-weight: 600;
	background-color: ${colors.darkGreen};
`;
const DateLabel = styled.Text`
	font-size: 20;
	text-align: center;
	color: ${colors.white};
	font-weight: 600;
`;
const ArtistImage = styled.Image`
	position: absolute;
	width: ${0.5 * vw};
	height: ${0.5 * vw};
`;
const Gradient = styled.View``;

const ContainerSimple = styled.TouchableOpacity`
	width: ${vw};
	height: 80px;
	padding: 20px;
	margin-bottom: 1px;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;
	background: #fff;
`;
const ArtistImageSmall = styled.Image`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	margin-right: 20px;
`;
const NameSmall = styled.Text`
	font-size: 16;
	text-align: left;
	color: ${colors.darkGreen};
	font-weight: 600;
	width: ${vw - 100};
`;

const ProgressBar = styled.View`
	background: ${colors.black};
	opacity: 0.2;
	z-index: 0;
	position: absolute;
	height: 80px;
	width: 100%;
`;

export default class ArtistSingleElement extends Component {
	constructor() {
		super();
		this.state = { image: "", timeStatus: 0 };
	}
	calculateShowTimeStatus() {
		const now = Date.now();

		const eventStart = this.props.artist.timestamp * 1000;
		const eventLength = this.props.artist.showlength * 1000;
		const eventEnd = eventStart + eventLength;

		let timeStatus = 0;
		if (now > eventEnd) {
			timeStatus = 1;
		} else if (now > eventStart) {
			timeStatus = (now - eventStart) / eventLength;
		}

		this.setState({ ...this.state, timeStatus });
	}
	componentDidMount() {
		fetchImage(this.props.artist.image)
			.then(base64 => {
				this.setState({ ...this.state, image: base64 });
			})
			.catch(() => {});

		this.calculateShowTimeStatus();
	}
	render() {
		const { props, view, action } =  this.props;
		
		return (
			<View>
				{view === "square" && (
					<Container onPress={action}>
						<ArtistImage source={{ uri: this.state.image }} />
						<Name>{props.title}</Name>
					</Container>
				)}

				{view === "row" && (
					<ContainerSimple onPress={action}>
						<ProgressBar style={{ width: this.state.timeStatus * vw }} />
						<ArtistImageSmall source={{ uri: this.state.image }} />
						<NameSmall numberOfLines={1}>
							{props.title}, {props.hour}
						</NameSmall>
					</ContainerSimple>
				)}
			</View>
		);
	}
}

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
	text-align: right;
	color: ${colors.darkGreen};
	font-weight: 600;
`;

export default class ArtistSingleElement extends Component {
	constructor() {
		super();
		this.state = { image: "" };
	}
	componentDidMount() {
		fetchImage(this.props.artistImage)
			.then(base64 => {
				this.setState({ image: base64 });
			})
			.catch(() => {});
	}
	render() {
		const props = this.props;

		return (
			<View>
				{props.view === "square" && (
					<Container onPress={props.action}>
						<ArtistImage source={{ uri: this.state.image }} />
						<Name>{props.artistName}</Name>
					</Container>
				)}

				{props.view === "row" && (
					<ContainerSimple
						onPress={props.action}
						style={{ backgroundColor: props.isEven ? "#efefef" : "white" }}
					>
						<ArtistImageSmall source={{ uri: this.state.image }} />
						<NameSmall>
							{props.artistName}, {props.artistDate}
						</NameSmall>
					</ContainerSimple>
				)}
			</View>
		);
	}
}

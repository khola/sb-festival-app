import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import colors from "../common/colors";

const vw = Dimensions.get("window").width;

const Container = styled.TouchableOpacity`
	width: ${0.5 * vw};
	height: ${0.5 * vw};
	background: ${colors.black};
	padding: 10px;
	justify-content: flex-end;
	align-items: center;
`;
const Name = styled.Text`
	font-size: 20;
	text-align: center;
	color: ${colors.white};
	font-weight: 600;
`;

const Gradient = styled.View``;

export default function ArtistSingleElement(props) {
	return (
		<Container onPress={props.action}>
			<Name>{props.artistName}</Name>
		</Container>
	);
}

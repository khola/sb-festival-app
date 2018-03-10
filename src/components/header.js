import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import colors from "../common/colors";

const vw = Dimensions.get("window").width;

const Container = styled.TouchableOpacity`
	width: ${vw};
	height: 70px;
	background: ${colors.darkGreen};
	padding-top: 20px;
	padding-left: 10px;
	padding-right: 10px;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	flex-direction: column;
`;

const Nav = styled.View`
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

export default function Header(props) {
	return (
		<Container>
			<Nav>{props.children}</Nav>
		</Container>
	);
}

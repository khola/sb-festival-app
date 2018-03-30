import React from "react";
import { Dimensions, Image } from "react-native";
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
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
`;

const Nav = styled.View`
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

const Logo = styled.Image`
	width: 30;
	height: 30;
`;

export default function Header(props) {
	return (
		<Container>
			<Logo source={require("../assets/logo.png")} style={{ width: 30, height: 30 }} />
			<Nav>{props.children}</Nav>
		</Container>
	);
}

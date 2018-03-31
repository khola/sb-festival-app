import React from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../common/colors";
import { BackIco } from "./icons";

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

const Header = props => {
	return (
		<Container>
			{props.backAction && (
				<TouchableOpacity onPress={props.backAction}>
					<BackIco size={18} />
				</TouchableOpacity>
			)}
			{!props.backAction && <Logo source={require("../assets/logo.png")} style={{ width: 30, height: 30 }} />}
			<Nav>{props.children}</Nav>
		</Container>
	);
};

export default Header;

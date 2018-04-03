import React from "react";
import { Dimensions, Image, TouchableOpacity, View, Platform } from "react-native";
import styled from "styled-components/native";
import colors from "../common/colors";
import { BackIco } from "./icons";

const vw = Dimensions.get("window").width;

const Container = styled.View`
	width: ${vw};
	height: ${Platform.OS === "ios" ? "70px" : "50px"};
	background: ${colors.darkGreen};
	padding-top: ${Platform.OS === "ios" ? "20px" : "0px"};
	padding-left: 10px;
	padding-right: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	z-index: 10;
`;

const Nav = styled.View`
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	flex-grow: 2;
`;

const Logo = styled.Image`
	width: 30;
	height: 30;
`;

const Header = props => {
	const style = props.height ? { height: props.height } : {};
	return (
		<Container style={style}>
			{props.backAction && (
				<TouchableOpacity onPress={props.backAction}>
					<BackIco size={18} />
				</TouchableOpacity>
			)}
			{!props.backAction && <View />}
			<Nav>{props.children}</Nav>
		</Container>
	);
};

export default Header;

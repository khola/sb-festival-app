import React from "react";
import { Dimensions, Image, TouchableOpacity, View, TextInput, Platform } from "react-native";
import styled from "styled-components/native";
import colors from "../common/colors";
import { BackIco } from "./icons";

const vw = Dimensions.get("window").width;

const Input = styled.View`
	height: 30px;

	width: ${0.8 * vw}px;
	background: #fff;
	border-radius: 6px;
	padding-left: 10px;
`;

const SearchBar = props => {
	const style = props.height ? { height: props.height } : {};
	return (
		<Input>
			<TextInput
				underlineColorAndroid="transparent"
				placeholder={global.polish ? "Szukaj" : "Search"}
				style={{ height: Platform.OS === "ios" ? 30 : 35 }}
				value={props.value}
				onChangeText={text => props.valueChange(text)}
			/>
		</Input>
	);
};

export default SearchBar;

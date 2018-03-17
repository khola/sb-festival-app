import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
import { TabNavigator } from "react-navigation";
import { Provider } from "mobx-react";
import colors from "./common/colors";
import stores from "./stores";
import ArtistsStack from "./tabs/Artists";
import MyEventsStack from "./tabs/MyEvents";

const EmptyScreen = () => {
	return (
		<View>
			<Text>test</Text>
		</View>
	);
};

const Tabs = TabNavigator(
	{
		Events: { screen: ArtistsStack },
		Places: { screen: EmptyScreen },
		MyEvents: { screen: MyEventsStack },
		About: { screen: EmptyScreen }
	},
	{
		tabBarPosition: "bottom",
		tabBarOptions: {
			activeTintColor: colors.black,
			activeBackgroundColor: colors.green,
			inactiveTintColor: colors.white,
			inactiveBackgroundColor: colors.darkGreen,
			style: { backgroundColor: colors.darkGreen, height: 60, padding: 0, margin: 0, border: "none" },
			tabStyle: { margin: 0, padding: 5, height: 60 }
		}
	}
);

function App() {
	StatusBar.setBarStyle("light-content", true);
	return (
		<Provider {...stores}>
			<Tabs />
		</Provider>
	);
}

export default App;

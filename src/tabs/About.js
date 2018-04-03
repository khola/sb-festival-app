import React, { Component } from "react";
import { Platform, Text, View, ScrollView, Image, Dimensions } from "react-native";
import { AboutIco } from "../components/icons";
import Header from "../components/header";
import colors from "../common/colors";
import styled from "styled-components/native";
import DeviceInfo from "react-native-device-info";

const deviceLocale = DeviceInfo.getDeviceLocale();
const polish = deviceLocale.includes("pl");
const vh = Dimensions.get("window").height;
const Paragraph = styled.Text`
	font-size: 14;
	text-align: left;
	color: ${colors.black};
	font-weight: 600;

	padding: 20px;
`;

class About extends Component {
	static navigationOptions = {
		showLabel: false,
		title: polish ? "Info" : "About",
		tabBarIcon: ({ focused, tintColor }) => (
			<Image
				source={require("../assets/logo.png")}
				style={{ width: 30, height: 30, top: 0, position: "absolute" }}
			/>
		)
	};

	render() {
		const viewStyle = Platform.OS === "android" ? { height: vh - 80 } : {};
		return (
			<View {...viewStyle}>
				<Header height={20} />

				<ScrollView>
					<View style={{ paddingBottom: 100 }}>
						{global.polish && (
							<Paragraph>
								Enea Spring Break Showcase Festival & Conference to pionierskie na polskim rynku
								wydarzenie – impreza, w ramach której koncerty młodych obiecujących zespołów sąsiadują z
								warsztatami i panelami dla uczestników!
								{"\n"}
								{"\n"}
								Trwająca trzy dni impreza ma służyć prezentacji młodych, w tym także wielkopolskich,
								zespołów zarówno publiczności, jak i wpływowym osobom ze środowiska muzycznego.
								{"\n"}
								{"\n"}
								Pierwsza edycja Spring Break odbyła się w 2014 roku, między 24 a 26 kwietnia. Po raz
								pierwszy w Polsce widzowie mieli możliwość uczestniczyć w imprezie, która na zachodzie
								jest nieodłącznym elementem życia kulturalnego (podobne konferencje organizowane są w
								m.in. Niemczech, Norwegii, Holandii czy Wielkiej Brytanii). Centrum konferencyjnym i
								festiwalowym imprezy było Centrum Kultury Zamek, w którym odbywały się także występy
								zaproszonych artystów. Inne miejsca koncertowe stanowiły kluby: Blue Note, Scena Pod
								Minogą, Meskalina, Dragon oraz Kawiarnia Nocna Kisielice! Kolejna edycja trwała od 23 do
								25 kwietnia 2015. Na poznańskim showcase wystąpiło ponad stu wykonawców. Wśród nich
								znaleźli się m.in. zwycięzcy plebiscytu BBC Sound of 2015 – trio Years & Years, Mela
								Koteluk, której „Migracje” wciąż znajdują się w zestawieniu najlepiej sprzedających się
								płyt w kraju, Ten Typ Mes, który na SB wystąpił po raz pierwszy z live bandem czy
								Skubas, który promował najnowszy album – „Brzask”. Koncerty 104 artystów odbyły się w 13
								klubach. Trzecia edycja odbyła między 21 a 23 kwietnia 2016. Wśród wykonawców znaleźli
								się m.in. Brodka, która w Poznaniu po raz pierwszy wystąpiła z materiałem z nowej, długo
								wyczekiwanej płyty oraz Taco Hemingway – niekwestionowana gwiazda polskiej sceny
								hip-hopowej. W 2016 roku sponsorem tytularnym imprezy została Enea, dzięki czemu
								festiwal zyskał dodatkową energię.
								{"\n"}
								{"\n"}
								Czwarta edycja Enea Spring Break odbyła się między 20 a 22 kwietnia 2017 roku, a piąta
								zaplanowana jest na dni 19-21 kwietnia 2018 roku. Największa scena festiwalu
								zlokalizowana będzie, podobnie jak w roku 2016 i 2017, na Placu Wolności. Udział w
								koncertach na Placu Wolności będzie gwarantowany dla każdego, kto zakupi karnet. W
								innych miejscach decydować będzie pojemność. Parking podziemny na Placu Wolności jest
								parkingiem strategicznym oraz podstawowym dla uczestników imprezy.
								{"\n"}
								{"\n"}
								FUNDACJA FAST FORWARD{"\n"} ul. Słowackiego 48/5{"\n"} 61-705 Poznań{"\n"}{" "}
								biuro@fast-forward.com.pl
							</Paragraph>
						)}
						{!global.polish && (
							<Paragraph>
								Enea Spring Break Showcase Festival & Conference – a pioneering event in Polish music
								industry!{"\n"}
								{"\n"}
								At Enea Spring Break shows of young, aspiring groups are accompanied by workshops and
								panels for both the industry people and participants. The goal of the event is to
								present young, Polish bands to influential people from the music industry as well as
								give those bands an opportunity to perform for audience craving for new music. The
								presence of delegates from the biggest Polish record labels, festivals, streaming
								services, cultural institutions and bands’ managers makes it the best place to launch a
								career. Many bands that played during first edition of Spring Break ended up playing at
								biggest Polish festivals such as Open’er, OFF or Jarocin during the summer. Between 24th
								and 26th April 2014 for the first time in Poland viewers had a possibility to enjoy an
								event, which is a very important part of the cultural life in other countries. It was
								the first showcase festival in Poland and it definitely showed that this country really
								needed it! More than 100 concerts took place in thirteen venues in the centre of Poznan
								at Spring Break 2015!{"\n"}
								{"\n"}
								Almost 200 industry delegates appeared and many international guests came to Spring
								Break to become acquainted with the young Polish music scene! Third edition of Enea
								Spring Break took place in April 2016. It was the biggest edition with few thousands
								tickets sold and a big stage in the city centre at Plac Wolności. Fourth edition took
								place between 20th and 22nd of April 2017.{"\n"}
								{"\n"}
								Enea Spring Break 2018 will take place between 19th and 21st of April.
								{"\n"}
								{"\n"}
							</Paragraph>
						)}
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default About;

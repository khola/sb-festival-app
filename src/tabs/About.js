import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { AboutIco } from "../components/icons";
import Header from "../components/header";
import colors from "../common/colors";
import styled from "styled-components/native";

const Paragraph = styled.Text`
	font-size: 14;
	text-align: left;
	color: ${colors.black};
	font-weight: 600;

	padding: 20px;
`;

class About extends Component {
	static navigationOptions = {
		title: "Info",
		tabBarIcon: ({ focused, tintColor }) => <AboutIco color={focused ? colors.black : colors.white} size={20} />
	};

	render() {
		return (
			<View>
				<Header />
				<ScrollView>
					<View style={{ paddingBottom: 100 }}>
						<Paragraph>
							Spring Break Showcase Festival & Conference to pionierskie na polskim rynku wydarzenie –
							impreza, w ramach której koncerty młodych obiecujących zespołów sąsiadują z warsztatami i
							panelami dla uczestników!
						</Paragraph>
						<Paragraph>
							Trwająca trzy dni impreza ma służyć prezentacji młodych, w tym także wielkopolskich,
							zespołów zarówno publiczności, jak i wpływowym osobom ze środowiska muzycznego.
						</Paragraph>
						<Paragraph>
							Pierwsza edycja Spring Break odbyła się w 2014 roku, między 24 a 26 kwietnia. Po raz
							pierwszy w Polsce widzowie mieli możliwość uczestniczyć w imprezie, która na zachodzie jest
							nieodłącznym elementem życia kulturalnego (podobne konferencje organizowane są w m.in.
							Niemczech, Norwegii, Holandii czy Wielkiej Brytanii). Centrum konferencyjnym i festiwalowym
							imprezy było Centrum Kultury Zamek, w którym odbywały się także występy zaproszonych
							artystów. Inne miejsca koncertowe stanowiły kluby: Blue Note, Scena Pod Minogą, Meskalina,
							Dragon oraz Kawiarnia Nocna Kisielice! Kolejna edycja trwała od 23 do 25 kwietnia 2015. Na
							poznańskim showcase wystąpiło ponad stu wykonawców. Wśród nich znaleźli się m.in. zwycięzcy
							plebiscytu BBC Sound of 2015 – trio Years & Years, Mela Koteluk, której „Migracje” wciąż
							znajdują się w zestawieniu najlepiej sprzedających się płyt w kraju, Ten Typ Mes, który na
							SB wystąpił po raz pierwszy z live bandem czy Skubas, który promował najnowszy album –
							„Brzask”. Koncerty 104 artystów odbyły się w 13 klubach. Trzecia edycja odbyła między 21 a
							23 kwietnia 2016. Wśród wykonawców znaleźli się m.in. Brodka, która w Poznaniu po raz
							pierwszy wystąpiła z materiałem z nowej, długo wyczekiwanej płyty oraz Taco Hemingway –
							niekwestionowana gwiazda polskiej sceny hip-hopowej. W 2016 roku sponsorem tytularnym
							imprezy została Enea, dzięki czemu festiwal zyskał dodatkową energię.
						</Paragraph>
						<Paragraph>
							Czwarta edycja Enea Spring Break odbyła się między 20 a 22 kwietnia 2017 roku, a piąta
							zaplanowana jest na dni 19-21 kwietnia 2018 roku. Największa scena festiwalu zlokalizowana
							będzie, podobnie jak w roku 2016 i 2017, na Placu Wolności. Udział w koncertach na Placu
							Wolności będzie gwarantowany dla każdego, kto zakupi karnet. W innych miejscach decydować
							będzie pojemność. Parking podziemny na Placu Wolności jest parkingiem strategicznym oraz
							podstawowym dla uczestników imprezy.
						</Paragraph>
						<Paragraph>
							FUNDACJA FAST FORWARD{"\n"} ul. Słowackiego 48/5{"\n"} 61-705 Poznań{"\n"}{" "}
							biuro@fast-forward.com.pl
						</Paragraph>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default About;

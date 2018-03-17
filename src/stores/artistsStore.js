import { observable, computed, action } from "mobx";
import { fetchArtists } from "../api/apiCalls";
import { AsyncStorage } from "react-native";

saveToStorage = value => {
	AsyncStorage.setItem("artists", JSON.stringify(value));
};

export default class ArtistsSingleElement {
	@observable artists = [];
	@observable isFetching = false;

	downloadArtists() {
		this.isFetching = true;

		AsyncStorage.getItem("artists")
			.then(result => {
				let cachedValue = JSON.parse(result);
				if (cachedValue.sort) {
					this.artists = cachedValue;
				}
				this.isFetching = false;
			})
			.catch(() => {
				fetchArtists().then(result => {
					this.artists = result;
					this.isFetching = false;
					saveToStorage(result);
				});
			});
	}

	toggleFav(id) {
		let artistById = this.artists.findIndex(artist => artist.id === id);
		const newArtists = [...this.artists];
		newArtists[artistById].favourite = newArtists[artistById].favourite ? false : true;
		this.artists = newArtists;
		saveToStorage(newArtists);
		return newArtists[artistById].favourite;
	}
}

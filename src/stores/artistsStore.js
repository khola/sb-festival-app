import { observable, computed, action } from "mobx";
import { fetchArtists } from "../api/apiCalls";
import { AsyncStorage } from "react-native";

saveToStorage = value => {
	AsyncStorage.setItem("artists", JSON.stringify(value));
};

export default class ArtistsSingleElement {
	@observable artists = [];
	@observable isFetching = false;
	checkdate = "";

	checkForUpdate(compare) {
		fetchArtists().then(result => {
			console.log("check for update", compare, result);
			if (result.checkdate > compare.checkdate) {
				this.artists = result.data.map((artist, index) => {
					return { ...artist, favourite: compare.data[index].favourite };
				});
				this.checkdate = result.checkdate;
			}
		});
	}

	downloadArtists() {
		this.isFetching = true;

		AsyncStorage.getItem("artists")
			.then(result => {
				let cachedValue = JSON.parse(result);

				if (cachedValue.checkdate) {
					this.artists = cachedValue.data;
					this.checkdate = cachedValue.checkdate;
				}

				this.checkForUpdate(cachedValue);
				this.isFetching = false;
			})
			.catch(() => {
				fetchArtists().then(result => {
					this.artists = result.data;
					this.isFetching = false;
					this.checkdate = result.checkdate;
					saveToStorage(result);
				});
			});
	}

	toggleFav(id) {
		let artistById = this.artists.findIndex(artist => artist.id === id);
		const newArtists = [...this.artists];
		newArtists[artistById].favourite = newArtists[artistById].favourite ? false : true;
		this.artists = newArtists;
		saveToStorage({ checkdate: this.checkdate, data: newArtists });
		return newArtists[artistById].favourite;
	}
}

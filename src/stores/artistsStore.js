import { observable, computed } from "mobx";
import { fetchArtists } from "../api/apiCalls";

export default class ArtistsSingleElement {
	@observable artists = [];

	downloadArtists() {
		fetchArtists().then(result => {
			this.artists = result;
		});
	}
}

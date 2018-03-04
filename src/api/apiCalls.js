const fetchArtists = () => {
	return fetch("http://spring-break.pl/artists.php")
		.then(response => response.json())
		.then(responseJson => responseJson.data)
		.catch(error => {
			alert(error);
			return [];
		});
};
export { fetchArtists };

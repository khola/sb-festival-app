import { AsyncStorage } from "react-native";

const fetchImage = path => {
	return AsyncStorage.getItem(path)
		.then(image => {
			if (image) {
				return Promise.resolve(image);
			} else {
				return fetch("http://spring-break.pl/base64.php?path=" + path)
					.then(response => response.json())
					.then(responseJson => {
						AsyncStorage.setItem(path, responseJson.base64);
						return responseJson.base64;
					})
					.catch(error => {
						alert(error);
						return [];
					});
			}
		})
		.catch(() => {
			return Promise.resolve("");
		});
};
export { fetchImage };

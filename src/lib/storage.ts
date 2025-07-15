function getToken() {
	return sessionStorage.getItem("token");
}

function setToken(token: string) {
	return sessionStorage.setItem("token", token);
}

export const storage = { getToken, setToken };

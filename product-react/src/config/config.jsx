export const api = "http://localhost:8080";

export const requestConfig = (method, data) => {

    let config;

    if(method === "GET" || method === "DELETE"){

        config = {
            method: method,
        }

        return config;
    }

    if(method === "POST" || method === "PUT") {
        config = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }

        return config;
    }

}
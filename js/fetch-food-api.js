class FetchFoodApi {
  
  constructor(url, options = {}) {
    this.url = url;
    this.header = options;
  }

  getFoodFetch() {
    return fetch(this.url, {
      method: "GET",
      headers: this.header,
    }).then((response) => response.json());
  }

  postFoodFetch(data) {
    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }

  deleteFoodFetch(data) {
    return fetch(this.url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    }).then((response) => response.json());
  }
}

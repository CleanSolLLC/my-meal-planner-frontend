class FetchCategoryApi {
  constructor(url, options = {}) {
    this.url = url;
    this.header = options;
  }

  getCategoryFetch() {
    return fetch(this.url, {
      method: "GET",
      headers: this.header,
    }).then((response) => response.json());
  }

  postCategoryFetch(data) {
    return fetch(this.url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  deleteCategoryFetch(data) {
    return fetch(this.url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    }).then((response) => response.json());
  }
}

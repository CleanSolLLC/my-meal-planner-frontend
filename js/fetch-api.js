class FetchApi {
  constructor(url, options = {}) {
    this.url = url;
    this.header = options;
  }

  getFetch() {
    return fetch(this.url, {
      method: "GET",
      headers: this.header,
    }).then((response) => response.json());
  }

  postFetch(data) {
    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      }).then((response) => response.json())
    ;
    }
   //}).then((response) => {
     // debugger
      //return response.json()
    //});
  //}

  deleteFetch(data) {
    return fetch(this.url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    }).then((response) => response.json());
  }
}

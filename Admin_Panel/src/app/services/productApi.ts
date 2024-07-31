const getToken = () => {
    const userInfoJSON = localStorage.getItem("token");
    return userInfoJSON;
  };
  
  export function PostProduct(newProduct: any) {
    let BaseUrl = "http://127.0.0.1:5000/products/create";
  
    return new Promise((resolve, reject) => {
      fetch(BaseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: getToken() || "",
        },
        body: JSON.stringify({
          category: newProduct.category,
          productName: newProduct.name,
          productPrice: newProduct.price,
          productUrl: newProduct.image,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  export function GetAllProduct() {
    let BaseUrl = "http://127.0.0.1:5000/products/getAllProduct";
  
    return new Promise((resolve, reject) => {
      fetch(BaseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: getToken() || "",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
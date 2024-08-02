const getToken = () => {
    const userInfoJSON = localStorage.getItem("token");
    return userInfoJSON;
  };
  
  export function PostProduct(formData: any) {
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
          category: formData.category,
          productName: formData.name,
          productPrice: formData.price,
          productUrl: formData.image,
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
  

  export function EditProductDetails(editFormData:any,) {
    const editProductID=editFormData.id
    console.log(editProductID,"kkkkkkkkkkkkkkkkkkk")
    let BaseUrl = `http://127.0.0.1:5000/products/update/${editProductID}`;
  
    return new Promise((resolve, reject) => {
      fetch(BaseUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: getToken() || "",
        },
        body: JSON.stringify({
          category: editFormData.category,
          productName: editFormData.name,
          productPrice: editFormData.price,
          productUrl: editFormData.image,
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
  


  export function DeleteProduct(productID:any) {
    let BaseUrl = `http://127.0.0.1:5000/products/delete/${productID}`;
  
    return new Promise((resolve, reject) => {
      fetch(BaseUrl, {
        method: "DELETE",
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
  
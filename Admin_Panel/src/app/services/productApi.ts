const getToken = () => {
    const userInfoJSON = localStorage.getItem("token");
    return userInfoJSON;
  };
  
  export function PostProduct(formData: any) {
    let BaseUrl = "http://127.0.0.1:5000/products/create";
    const data = new FormData();
    data.append('category', formData.category);
    data.append('productName', formData.name);
    data.append('productPrice', formData.price);
    data.append('file', formData.image); 
    data.append('description',formData.description),
    data.append('sizesQuantities',JSON.stringify(formData.sizeQuatities))
    return new Promise((resolve, reject) => {
      fetch(BaseUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: getToken() || "",
        },
        body: data
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
          // productUrl: editFormData.image,
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
  
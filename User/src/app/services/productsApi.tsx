import axios from "axios";

const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? token : "";
};

export function AddCartItem(productID: any) {
    const config = {
        headers: { Authorization: getToken() }
    };

    const BaseUrl = "http://127.0.0.1:5000/user/addCart";
    return axios.post(BaseUrl, {
        productId: productID,
        quantity: 1,
    }, config).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error("Error in AddCartItem:", error.response ? error.response.data : error.message);
        throw error;
    });
}

export function getAllProduct() {
    const config = {
        headers: { Authorization: getToken() }
    };

    const BaseUrl = "http://127.0.0.1:5000/user/getAllCart";
    return axios.get(BaseUrl, config).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error("Error in getAllProduct:", error.response ? error.response.data : error.message);
        throw error;
    });
}

export function deleteCartItem(cartItemId: any) {
    const config = {
        headers: { Authorization: getToken() }
    };

    const BaseUrl = `http://127.0.0.1:5000/user/deleteCartItem/${cartItemId}`;
    return axios.delete(BaseUrl, config).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error("Error in deleteCartItem:", error.response ? error.response.data : error.message);
        throw error;
    });
}



export function clearCartItem() {
    const config = {
        headers: { Authorization: getToken() }
    };

    const BaseUrl = "http://127.0.0.1:5000/user/clearCart";
    return axios.delete(BaseUrl, config).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error("Error in clearCartItem:", error.response ? error.response.data : error.message);
        throw error;
    });
}

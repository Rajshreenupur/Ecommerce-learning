import axios from "axios";

export function UserSignUp(signUpData: any) {
  let BaseUrl = "http://127.0.0.1:5000/user/signup";
  return axios.post(BaseUrl, signUpData).then((response) => {
    return response.data;
  });
}

export function UserSignIn(data: any) {
  let BaseUrl = "http://127.0.0.1:5000/user/signin";
  return axios.post(BaseUrl, data).then((response) => {
    return response.data;
  });
}

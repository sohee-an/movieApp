import axios from "axios";

const instance = axios.create({
  baseURL: "https//api.themoviedb.org/",
  params: {
    api_key: "3935d9fe8eedb7b2ff257f01c2444e4f",
    language: "ko-KR",
  },
});
export default instance;

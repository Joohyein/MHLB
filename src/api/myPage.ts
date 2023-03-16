import axios from "axios";
import instance from "./instance/instance";

const getUserData = async() => {
    const response = await axios.get('http://localhost:3001/user');
    console.log(response);
    return response.data;
  };
const editUserName = async(userName: string) => {
    await instance.patch('/user', userName);
};

export { getUserData, editUserName };
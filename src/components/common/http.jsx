export const apiUrl = 'http://localhost:8000/api/';
export const token = () => {

    const userInfo = localStorage.getItem('userInfo');
    const data = JSON.parse(userInfo);
    return data.token;
}
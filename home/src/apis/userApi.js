

import axiosClient from "./axiosClient";
const userApi = {
    login(email, password) {
        const url = '/auth/login';
        return axiosClient
            .post(url, {
                email,
                password,
            })
            .then(response => {

                console.log(response);
                if (response) {
                    localStorage.setItem("client", response.token);
                }
                return response;
            });
    },
    logout(data) {
        const url = '/user/logout';
        return axiosClient.get(url);
    },
    pingRole() {
        const url = '/user/ping_role';
        return axiosClient.get(url);
    },
    getProfile() {
        const url = '/user/profile';
        return axiosClient.get(url);
    },
    

    updatePassword(userId, passwordData) {
        const url = `/user/password/${userId}`;
        return axiosClient.put(url, passwordData);
    },

    updateProfile: (id, updatedUserData) => {
        const url = `/user/${id}`;
        return axiosClient.put(url, updatedUserData);
    },

    updateUserAvatar(id, image) {
        const url = `/users/${id}/avatar`;
        const formData = new FormData();
        formData.append('avatar', image);

        return axiosClient.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },


}

export default userApi;
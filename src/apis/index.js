import axios  from 'axios'

const axiosConfig = axios.create({
    baseURL: 'http://localhost:8000'
});

axiosConfig.interceptors.request.use(function(config) {
    const userData = JSON.parse(localStorage.getItem("userData"))
        if (userData) {
            const token = userData.token
            if (token && token !== "undefined") {
                config.headers["Authorization"] = "Token " + token
            }
        }
        return config
    },
    function(error) {
    // Do something with request error
    return Promise.reject(error);
    }
);
  
export function getEmployees() {
    return axiosConfig({
        url: '/employees',
        method: 'GET'
    })
}
export function getEmployee(id) {
    return axiosConfig({
        url: `/employees/${id}`,
        method: 'GET'
    })
}
export function patchEmployee(id, payload) {
    return axiosConfig({
        url: `/employees/${id}/`,
        method: 'PATCH',
        data: payload
    })
}
export function deleteEmployee(id) {
    return axiosConfig({
        url: `/employees/${id}/`,
        method: 'DELETE',
    })
}

export function postEmployee(payload) {
    return axiosConfig({
        url: `/employees/`,
        method: 'POST',
        data: payload
    })
}
export function getReviews() {
    return axiosConfig({
        url: `/reviews`,
        method: 'GET',
    })
}
export function getReview(id) {
    return axiosConfig({
        url: `/reviews/${id}/`,
        method: 'GET',
    })
}
export function getReviewSubmissions() {
    return axiosConfig({
        url: `/submissions`,
        method: 'GET',
    })
}
export function patchPerformanceReview(id, payload) {
    return axiosConfig({
        url: `/reviews/${id}/`,
        method: 'PATCH',
        data: payload
    })
}
export function postPerformanceReview(payload) {
    return axiosConfig({
        url: `/reviews/`,
        method: 'POST',
        data: payload
    })
}
export function deleteQuestion(id) {
    return axiosConfig({
        url: `/questions/${id}/`,
        method: 'DELETE',
    })
}
export function getRatings() {
    return axiosConfig({
        url: `/ratings/`,
        method: 'GET',
    })
}
export function postSubmission(payload) {
    return axiosConfig({
        url: `/submissions/`,
        method: 'POST',
        data: payload
    })
}
export function login(credentials) {
    return axiosConfig({
        url: `/login/`,
        method: 'POST',
        data: credentials
    })
}
export function logout() {
    return axiosConfig({
        url: `/logout/`,
        method: 'POST',
    })
}
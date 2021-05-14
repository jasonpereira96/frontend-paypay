import axios  from 'axios'

const axiosConfig = axios.create({
    baseURL: 'http://localhost:8000'
});
  
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
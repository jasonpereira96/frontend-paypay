export function showToast(message, context) {
    context.$bvToast.toast(message, {
        title: '',
        autoHideDelay: 5000,
        appendToast: false
    })
}
export function getName(employee) {
    return `${employee.first_name} ${employee.last_name}`
}
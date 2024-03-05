
export const setIsAuthenticated = ({ token, email, id }) => {
    localStorage.setItem('rb_t_access_token', token);
    localStorage.setItem('rb_t_access_email', email);
    localStorage.setItem('rb_t_access_id', id);
    return;
}

export const IsAuthenticated = () => {
    let token = localStorage.getItem('rb_t_access_token');
    let email = localStorage.getItem('rb_t_access_email');
    let id = localStorage.getItem('rb_t_access_id');

    return { token, email, id };
}

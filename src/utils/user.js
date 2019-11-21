export const getUserInfo = () => localStorage.getItem('userInfo');
export const setUserInfo = ({ userInfo, token }) => {
  if (userInfo) localStorage.setItem('userInfo', JSON.stringify(userInfo));
  if (token) localStorage.setItem('token', token);
};
export const delUserInfo = () => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');
};

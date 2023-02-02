import Cookies from 'js-cookie'

export function getToken () {
  return Cookies.get("token");
}
export function setToken (token) {
  return Cookies.set("token", token)
}
export function removeToken () {
  return Cookies.remove("token")
}
export function getUserAccount () {
  return Cookies.get("user_account")
}
export function setUserAccount (user) {
  return Cookies.set("user_account", user)
}
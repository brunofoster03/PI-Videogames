// const usernameRegex = new RegExp('^(?=.{2,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')
// const emailRegex = new RegExp('^(?=.{1,64}@.{4,253}$)(?=.{6,1000}$)(?!.*\\.\\.)(?!^\\.)(?!.*\\.$)[a-zA-Z0-9][a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]*[a-zA-Z0-9]@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')
// const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[.!@#$%&?~_ñÑ])?(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z.!@#$%&?~_ñÑ]{6,32}$')
// export const validate = ({ username, email, password }) => {
//   const validation = {
//     username: false,
//     email: false,
//     password: false
//   }
//   if(usernameRegex.test(username)) validation.username = true
//   if(emailRegex.test(email)) validation.email = true
//   if(passwordRegex.test(password)) validation.password = true
//   return validation
// }
export const validate = ({ username, email, password }) => {
  const validation = {
    username: {
      length: false,
      valids: false,
      starts: false,
      consecutive: false
    },
    email: {
      symbol: false,
      domain: false,
      starts: false,
      valids: false
    },
    password: {
      lowerUpper: false,
      number: false,
      special: false,
      length: false
    }
  }
  if(/^.{2,30}$/.test(username)) validation.username.length = true
  if(/^[a-zA-Z0-9._]+$/.test(username)) validation.username.valids = true
  if(/^(?![_\.]).*[^_\.]$/.test(username)) validation.username.starts = true
  if(/^(?!.*(\.{2}|_{2}|[._]{1}[._])).*$/.test(username)) validation.username.consecutive = true
  if(/^(?=.{1,64}@.{4,253}$)/.test(email)) validation.email.symbol = true
  if(/@[A-Za-z]+/.test(email)) validation.email.domain = true
  if(/^(?!\.)(?!_)(?!.*\.$)(?!.*_$)(?!.*\.\.)(?!.*__).+$/.test(email)) validation.email.starts = true
  if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{1,}$/.test(email)) validation.email.valids = true
  if(/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) validation.password.lowerUpper = true
  if(/^(?=.*\d).+$/.test(password)) validation.password.number = true
  if(/^[a-zA-Z0-9.!@#$%&?~_ñÑ]+$/.test(password)) validation.password.special = true
  if(/^.{6,32}$/.test(password)) validation.password.length = true

  return validation
}

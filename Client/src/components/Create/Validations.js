const nameRegex = new RegExp(/^[a-zA-Z0-9:\-()'.'\s]{3,32}$/)
const descriptionRegex = new RegExp(/^.{20,255}$/)

export const nameValidate = (name) => {
  if(nameRegex.test(name)) return false
  else return true
}

export const descriptionValidate = (description) => {
  if(descriptionRegex.test(description)) return false
  else return true
}

export const imagesValidate = (images) => {
  if(images.length >= 2) return false
  else return true
}

export const platformsValidate = (platforms) => {
  if(platforms.length >= 1) return false
  else return true
}

export const genresValidate = (genres) => {
  if(genres.length >= 1) return false
  else return true
}

export const ratingValidate = (rating) => {
  if(rating > 0 && rating <= 5) return false
  else return true
}
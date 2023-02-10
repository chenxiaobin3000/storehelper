function fixUrl(url) {
  const protocol = document.location.protocol
  if (protocol === 'http:') {
    return 'http://' + url
  } else if (protocol === 'https:') {
    return 'https://' + url
  }
}

export default [
  '',
  fixUrl(process.env.VUE_APP_IMAGE_PATH1)
]

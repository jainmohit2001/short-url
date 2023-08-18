/**
 * Function to copy the text provided in the input to the User's clipboard
 *
 * @param {string} text
 */
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

/**
 * Function to retrieve the base url of the website
 *
 * @returns {string}
 */
function getBaseUrl(): string {
  if (process.env.NODE_ENV === 'development') {
    return `${process.env.NEXTAUTH_URL}`
  }

  return (
    'https://' + (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL)
  )
}

export { copyToClipboard, getBaseUrl }

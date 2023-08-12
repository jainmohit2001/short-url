/**
 * Function to copy the text provided in the input to the User's clipboard
 *
 * @param {string} text
 */
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

export default copyToClipboard

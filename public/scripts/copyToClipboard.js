
const copyToClipboard = (dataToClip) => {
  //Creates a text area element
  const elm = document.createElement('textarea');
  //Sets the value of the new element to the data we want
  elm.value = dataToClip;
  //Addes the element to the html
  document.body.appendChild(elm);
  //Select / Highlights the Text
  elm.select();
  //Add the text to the clipboard
  document.execCommand('copy');
  //Removes the element as its no longer needed
  document.body.removeChild(elm);
}


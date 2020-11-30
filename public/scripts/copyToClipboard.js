
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

/*
const copyToClipboard = str => {
  const elm = document.createElement('textarea');  // Create a <textarea> element
  elm.value = str;                                 // Set its value to the string that you want copied
  elm.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  elm.style.position = 'absolute';
  elm.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  elm.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
};
 */

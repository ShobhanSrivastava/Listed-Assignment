// Generates a random number between the given leftNum and rightNum (inclusive) and returns it in milliseconds
function randomBetween(leftNum, rightNum) {
    rightNum += 1;

    return (Math.floor(Math.random() * (rightNum - leftNum)) + leftNum) * 1000;
}

// Checks if any email in the given array of emails has the label 'SENT'
function threadHasPreviousSentEmail(emails) {
    emails.forEach(email => {
        if(email.labelIds.includes('SENT')) {
            return true;
        }
    })

    return false;
}

// Extracts the 'From' header from the given email headers
function getFromHeaderOfEmail(headers) {
    let sender = '';
    headers.forEach(header => {
        if(header.name === 'From') sender = header.value;
    })

    return sender;
}

// Extracts the sender email address from the given header value string
function getSenderEmail(headerValueString) {
    const splitValues = headerValueString.split(' ');
    const length = splitValues.length;

    if(length == 1) return splitValues[0];

    const senderEmailString = splitValues[length - 1];
    const senderEmailAddress = senderEmailString.substring(1, senderEmailString.length - 1);

    return senderEmailAddress;
} 

// Creates an email with the given recipient email address
function createEmail(recipientEmailAddress) {
    let email = `To: ${recipientEmailAddress}\r\n`;
    email += `Subject: Auto generated Email. Do not reply!\r\n\r\n`;
    email += `Auto generated Email. Do not reply!`

    return email;
}

export { randomBetween, threadHasPreviousSentEmail, getFromHeaderOfEmail, getSenderEmail, createEmail };

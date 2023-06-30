import { google } from 'googleapis';
import { getFromHeaderOfEmail, threadHasPreviousSentEmail, getSenderEmail, createEmail } from './utility.js';
const OAuth2 = google.auth.OAuth2;

// Create new OAuth2 client
const client = new OAuth2();

// This is the label we want in our threads
const labelName = 'check after vacations';

// This function is reponsible for auto reply
async function autoReply(user) {
    // Get the accessToken of the user
    const accessToken = user.accessToken;

    // Set the credentials of the user for authentication and user identification
    client.setCredentials({ access_token: accessToken });

    // Create a client with v1 version and setting the client for auth purposes
    const gmailClient = google.gmail({
        version: 'v1',
        auth: client,
    });

    // First we check if the user has 'check after vacation' label or not
    // If it is not present, we create the label using this function
    await findOrCreateLabel(gmailClient);

    // Fetch the unread threads of the user
    const threads = await fetchUnreadEmails(gmailClient);

    // For every thread in the threads array
    threads.forEach(async (thread) => {
        // Fetch all the emails in the thread using the threadId 
        const emails = await fetchAllEmailsInThread(gmailClient, thread.threadId);

        // Check if the thread has emails in which none of the labelId is 'SENT'
        if(!threadHasPreviousSentEmail(emails)) {
            // Take the first email in the thread and get its headers
            const firstEmailHeaders = emails[0].payload.headers;
            // Get the header which has 'From' name
            const sender = getFromHeaderOfEmail(firstEmailHeaders);  

            // Get the sender email from the header
            const senderEmail = getSenderEmail(sender);
            // Get the email that needs to be sent with the recipient set in it
            const emailToSend = createEmail(senderEmail);

            // Encode the email using base 64 encoding
            const encodedEmail = Buffer.from(emailToSend).toString('base64');

            // Send the email and update its label
            sendEmailAndUpdateLabel(gmailClient, encodedEmail);
        }
    })
}

// Asynchronously finds or creates a label in the Gmail account
async function findOrCreateLabel(gmailClient) {
    try {
        // Fetch the list of labels
        const labelResponse = await gmailClient.users.labels.list({ userId: 'me' });
        const labels = labelResponse.data.labels || [];
    
        // Check if the label already exists
        const existingLabel = labels.find(label => label.name === labelName);
        if (existingLabel) {
            console.log(`Label '${labelName}' already exists.`);
        }
        else {
            // Create the label if it doesn't exist
            gmailClient.users.labels.create({
              userId: 'me',
              resource: {
                name: labelName,
                labelListVisibility: 'labelShow',
                messageListVisibility: 'show'
              }
            });
        
            console.log(`Label '${labelName}' created successfully.`);
        }
    } catch (error) {
        console.error('Error creating label:', error);
        throw error;
    }
}

// Fetches unread emails that don't belong to the specified label
async function fetchUnreadEmails(gmailClient) {
    try {
        // Fetch the list of unread emails
        const response = await gmailClient.users.messages.list({
          userId: 'me',
          q: `is:unread AND -label:${labelName}`
        });

        const emails = response.data.messages || [];
        return emails;
    } catch(error) {
        console.error('Error fetching unread emails:', error);
        throw error;
    }
}

// Fetches all emails in a thread based on the thread ID
async function fetchAllEmailsInThread(gmailClient, threadId) {
    try {
        // Fetch the thread with complete email data
        const response = await gmailClient.users.threads.get({
          userId: 'me',
          id: threadId,
          format: 'full'
        });
    
        const emails = response.data.messages;
        return emails;
    }
    catch (error) {
        console.error('Error fetching emails in thread:', error);
    }
}

// Sends an email and updates the label
async function sendEmailAndUpdateLabel(gmailClient, email) {
    try {
        // Send the email and apply the label
        const response = await gmailClient.users.messages.send({
          userId: 'me',
          requestBody: {
            raw: email,
            label: labelName
          }
        });
    
        console.log('Email sent:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export default autoReply;

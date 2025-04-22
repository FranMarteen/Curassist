import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:3000/api'; // Replace with your API URL

const userId = '46184e13-eb94-4327-8e57-35a061bbe98f';
const curateladoId = '1924f6bd-e633-4e64-819d-5bdda15f3cfd';
const testDocumentPath = path.join(__dirname, '../uploads/test-document.txt'); // Path to a test document

async function testUploadDocument() {
  try {
    // 1. Authenticate user (replace with your actual authentication logic)
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'franciscoschubert@gmail.com', // Replace with a valid user email
      password: 'password123', // Replace with a valid user password
    });

    const token = loginResponse.data.token;

    // 2. Prepare the form data
    const formData = new FormData();
    formData.append('document', fs.createReadStream(testDocumentPath));
    formData.append('curateladoId', curateladoId);

    // 3. Upload the document
    const uploadResponse = await axios.post(`${API_URL}/documents/upload`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        ...formData.getHeaders(),
      },
    });

    console.log('Upload response:', uploadResponse.data);

    // 4. Verify the upload (replace with your actual verification logic)
    if (uploadResponse.status === 200) {
      console.log('Document uploaded successfully!');
    } else {
      console.error('Document upload failed.');
    }
  } catch (error: any) {
    console.error('Test failed:', error);
  }
}

// Create a dummy test document if it doesn't exist
if (!fs.existsSync(testDocumentPath)) {
  fs.writeFileSync(testDocumentPath, 'This is a test document.');
}

testUploadDocument();

import axios from 'axios';
import _ from 'lodash';

/**
 * Pins an image file to Pinata.
 * @param file - The image file to be pinned. Should be a File/Blob object.
 * @param fileName - The name of file to be be uploaded
 * @param token - Authorization token for Pinata.
 * @returns The IPFS hash of the pinned image file.
 */
export const pinImageFile = async (file: Blob, fileName: string, token: string): Promise<string> => {
  // Check if the file is an image
  if (!file.type.startsWith('image/')) {
    throw new Error('File is not an image');
  }

  // Prepare the form data
  const formData = new FormData();
  formData.append('file', file, fileName);

  const config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };

  // Make the request and return the IPFS hash
  const res = await axios(config);
  return _.get(res, 'data.IpfsHash');
};

export default pinImageFile;

export const fetchToken = async (count = 0) => {
  const token = await fetch('/api/upload-start', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ count }),
  }).then((res) => res.text());

  return token;
};

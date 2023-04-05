import { Web3Storage } from 'web3.storage';

const useImageUpload = async (file: any) => {
  let imageUrl;
  try {
    const client = new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3STORAGE_KEY || '',
    });
    const cid = await client.put([file]);
    imageUrl = `https://${cid}.ipfs.w3s.link/${file.name}`;
    return imageUrl;
  } catch (error) {
    console.error({ error });
  }

  return imageUrl;
};

export default useImageUpload;

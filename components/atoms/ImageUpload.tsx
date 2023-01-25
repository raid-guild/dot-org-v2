import { VStack, Text } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  localForm: UseFormReturn;
}

const ImageUpload = ({ localForm }: Props) => {
  const { control } = localForm;
  // const handleImage = async (file) => {
  //   console.log(file);
  //   const response = await addImage(file);
  //   if (response?.cid) {
  //     try {
  //       let imageUrl = `https://${response?.cid}.ipfs.w3s.link/${file.name}`;
  //       setImagePath(imageUrl);
  //     } catch (error) {
  //       console.error({ error });
  //     }
  //   }
  // };

  // async function addImage(file) {
  //   try {
  //     const client = new Web3Storage({
  //       token: process.env.NEXT_PUBLIC_WEB3STORAGE_KEY,
  //     });
  //     const cid = await client.put([file]);
  //     return { cid };
  //   } catch (error) {
  //     console.log(error);
  //     return { error };
  //   }
  // }

  return (
    <VStack align='flex-start' w='100%'>
      <Text size='md'>Image:</Text>
      {/* <Input borderColor='primary.500' w='100%' onChange={(event) => handleImage(event.target.files[0])} type='file' />
              {imagePath && <Image src={imagePath} maxWidth='250px' />} */}
    </VStack>
  );
};

export default ImageUpload;

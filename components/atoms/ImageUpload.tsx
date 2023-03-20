import { useState } from 'react';
import { VStack, Text, Input, Image } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';
import useImageUpload from '../../hooks/useImageUpload';

interface Props {
  localForm: UseFormReturn;
  defaultValue?: string;
}

const ImageUpload = ({ localForm, defaultValue }: Props) => {
  const [imagePath, setImagePath] = useState('');
  const { watch } = localForm;
  const file = watch('imageUrl');

  const getImageUrl = async () => {
    if (file?.length) {
      const imageUrl = await useImageUpload(file[0]);
      setImagePath(imageUrl || '');
    }
  };
  getImageUrl();

  return (
    <VStack align='flex-start' w='100%'>
      <Text size='md'>Image:</Text>
      <Input w='100%' name='imageUrl' label='imageUrl' localForm={localForm} type='file' defaultValue={defaultValue} />
      {imagePath && <Image src={imagePath} alt='image' w='200px' />}
      {defaultValue && <Image src={defaultValue} alt='image' w='200px' />}
    </VStack>
  );
};

export default ImageUpload;

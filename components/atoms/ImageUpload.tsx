import { useState } from 'react';
import { VStack, Input, Image } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';
import useImageUpload from '../../hooks/useImageUpload';

interface Props {
  localForm: UseFormReturn;
  defaultValue?: string;
  label: string;
  name: string;
}

const ImageUpload = ({ localForm, defaultValue, label, name }: Props) => {
  const [imagePath, setImagePath] = useState('');
  const { watch } = localForm;
  const file = watch(name);

  const getImageUrl = async () => {
    if (file?.length) {
      const imageUrl = await useImageUpload(file[0]);
      setImagePath(imageUrl || '');
    }
  };
  getImageUrl();

  return (
    <VStack align='flex-start' w='100%'>
      <Input w='100%' name={name} label={label} localForm={localForm} type='file' defaultValue={defaultValue} />
      {imagePath ? <Image src={imagePath} alt='image' w='200px' /> : <Image src={defaultValue} alt='image' w='200px' />}
    </VStack>
  );
};

export default ImageUpload;

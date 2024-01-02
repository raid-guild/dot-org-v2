import { defaultTheme, Image, Input, Stack } from '@raidguild/design-system';
import { useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import usePinataUpload from '../../hooks/usePinataUpload';

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

  const { data } = usePinataUpload({
    imageFile: file?.[0],
    imageName: name,
  });

  useMemo(() => {
    if (data) {
      setImagePath(`https://gateway.pinata.cloud/ipfs/${data}`);
    } else {
      setImagePath('');
    }
  }, [data]);

  return (
    <Stack w='100%' p={12} border={`1px solid ${defaultTheme.colors.primary[500]}`} gap={8}>
      <Input
        w='100%'
        name={name}
        label={label}
        localForm={localForm}
        type='file'
        border={`1px solid ${defaultTheme.colors.primary[500]}`}
        _focus={{ border: `1.5px solid ${defaultTheme.colors.purple[500]}` }}
        p={4}
        borderRadius={0}
        variant='unstyled'
        fontFamily='mono'
        gap={4}
      />
      {imagePath && <Image src={imagePath || defaultValue} alt='image' w='200px' />}
    </Stack>
  );
};

export default ImageUpload;

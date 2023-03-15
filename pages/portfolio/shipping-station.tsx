import { VStack, Box, Text, Textarea, Input, Select, Button, Stack } from '@raidguild/design-system';
import { FieldValues, useForm } from 'react-hook-form';
// import { Web3Storage } from 'web3.storage';

import { useSession } from 'next-auth/react';
import _ from 'lodash';

import Link from '../../components/atoms/ChakraNextLink';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
import useSubmit from '../../hooks/useSubmit';

const questions = [
  {
    label: 'The Challenge',
    name: 'challenge',
  },
  {
    label: 'The Approach',
    name: 'approach',
  },
  {
    label: 'The Results',
    name: 'result',
  },
];

const categoryOptions = [
  {
    label: 'Design Sprint',
    value: 'DESIGN_SPRINT',
  },
  {
    label: 'Backend',
    value: 'BACKEND',
  },
  {
    label: 'Frontend',
    value: 'FRONTEND',
  },
  {
    label: 'Full Stack',
    value: 'FULL_STACK',
  },
  {
    label: 'Marketing',
    value: 'MARKETING',
  },
  {
    label: 'Smart Cpntracts',
    value: 'SMART_CONTRACTS',
  },
];

// const roleOptions = [
//   { value: 'SMART_CONTRACTS', label: 'Wizard (Smart Contracts)' },
//   { value: 'FRONTEND_DEV', label: 'Warrior (Frontend Dev)' },
//   { value: 'Rogue', label: 'Rogue' },
//   { value: 'Ranger', label: 'Ranger' },
//   { value: 'Cleric', label: 'Cleric' },
//   { value: 'Bard', label: 'Bard' },
//   { value: 'Druid', label: 'Druid' },
//   { value: 'Paladin', label: 'Paladin' },
//   { value: 'Archer', label: 'Archer' },
//   { value: 'Necromancer (Dev Ops)', label: 'Necromancer (Dev Ops)' },
//   { value: 'Hunter', label: 'Hunter' },
//   { value: 'Monk', label: 'Monk' },
// ];

const ShippingStation = () => {
  const localForm = useForm();
  const { reset, handleSubmit } = localForm;
  const { data: session } = useSession();
  const token = _.get(session, 'token') || '';
  const { submitProjectForm } = useSubmit(token);

  // a function that returns the square root of a number
  // const sqrt = (x) => Math.sqrt(x);

  // // a function that returns a random element of an array
  // const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const clearData = () => {
    reset();
  };

  const onSubmit = (data: FieldValues) => {
    console.log('form data:', data);
    submitProjectForm(data);
  };

  // const handleImage = async (file) => {
  // console.log(file);
  // const response = await addImage(file);
  // if (response?.cid) {
  //   try {
  //     let imageUrl = `https://${response?.cid}.ipfs.w3s.link/${file.name}`;
  //     setImagePath(imageUrl);
  //   } catch (error) {
  //     console.error({ error });
  //   }
  // }
  // };

  // async function addImage(file) {
  // try {
  //   const client = new Web3Storage({
  //     token: process.env.NEXT_PUBLIC_WEB3STORAGE_KEY,
  //   });
  //   const cid = await client.put([file]);
  //   if (cid) {
  //     toast.success('Image uploaded successfully!');
  //   }
  //   return { cid };
  // } catch (error) {
  //   toast.error('Error uploading image!');
  //   toast('Check the console for more details.');
  //   console.error(error);
  //   return null;
  // }
  // }

  return (
    <CMSPageTemplate>
      <PageTitle title='Create Shipped Product' />
      <VStack width='60vw' margin='0 auto' pb='2rem'>
        <Input label='Project Name' name='projectName' localForm={localForm} />
        <Input label='Project Slug:' name='slug' localForm={localForm} />
        {/* <Input label='Website URL' name='websiteUrl' localForm={localForm} /> */}
        <Input label='Github:' name='githubUrl' localForm={localForm} />
        <Input label='Description:' name='description' localForm={localForm} />

        {/* <VStack alignItems='flex-start' width='100%'>
          <Text size='md'>Image:</Text>
          <ChakraInput
            borderColor='primary.500'
            w='100%'
            // onChange={(event) => handleImage(event.target.files[0])}
            type='file'
          />
        </VStack> */}
        {questions.map((question) => (
          <Stack width='full' key={question.label}>
            <Textarea label={question.label} name={question.name} localForm={localForm} />
            <Text fontSize='0.8rem'>
              This textarea accepts{' '}
              <Link href='https://daringfireball.net/projects/markdown/basics' isExternal>
                markdown
              </Link>
            </Text>
          </Stack>
        ))}
        <Select name='categoryOptions' localForm={localForm} options={categoryOptions} />

        <Box pt={8}>
          <Button onClick={handleSubmit(onSubmit)}>Ship Project</Button>
        </Box>
      </VStack>
    </CMSPageTemplate>
  );
};

export default ShippingStation;

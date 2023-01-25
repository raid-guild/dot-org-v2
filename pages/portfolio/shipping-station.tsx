import {
  VStack,
  Text,
  Textarea,
  Input,
  Select,
  Button,
  Icon,
  IconButton,
  Stack,
  ChakraInput,
  Card,
  Flex,
  Grid,
} from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
// import { Web3Storage } from 'web3.storage';

import Link from '../../components/atoms/ChakraNextLink';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';

const inputs = [
  {
    label: 'Project Name',
    name: 'projectName',
    type: 'text',
    placeholder: 'Project Name',
  },
  {
    label: 'Website URL',
    name: 'websiteURL',
    type: 'text',
    placeholder: 'Website URL',
  },
  {
    label: 'Github URL',
    name: 'githubURL',
    type: 'text',
    placeholder: 'Github URL',
  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    placeholder: 'Description',
  },
];

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
    name: 'results',
  },
];

const roleOptions = [
  { value: 'SMART_CONTRACTS', label: 'Wizard (Smart Contracts)' },
  { value: 'FRONTEND_DEV', label: 'Warrior (Frontend Dev)' },
  { value: 'Rogue', label: 'Rogue' },
  { value: 'Ranger', label: 'Ranger' },
  { value: 'Cleric', label: 'Cleric' },
  { value: 'Bard', label: 'Bard' },
  { value: 'Druid', label: 'Druid' },
  { value: 'Paladin', label: 'Paladin' },
  { value: 'Archer', label: 'Archer' },
  { value: 'Necromancer (Dev Ops)', label: 'Necromancer (Dev Ops)' },
  { value: 'Hunter', label: 'Hunter' },
  { value: 'Monk', label: 'Monk' },
];

const ShippingStation = () => {
  const localForm = useForm();
  const { watch, reset } = localForm;

  // a function that returns the square root of a number
  // const sqrt = (x) => Math.sqrt(x);

  // // a function that returns a random element of an array
  // const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const clearData = () => {
    reset();
  };

  async function submitData() {
    // try {
    //   const { data, error } = await supabase.from('PortfolioContent').insert([
    //     {
    //       project_name: projectName,
    //       website_url: websiteURL,
    //       github_url: githubURL,
    //       description: description,
    //       image_url: imagePath,
    //       relevant_services: raidTags,
    //       raiders: raiderRoles,
    //       challenge: { body: challenge },
    //       approach: { body: approach },
    //       result: { body: results },
    //     },
    //   ]);
    //   if (!error) {
    //     toast.success('Data submitted successfully!');
    //     clearData();
    //   }
    //   if (error) {
    //     toast((t) => (
    //       <>
    //         <div>
    //           <p style={{ fontWeight: `700`, color: `red` }}>There was an error submitting your data.</p>
    //           <p>Code: {error?.code}</p>
    //           <p>Reason: {error?.message}</p>
    //           <Button onClick={() => toast.dismiss(t.id)}>Dismiss</Button>
    //         </div>
    //       </>
    //     ));
    //     throw error;
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }

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
        <Input label='Website URL' name='websiteUrl' localForm={localForm} />
        <Input label='Github:' name='githubUrl' localForm={localForm} />
        <Input label='Description:' name='description' localForm={localForm} />
        {/* Image */}
        <VStack alignItems='flex-start' width='100%'>
          <Text size='md'>Image:</Text>
          <ChakraInput
            borderColor='primary.500'
            w='100%'
            // onChange={(event) => handleImage(event.target.files[0])}
            type='file'
          />
          {/* {watch('image') && <Image src={imagePath} width='128px' height='128px' margin='1rem auto=' />} */}
        </VStack>
        {/* Applicable Services */}
        <VStack alignItems='flex-start' width='100%'>
          <Text size='md'>Applicable Services:</Text>
          <Text size='sm'>Separate Tags with Commas ,</Text>
          <Card
            as={Flex}
            border='1px solid'
            borderColor='primary.500'
            padding='2rem'
            width='100%'
            flexWrap='wrap'
            gap='1rem'>
            {(watch('tags') || []).length > 0 &&
              watch('tags').map((tag: any) => {
                return (
                  <Flex
                    bg='red'
                    padding='1rem 0.5rem'
                    width='fit-content'
                    whiteSpace='nowrap'
                    gap='0.5rem'
                    alignItems='center'
                    _hover={{ backgroundColor: `purple`, color: `white` }}
                    key={tag.tag}>
                    {tag.tag}
                    <IconButton
                      icon={<Icon as={AiOutlineClose} />}
                      // onClick={() => removeTag(index)}
                      aria-label='Close'
                    />
                  </Flex>
                );
              })}
            <Input label='Tags' name='tags' localForm={localForm} />
          </Card>
        </VStack>
        {/* Raiders */}
        <VStack alignItems='flex-start' width='100%'>
          <Text size='md'>Contributors:</Text>
          {(watch('raiderRole') || []).map((raider: any) => {
            return (
              <Grid key={raider.id} width='100%' gridTemplateColumns='4fr 4fr 1fr' gap='2rem'>
                <Select name='raiderRole' localForm={localForm} options={roleOptions} />

                <IconButton
                  icon={<Icon as={AiOutlineClose} />}
                  // onClick={() => removeRaider()}
                  aria-label='Close'
                />
              </Grid>
            );
          })}
          <Button
            variant='blackRedBorder'
            // onClick={() => addNewRaider()}
          >
            Add Raider
          </Button>
        </VStack>
        {questions.map((question) => (
          <Stack key={question.label}>
            <Textarea label={question.label} name={question.name} localForm={localForm} />
            <Text fontSize='0.8rem'>
              This textarea accepts{' '}
              <Link href='https://daringfireball.net/projects/markdown/basics' isExternal>
                markdown
              </Link>
            </Text>
          </Stack>
        ))}

        <Button onClick={() => submitData()}>Ship Project</Button>
      </VStack>
    </CMSPageTemplate>
  );
};

export default ShippingStation;

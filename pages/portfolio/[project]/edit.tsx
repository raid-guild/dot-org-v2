import { useState, useEffect, useContext } from 'react';
import { Box, HStack, VStack, Heading, Text, Image, Input, Select, Button, Textarea } from '@raidguild/design-system';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm } from 'react-hook-form';

import Link from '../../../components/atoms/ChakraNextLink';
import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
// import supabase from '../../../shared/Supabase';
// import RaiderRoleSelect from '../../../components/page-components/RaiderRoleSelect';

// import RouteProtector from '../../../components/page-components/RouteProtector';
// import ProtectedRouteWarning from '../../../components/page-components/ProtectedRouteWarning';

interface Props {
  project: any;
}

const PortfolioPage = ({ project }: Props) => {
  const localForm = useForm();

  const [isValidated, setIsValidated] = useState(false);

  // TODO implement user feedback about imageStatus

  const submitData = () => {
    // try {
    //   const { data, error } = await supabase.from('PortfolioContent').insert(
    //     [
    //       {
    //         id: thisProject?.id,
    //         project_name: projectName,
    //         website_url: websiteURL,
    //         github_url: githubURL,
    //         description: description,
    //         image_url: imagePath,
    //         relevant_services: raidTags,
    //         raiders: raiderRoles,
    //         challenge: { body: challenge },
    //         approach: { body: approach },
    //         result: { body: results },
    //       },
    //     ],
    //     { upsert: true },
    //   );
    //   if (error) {
    //     toast.error('Error updating project data');
    //     throw error;
    //   }
    //   if (data) {
    //     toast.success('Project data updated');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };
  // const handleRaidTagKeyDown = (event) => {
  //   if (event.code == 'Comma' || event.code == 'Tab') {
  //     event.preventDefault();
  //     addTag();
  //   }
  //   if (event.code == 'Backspace' && raidTagInput == '') {
  //     removeTag(raidTags.length - 1);
  //   }
  // };
  // const addTag = () => {
  //   let newTag = { tag: raidTagInput };
  //   setRaidTags([...raidTags, newTag]);
  //   setRaidTagInput('');
  // };
  // const removeTag = (index) => {
  //   let data = [...raidTags];
  //   data.splice(index, 1);
  //   setRaidTags([...data]);
  // };
  // const handleRaiderNameChange = (index, event) => {
  //   let data = [...raiderRoles];
  //   data[index]['raider'] = event.target.value;
  //   setRaiderRoles(data);
  // };
  // const editRaiderRole = (value, index) => {
  //   let data = [...raiderRoles];
  //   data[index]['role'] = value;
  //   setRaiderRoles(data);
  // };
  // const addNewRaider = () => {
  //   let newRaider = { raider: '', role: '' };
  //   setRaiderRoles([...raiderRoles, newRaider]);
  // };
  // const removeRaider = (index) => {
  //   let data = [...raiderRoles];
  //   data.splice(index, 1);
  //   setRaiderRoles(data);
  // };

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
    <CMSPageTemplate>
      {/* <RouteProtector setter={setIsValidated} /> */}
      {/* {!isValidated && <ProtectedRouteWarning />} */}
      {isValidated && (
        <>
          <PageTitle title='Edit Shipped Project' />
          <VStack margin='0 auto' paddingBottom='2rem'>
            {/* Project Name */}
            <Input label='Project Name' name='name' localForm={localForm} />
            {/* Website Url */}
            <Input label='Website URL' name='websiteUrl' localForm={localForm} />
            {/* Github Url */}
            <Input label='Github URL' name='githubUrl' localForm={localForm} />
            {/* Description */}
            <Input label='Briefly Describe the Project' name='description' localForm={localForm} />
            {/* Image */}
            <VStack align='flex-start' w='100%'>
              <Text size='md'>Image:</Text>
              {/* <Input borderColor='primary.500' w='100%' onChange={(event) => handleImage(event.target.files[0])} type='file' />
              {imagePath && <Image src={imagePath} maxWidth='250px' />} */}
            </VStack>
            {/* Applicable Services */}
            {/* <VStack
                align='flex-start'
                width='100%'
              >
              <Text size='md'>Applicable Services:</Text>
              <Text size='sm>Separate Tags with Commas ,</Text>
              <Card
                as={Flex}
                  padding='2rem'
                  borderRadius='2px'
                  width='100%'
                  flexWrap='wrap'
                  gap='1rem'
                }}>
                {raidTags.length > 0 &&
                  raidTags.map((tag, index) => {
                    return (
                      <Badge
                        _hover={{ backgroundColor: `purple`, color: `white` }}
                        key={index}>
                        {tag.tag}
                        <CloseIcon onClick={() => removeTag(index)} _hover={{ cursor: `pointer` }} />
                      </Badge>
                    );
                  })}
                <Input
                  // inp
                  value={raidTagInput}
                  onChange={(event) => setRaidTagInput(event.target.value)}
                  onKeyDown={(event) => handleRaidTagKeyDown(event)}
                />
              </Card>
            </VStack> */}
            {/* Raiders */}
            {/* <VStack

                alignItems='flex-start'
                width='100%'
              }}>
              <Text size='lg'>Contributors:</Text>
              {raiderRoles.map((raider, index) => {
                return (
                  <Grid
                    key={index}
                    width='100%'
                    gridTemplateColumns='4fr 4fr 1fr'
                    gap='2rem'
                    >
                    <RaiderRoleSelect
                      value={raider.role}
                      index={index}
                      editRaiderRole={(value) => editRaiderRole(value, index)}
                    />
                    <Input
                      borderColor='primary.500'
                      w='100%'
                      name='raider'
                      placeholder='Raider:'
                      value={raider.raider}
                      onChange={(event) => handleRaiderNameChange(index, event)}
                    />
                    <Button>
                      <CloseIcon color='primary.500' onClick={() => removeRaider()} />
                    </Button>
                  </Box>
                );
              })}
              <Button
                variant='blackRedBorder'
                onClick={() => addNewRaider()}>
                Add Raider
              </Button>
            </VStack> */}
            {/* Challenge */}
            {/* <VStack
                align='flex-start'
                width='100%'
              >
              <Text>The Challenge:</Text>
              <Text size='sm'>
                This textarea accepts{' '}
                <Link href='https://daringfireball.net/projects/markdown/basics' target='_blank' rel='noreferrer'>
                  markdown
                </Link>
              </Text>
              <Textarea
                borderColor='primary.500'
                w='100%'
                value={challenge}
                onChange={(event) => setChallenge(event.target.value)}
              />
            </VStack> */}
            {/* Challenge */}
            {/* <VStack
                align='flex-start'
                width='100%'>
              <Text>Our Approach</Text>
              <Text size='sm'>
                This textarea accepts{' '}
                <Link href='https://daringfireball.net/projects/markdown/basics' target='_blank' rel='noreferrer'>
                  markdown
                </Link>
              </Text>

              <Textarea
                borderColor='primary.500'
                w='100%'
                value={approach}
                onChange={(event) => setApproach(event.target.value)}
              />
            </VStack> */}
            {/* Results */}
            {/* <VStack
                align='flex-start'
                width='100%'
              >
              <Text size='md'>Results:</Text>
              <Text size='sm'>This textarea accepts markdown</Text>
              <Textarea
                borderColor='primary.500'
                w='100%'
                value={results}
                onChange={(event) => setResults(event.target.value)}
              />
            </VStack> */}
            <HStack>
              <Button onClick={submitData} variant='outline'>
                Save Changes
              </Button>
              <Button>Delete Content</Button>
            </HStack>
          </VStack>
        </>
      )}
    </CMSPageTemplate>
  );
};

export default PortfolioPage;
// export async function getStaticPaths() {
//   try {
//     const { data } = await supabase.from('PortfolioContent').select('project_name');
//     const paths = data.map((project) => {
//       return { params: { project: `${project?.project_name}/edit` } };
//     });
//     return {
//       paths,
//       fallback: true,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }

// This function gets called at build time
// export async function getStaticProps(params) {
//   console.log({ params });
//   const project = params.params.project;
//   // Call an external API endpoint to get posts
//   const res = await supabase.from('PortfolioContent').select('*').eq('project_name', project);

//   return {
//     props: {
//       project: res,
//     },
//   };
// }

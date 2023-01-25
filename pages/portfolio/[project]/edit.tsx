import _ from 'lodash';
import { HStack, VStack, Input, Button, Textarea } from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';

// import Link from '../../../components/atoms/ChakraNextLink';
import ImageUpload from '../../../components/atoms/ImageUpload';
import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import usePortfolioDetail from '../../../hooks/usePortfolioDetail';

// import RaiderRoleSelect from '../../../components/page-components/RaiderRoleSelect';

const sections = [
  {
    label: 'The Challenge',
    placeholder: 'Elaborate about the challenge the client was facing and what they were really looking to get done.',
    name: 'challenge',
  },
  {
    label: 'Our Approach',
    placeholder: 'Describe how we navigated delivering a solution to get after the challenge',
    name: 'approach',
  },
  { label: 'The Result', placeholder: 'Review how the approach solved the challenge', name: 'result' },
];

interface Props {
  project: any;
}

const PortfolioPage = ({ project }: Props) => {
  const { data: session } = useSession();
  const token = _.get(session, 'token');
  const { data: portfolioProject } = usePortfolioDetail({ slug: project, token });
  console.log(portfolioProject);
  // const { mutateAsync } = usePortfolioUpdate();
  const localForm = useForm();

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

  return (
    <CMSPageTemplate>
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
        <ImageUpload localForm={localForm} />
        {/* Applicable Services */}
        {/* <Select name='services' options={categories} localForm={localForm} /> */}
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
        {sections.map((section) => (
          <Textarea label={section.label} name={section.name} localForm={localForm} key={section.label} />
        ))}
        <HStack>
          <Button onClick={submitData} variant='outline'>
            Save Changes
          </Button>
          <Button>Delete Content</Button>
        </HStack>
      </VStack>
    </CMSPageTemplate>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const project = _.get(context, 'params.project');

  return { props: { project: '' } };
};

export default PortfolioPage;

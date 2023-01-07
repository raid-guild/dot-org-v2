// import { useState, useEffect } from 'react';
import { Flex, VStack, Text, Textarea, Input, Button, Image, Stack } from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
// import { Web3Storage } from 'web3.storage';

import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
// import supabase from '../../shared/Supabase';

interface Props {
  post: any;
}

function Publish({ post }: Props) {
  const localForm = useForm();
  const { reset } = localForm;
  // const [postTitle, setPostTitle] = useState('');
  // const [authorName, setAuthorName] = useState('');
  // const [description, setDescription] = useState('');
  // const [imagePath, setImagePath] = useState('');
  // const [postTagInput, setPostTagInput] = useState('');
  // const [postTags, setPostTags] = useState([]);
  // const [content, setContent] = useState('');

  function clearData() {
    reset();
  }

  async function submitData() {
    // try {
    //   const { data, error } = await supabase.from('BlogContent').insert([
    //     {
    //       post_title: postTitle,
    //       author_name: authorName,
    //       description: description,
    //       hero_image: imagePath,
    //       tags: postTags,
    //       content: { body: content },
    //     },
    //   ]);
    //   if (error) {
    //     throw error;
    //   }
    //   if (!error) {
    //     clearData();
    //   }
    // } catch (error) {
    //   console.error(error);
    //   clearData();
    // }
  }

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

  // const handleTagKeydown = (event) => {
  //   if (event.code == 'Comma' || event.code == 'Tab' || event.code == 'Enter') {
  //     event.preventDefault();
  //     addTag();
  //   }
  //   if (event.code == 'Backspace') {
  //     removeTag(postTags.length - 1);
  //   }
  // };
  // const addTag = () => {
  //   let newTag = { tag: postTagInput };
  //   setPostTags([...postTags, newTag]);
  //   setPostTagInput('');
  // };
  // const removeTag = (index) => {
  //   let data = [...postTags];
  //   data.splice(index, 1);
  //   setPostTags([...data]);
  // };

  return (
    <CMSPageTemplate>
      <PageTitle title='Create Post' />
      <VStack width='60vw' mx='auto' pb='2rem'>
        {/* Post Name */}
        <Input label='Post Title' name='title' localForm={localForm} />
        {/* Author Name */}
        <Input label='Author Name' name='authorName' localForm={localForm} />
        {/* Description */}
        <Input label='Brief Summary' name='description' localForm={localForm} />
        {/* Image */}
        {/* <VStack
            align='flex-start'
            width='100%'
          >
          <Text size='lg'>Hero Image:</Text>
          <Input borderColor='primary.500' w='100%' onChange={(event) => handleImage(event.target.files[0])} type='file' />
          {imagePath && <Image src={imagePath} />}
        </VStack> */}
        {/* Tags */}
        <VStack alignItems='flex-start' width='100%'>
          <Text size='lg'>Post Tags:</Text>
          <Text size='sm'>Separate Tags with Commas ,</Text>
          <Flex
            border='1px solid'
            borderColor='primary.500'
            padding='2rem'
            borderRadius='8px'
            width='100%'
            flexWrap='wrap'
            gap='1rem'>
            {/* {postTags.length > 0 &&
              postTags.map((tag, index) => {
                return (
                  <Flex
                    backgroundColor: `primary.500`,
                    padding='1rem 0.5rem'
                    width='fit-content'
                    whiteSpace='nowrap'
                    gap='0.5rem'
                    alignItems='center'
                    _hover={{ backgroundColor: `purple`, color: `white` }}
                    key={index}>
                    {tag.tag}
                    <CloseIcon onClick={() => removeTag(index)} _hover={{ cursor: `pointer` }} />
                  </Flex>
                );
              })} */}
            {/* <Input
              variant='flushed'
              value={postTagInput}
              onChange={(event) => setPostTagInput(event.target.value)}
              onKeyDown={(event) => handleTagKeydown(event)}
            /> */}
          </Flex>
        </VStack>
        {/* Results */}
        <Stack>
          <Textarea label='Post' name='content' localForm={localForm} />
          <Text size='sm'>This textarea accepts markdown</Text>
        </Stack>

        <Button onClick={() => submitData()}>Send Post</Button>
      </VStack>
    </CMSPageTemplate>
  );
}

export default Publish;

import CMSPageTemplate from "../../components/page-templates/CMSPageTemplate";
import PageTitle from "../../components/page-components/PageTitle";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  Textarea,
  Input,
  InputGroup,
  Select,
  Button,
  Image,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Web3Storage } from "web3.storage";
import supabase from "../../shared/Supabase";

export default function Publish(props) {
  const [postTitle, setPostTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [postTagInput, setPostTagInput] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [content, setContent] = useState("");

  function clearData() {
    setPostTitle("");
    setAuthorName("");
    setDescription("");
    setImagePath("");
    setPostTagInput("");
    setPostTags([]);
    setContent("");
  }

  async function submitData() {
    try {
        const { data, error } = await supabase.from("BlogContent").insert([
          {
            post_title: postTitle,
            author_name: authorName,
            description: description,
            hero_image: imagePath,
            tags: postTags,
            content: {body: content},
          },
        ]);
        if (error) {
          throw error;
        }
        if (!error) {
          clearData();
        }
      } catch (error) {
        console.error(error);
        clearData();
      }
  }

  const handleImage = async (file) => {
    console.log(file);
    const response = await addImage(file);
    if (response?.cid) {
      try {
        let imageUrl = `https://${response?.cid}.ipfs.w3s.link/${file.name}`;
        setImagePath(imageUrl);
      } catch (error) {
        console.error({ error });
      }
    }
  };

  async function addImage(file) {
    try {
      const client = new Web3Storage({
        token: process.env.NEXT_PUBLIC_WEB3STORAGE_KEY,
      });
      const cid = await client.put([file]);
      return { cid };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  const handleTagKeydown = (event) => {
    if (event.code == "Comma" || event.code == "Tab" || event.code == "Enter") {
      event.preventDefault();
      addTag();
    }
    if (event.code == "Backspace") {
      removeTag(postTags.length - 1);
    }
  };
  const addTag = () => {
    let newTag = { tag: postTagInput };
    setPostTags([...postTags, newTag]);
    setPostTagInput("");
  };
  const removeTag = (index) => {
    let data = [...postTags];
    data.splice(index, 1);
    setPostTags([...data]);
  };

  return (
    <CMSPageTemplate>
      <PageTitle title="Create Post" />
      <VStack sx={{ width: `60vw`, margin: `0 auto`, paddingBottom: `2rem` }}>
        {/* Post Name */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Post Title:</Text>
          <Input
            borderColor="red"
            w="100%"
            value={postTitle}
            onChange={(event) => setPostTitle(event.target.value)}
          />
        </VStack>
        {/* Author Name */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Author Name:</Text>
          <Input
            borderColor="red"
            w="100%"
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
          />
        </VStack>
        {/* Description */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Brief Summary:</Text>
          <Input
            borderColor="red"
            w="100%"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </VStack>
        {/* Image */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Hero Image:</Text>
          <Input
            borderColor="red"
            w="100%"
            onChange={(event) => handleImage(event.target.files[0])}
            type="file"
          />
          {imagePath && <Image src={imagePath} />}
        </VStack>
        {/* Tags */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Post Tags:</Text>
          <Text sx={{ fontSize: `0.8rem` }}>Separate Tags with Commas ,</Text>
          <Box
            sx={{
              border: `1px solid black`,
              borderColor: `red`,
              padding: `2rem`,
              borderRadius: `8px`,
              width: `100%`,
              display: `flex`,
              flexWrap: `wrap`,
              gap: `1rem`,
            }}
          >
            {postTags.length > 0 &&
              postTags.map((tag, index) => {
                return (
                  <Box
                    sx={{
                      backgroundColor: `red`,
                      padding: `1rem 0.5rem`,
                      width: `fit-content`,
                      whiteSpace: `nowrap`,
                      display: `flex`,
                      gap: `0.5rem`,
                      alignItems: `center`,
                    }}
                    _hover={{ backgroundColor: `purple`, color: `white` }}
                    key={index}
                  >
                    {tag.tag}
                    <CloseIcon
                      onClick={() => removeTag(index)}
                      _hover={{ cursor: `pointer` }}
                    />
                  </Box>
                );
              })}
            <Input
              variant="flushed"
              value={postTagInput}
              onChange={(event) => setPostTagInput(event.target.value)}
              onKeyDown={(event) => handleTagKeydown(event)}
            />
          </Box>
        </VStack>
        {/* Results */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Post:</Text>
          <Text sx={{ fontSize: `0.8rem` }}>
            This textarea accepts markdown
          </Text>
          <Textarea
            borderColor="red"
            w="100%"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </VStack>
        <Button
          backgroundColor="black"
          sx={{
            color: `red`,
            backgroundColor: `darkBlack`,
            borderColor: `red`,
          }}
          onClick={() => submitData()}
        >
          Send Post
        </Button>
      </VStack>
    </CMSPageTemplate>
  );
}

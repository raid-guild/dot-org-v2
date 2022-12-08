import CMSPageTemplate from "../../../components/page-templates/CMSPageTemplate";
import PageTitle from "../../../components/page-components/PageTitle";
import { useRouter } from "next/router";
import supabase from "../../../shared/Supabase";
import { useState, useEffect, useContext } from "react";
import {
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  Image,
  Input,
  Select,
  Button,
  Link,
  Textarea,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { containerWidth } from "../../../themes/variables";
import toast from "react-hot-toast";
import RaiderRoleSelect from "../../../components/page-components/RaiderRoleSelect";
import { AppContext } from "../../../context/AppContext";
import RouteProtector from "../../../components/page-components/RouteProtector";
import ProtectedRouteWarning from "../../../components/page-components/ProtectedRouteWarning";

export default function PortfolioPage({ project }) {
  const context = useContext(AppContext);
  
  const [isValidated, setIsValidated] = useState(context.isMember);

  const thisProject = project?.data[0];
  const [projectName, setProjectName] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  //todo: implement user feedback about imageStatus
  const [imageStatusMessage, setImageStatusMessage] = useState("");
  const [raidTagInput, setRaidTagInput] = useState("");
  const [raidTags, setRaidTags] = useState([]);
  const [challenge, setChallenge] = useState("");
  const [approach, setApproach] = useState("");
  const [results, setResults] = useState("");
  const [raiderRoles, setRaiderRoles] = useState([{ raider: "", role: "" }]);

  useEffect(() => {
    if (thisProject?.project_name) {
      // assuming all data available
      setProjectName(thisProject?.project_name);
      setWebsiteURL(thisProject?.website_url);
      setGithubURL(thisProject?.github_url);
      setDescription(thisProject?.description);
      setImagePath(thisProject?.image_url);
      setRaidTags(thisProject?.relevant_services);
      setRaiderRoles(thisProject?.raiders);
      setChallenge(thisProject?.challenge?.body);
      setApproach(thisProject?.approach?.body);
      setResults(thisProject?.result?.body);
      toast.success("Project data loaded");
    }
  }, [thisProject]);

  async function submitData() {
    try {
      const { data, error } = await supabase.from("PortfolioContent").insert(
        [
          {
            id: thisProject?.id,
            project_name: projectName,
            website_url: websiteURL,
            github_url: githubURL,
            description: description,
            image_url: imagePath,
            relevant_services: raidTags,
            raiders: raiderRoles,
            challenge: { body: challenge },
            approach: { body: approach },
            result: { body: results },
          },
        ],
        { upsert: true }
      );
      if (error) {
        toast.error("Error updating project data");
        throw error;
      }
      if (data) {
        toast.success("Project data updated");
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleRaidTagKeyDown = (event) => {
    if (event.code == "Comma" || event.code == "Tab") {
      event.preventDefault();
      addTag();
    }
    if (event.code == "Backspace" && raidTagInput == "") {
      removeTag(raidTags.length - 1);
    }
  };
  const addTag = () => {
    let newTag = { tag: raidTagInput };
    setRaidTags([...raidTags, newTag]);
    setRaidTagInput("");
  };
  const removeTag = (index) => {
    let data = [...raidTags];
    data.splice(index, 1);
    setRaidTags([...data]);
  };
  const handleRaiderNameChange = (index, event) => {
    let data = [...raiderRoles];
    data[index]["raider"] = event.target.value;
    setRaiderRoles(data);
  };
  const editRaiderRole = (value, index) => {
    let data = [...raiderRoles];
    data[index]["role"] = value;
    setRaiderRoles(data);
  };
  const addNewRaider = () => {
    let newRaider = { raider: "", role: "" };
    setRaiderRoles([...raiderRoles, newRaider]);
  };
  const removeRaider = (index) => {
    let data = [...raiderRoles];
    data.splice(index, 1);
    setRaiderRoles(data);
  };

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

  return (
    <CMSPageTemplate>
      <RouteProtector setter={setIsValidated} />
      {!isValidated && <ProtectedRouteWarning />}
      {isValidated && (<>
      <PageTitle title="Edit Shipped Project" />
      <VStack
        sx={{
          width: containerWidth,
          margin: `0 auto`,
          paddingBottom: `2rem`,
        }}
      >
        {/* Project Name */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Project Name:</Text>
          <Input
            borderColor="red"
            w="100%"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
          />
        </VStack>
        {/* Website Url */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Website URL:</Text>
          <Input
            borderColor="red"
            w="100%"
            value={websiteURL}
            onChange={(event) => setWebsiteURL(event.target.value)}
          />
        </VStack>
        {/* Github Url */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Github URL:</Text>
          <Input
            borderColor="red"
            w="100%"
            value={githubURL}
            onChange={(event) => setGithubURL(event.target.value)}
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
          <Text sx={{ fontSize: `1.3rem` }}>Briefly Describe the Project:</Text>
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
          <Text sx={{ fontSize: `1.3rem` }}>Image:</Text>
          <Input
            borderColor="red"
            w="100%"
            onChange={(event) => handleImage(event.target.files[0])}
            type="file"
          />
          {imagePath && <Image src={imagePath} sx={{maxWidth: `250px`}}/>}
        </VStack>
        {/* Applicable Services */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Applicable Services:</Text>
          <Text sx={{ fontSize: `0.8rem` }}>Separate Tags with Commas ,</Text>
          <Box
            sx={{
              border: `1px solid black`,
              borderColor: `red`,
              padding: `2rem`,
              borderRadius: `2px`,
              width: `100%`,
              display: `flex`,
              flexWrap: `wrap`,
              gap: `1rem`,
            }}
          >
            {raidTags.length > 0 &&
              raidTags.map((tag, index) => {
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
              value={raidTagInput}
              onChange={(event) => setRaidTagInput(event.target.value)}
              onKeyDown={(event) => handleRaidTagKeyDown(event)}
            />
          </Box>
        </VStack>
        {/* Raiders */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Contributors:</Text>
          {raiderRoles.map((raider, index) => {
            return (
              <Box
                key={index}
                sx={{
                  width: `100%`,
                  display: `grid`,
                  gridTemplateColumns: `4fr 4fr 1fr`,
                  gap: `2rem`,
                }}
              >
                <RaiderRoleSelect value={raider.role} index={index} editRaiderRole={(value) => editRaiderRole(value, index)} />
                <Input
                  borderColor="red"
                  w="100%"
                  name="raider"
                  placeholder="Raider:"
                  value={raider.raider}
                  onChange={(event) => handleRaiderNameChange(index, event)}
                />
                <Button>
                  <CloseIcon
                    sx={{ color: `red` }}
                    onClick={() => removeRaider()}
                  />
                </Button>
              </Box>
            );
          })}
          <Button
            backgroundColor="black"
            sx={{
              color: `red`,
              backgroundColor: `darkBlack`,
              borderColor: `red`,
            }}
            onClick={() => addNewRaider()}
          >
            Add Raider
          </Button>
        </VStack>
        {/* Challenge */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>The Challenge:</Text>
          <Text sx={{ fontSize: `0.8rem` }}>
            This textarea accepts{" "}
            <Link
              href="https://daringfireball.net/projects/markdown/basics"
              target="_blank"
              rel="noreferrer"
            >
              markdown
            </Link>
          </Text>
          <Textarea
            borderColor="red"
            w="100%"
            value={challenge}
            onChange={(event) => setChallenge(event.target.value)}
          />
        </VStack>
        {/* Challenge */}
        <VStack
          sx={{
            color: `white`,
            alignItems: `flex-start`,
            fontFamily: `texturina`,
            width: `100%`,
          }}
        >
          <Text sx={{ fontSize: `1.3rem` }}>Our Approach</Text>
          <Text sx={{ fontSize: `0.8rem` }}>
            This textarea accepts{" "}
            <Link
              href="https://daringfireball.net/projects/markdown/basics"
              target="_blank"
              rel="noreferrer"
            >
              markdown
            </Link>
          </Text>

          <Textarea
            borderColor="red"
            w="100%"
            value={approach}
            onChange={(event) => setApproach(event.target.value)}
          />
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
          <Text sx={{ fontSize: `1.3rem` }}>Results:</Text>
          <Text sx={{ fontSize: `0.8rem` }}>
            This textarea accepts markdown
          </Text>
          <Textarea
            borderColor="red"
            w="100%"
            value={results}
            onChange={(event) => setResults(event.target.value)}
          />
        </VStack>
        <HStack>
        <Button
          backgroundColor="black"
          sx={{
            color: `white`,
            backgroundColor: `red`,
            borderColor: `red`,
            border: `1px solid`
          }}
          _hover={{
            backgroundColor: `blackDark`,
          }}
          onClick={() => submitData()}
        >
          Save Changes
        </Button>
        <Button
          backgroundColor="black"
          sx={{
            color: `red`,
            backgroundColor: `blackDark`,
            border: `1px solid black`,
            borderColor: `red`,
          }}
          onClick={() => deleteItem()}
        >
          Delete Content
        </Button>
        </HStack>
      </VStack>
      </>)}
    </CMSPageTemplate>
  );
}

export async function getStaticPaths() {
  try {
    const { data } = await supabase
      .from("PortfolioContent")
      .select("project_name");
    const paths = data.map((project) => {
      return { params: { project: `${project?.project_name}/edit` } };
    });
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.log(error);
  }
}

// This function gets called at build time
export async function getStaticProps(params) {
  console.log({ params });
  const project = params.params.project;
  // Call an external API endpoint to get posts
  const res = await supabase
    .from("PortfolioContent")
    .select("*")
    .eq("project_name", project);

  return {
    props: {
      project: res,
    },
  };
}

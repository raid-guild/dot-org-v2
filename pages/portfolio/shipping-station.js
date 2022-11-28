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
import keccak256 from "keccak256";
import { Web3Storage } from "web3.storage";
import supabase from "../../shared/Supabase";

export default function ShippingStation(props) {
  const [projectName, setProjectName] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [imageStatusMessage, setImageStatusMessage] = useState("");
  const [raidTagInput, setRaidTagInput] = useState("");
  const [raidTags, setRaidTags] = useState([]);
  const [challenge, setChallenge] = useState("");
  const [approach, setApproach] = useState("");
  const [results, setResults] = useState("");
  const [raiderRoles, setRaiderRoles] = useState([{ raider: "", role: "" }]);

  function clearData() {
    setProjectName("");
    setWebsiteURL("");
    setGithubURL("");
    setImagePath("");
    setRaidTags([]);
    setRaiderRoles([{}]);
    setChallenge("");
    setApproach("");
    setResults("");
  }

  async function submitData() {
    try {
      const { data, error } = await supabase.from("PortfolioContent").insert([
        {
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
  const editRaiderRole = (event, index) => {
    let data = [...raiderRoles];
    data[index]["role"] = event.target.value;
    setRaiderRoles(data);
  }
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
      <PageTitle title="Create Shipped Product" />
      <VStack sx={{ width: `60vw`, margin: `0 auto`, paddingBottom: `2rem` }}>
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
          {imagePath && <Image src={imagePath} />}
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
              borderRadius: `8px`,
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
                <Select sx={{ borderColor: `red` }} onChange={(event) => editRaiderRole(event, index)}>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value=""
                  >
                    Role:
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Cleric"
                  >
                    Cleric (Account Manager)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Scribe"
                  >
                    Scribe (Content Creator)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Monk"
                  >
                    Monk (Project Manager)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Ranger"
                  >
                    Ranger (UX Designer)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Tavern Keeper"
                  >
                    Tavern Keeper (Community Manager)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Alchemist"
                  >
                    Alchemist (DAO Consultant)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Hunter"
                  >
                    Hunter (Business Development)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Rogue"
                  >
                    Rogue (Legal Engineer)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Warrior"
                  >
                    Warrior (Front End Developer)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Paladin"
                  >
                    Paladin (Back End Developer)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Archer"
                  >
                    Archer (Visual Designer)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Necromancer"
                  >
                    Necromancer (Dev Ops)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Druid"
                  >
                    Druid (Data Science)
                  </option>
                  <option
                    style={{
                      backgroundColor: `rgba(10, 10, 10, 0.960784)`,
                      color: `#ff3864`,
                    }}
                    value="Wizard"
                  >
                    Wizard (Smart Contract Developer)
                  </option>
                </Select>
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
        <Button
            backgroundColor="black"
            sx={{
              color: `red`,
              backgroundColor: `darkBlack`,
              borderColor: `red`,
            }}
            onClick={() => submitData()}
          >
            Ship Project
          </Button>
      </VStack>
    </CMSPageTemplate>
  );
}

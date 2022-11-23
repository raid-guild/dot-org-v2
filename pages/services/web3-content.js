import ServicePageTemplate from "../../components/page-templates/ServicePageTemplate";
import { Box } from "@chakra-ui/react";
import supabase from "../../shared/Supabase";
import ProjectCard from "../../components/page-components/ProjectCard";


export default function Page({ data }) {
  return (
    <>
      <ServicePageTemplate
        pageTitle={"Web3 Content"}
        pageDescription={PageDescription}
        roleImage={RoleImage}
        salesContent={SalesContent}
      >
        <Box sx={{ display: `flex`, flexDirection: `column` }}>
          {data?.length > 0 && (
            <Box sx={{ display: `grid`, gridTemplateColumns: `1fr 1fr 1fr` }}>
              {data.map((item, index) => {
                return <ProjectCard project={item} key={index} />;
              })}
            </Box>
          )}
        </Box>
      </ServicePageTemplate>
    </>
  );
}

export async function getServerSideProps(context) {
  let response = await supabase
    .from("PortfolioContent")
    .select("*")
    .in("relevant_services", [{ tag: "Content" }])
    .range(0, 2);

  if (response.data == null) {
    response = await supabase.from("PortfolioContent").select("*").range(0, 2);
  }

  return {
    props: { data: response.data },
  };
}

const PageDescription = `In a world where attention is a *commodity,* content creation matters.

A good story is the best way to "sell" your product. People identify with strong brands. Your project's story is what makes it feel human.

Your product might work so well that it's life-changing. If nobody hears your brand's story, then it doesn't matter. Your community will never grow to its full potential.

Your users want to hear your project's newest updates. A good piece of content updates your community on what you've been working on.

If all people hear from you is silence, they'll assume that your project is stagnant. Your community will be confused.`;

const RoleImage = "/assets/characters/scribe.svg";

const SalesContent = `We can get your story in front of your community and onboard new members who align with your project! 

Content should be fun and engaging. Web3 is a place for the adventurous. It's new technology that requires a fresh approach.

We'll distribute your content over multiple platforms, or even as “purchasable” as NFTs. (but that might not be helpful if your content isn’t reaching the right eyeballs!!) 

Our content specialist’s will guide you through the dark forest of Web3. Let us bring you better community engagement. 

Book an appointment with us today.`;

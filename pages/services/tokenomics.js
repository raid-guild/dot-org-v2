import ServicePageTemplate from "../../components/page-templates/ServicePageTemplate";
import { Box } from "@chakra-ui/react";
import supabase from "../../shared/Supabase";
import ProjectCard from "../../components/page-components/ProjectCard";


export default function Page({ data }) {
  return (
    <>
      <ServicePageTemplate
        pageTitle={"Tokenomics"}
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
    .in("relevant_services", [{ tag: "Tokenomics" }])
    .range(0, 2);

  if (response.data == null) {
    response = await supabase.from("PortfolioContent").select("*").range(0, 2);
  }

  return {
    props: { data: response.data },
  };
}

const PageDescription = `Your project's "look" is the first impression your users get. A poor first impressions can damage your brand and cause users to leave your app.

People will call your project "unprofessional" or "sloppy."

Your project needs to be cohesive, sensible, and easy to understand. This can be the difference between your protocol being the next unicorn, or just another copy-pasta of Uniswap.`;

const RoleImage = "/assets/characters/archer.svg";

const SalesContent = `Raid Guild's visual designers have an eye for subtlety. We obsess over small details. We'll ensure your project has have a gorgeous, easy-to-use interface that aligns with your brand's image.

From when your users first land on your app, to when they connect their wallet, then send money to your smart contracts, the experience will be seamless. 

We'll use the most up-to-date technology to make sure your app not only looks great, but functions flawlessly too. Mobile, desktop, or tablet, your app will look great on any device.

Don't take our word for it! Look at some of the apps we've built and let our work speak for itself:
* BoredApes dot com
* BasedGhouls dot com
* (best looking UI we've built)

Let us handle UI design for you. Schedule a consultation now.`;

import ServicePageTemplate from "../../components/page-templates/ServicePageTemplate";
import { Box } from "@chakra-ui/react";
import supabase from "../../shared/Supabase";
import ProjectCard from "../../components/page-components/ProjectCard";

export default function Page({ data }) {

  return (
    <>
      <ServicePageTemplate
        pageTitle={"Community Management"}
        pageDescription={PageDescription}
        roleImage={RoleImage}
        salesContent={SalesContent}
      >
        <Box sx={{ display: `flex`, flexDirection: `column` }}>

          {data?.length > 0 && (<Box sx={{display: `grid`, gridTemplateColumns: `1fr 1fr 1fr`}}>
            {data.map((item, index) => {
              return (<ProjectCard project={item} key={index}/>)
            })}
          </Box>)}
        </Box>
      </ServicePageTemplate>
    </>
  );
}

export async function getServerSideProps(context) {
  let response = await supabase
    .from("PortfolioContent")
    .select("*")
    .in('relevant_services', [{tag: "Community Management"}])
    .range(0, 2);
  
  if (response.data == null) {
    response = await supabase
    .from("PortfolioContent")
    .select("*")
    .range(0, 2);
  }

  return {
    props: { data: response.data},
  };
}

const PageDescription = `Do you know how to keep your community engaged?

With a passionate community, your users will do the “selling” for you. Your users should be spreading the word on your behalf.

Projects like Bitcoin and Ethereum grew quickly because of their communities.

So you have an idea for a project that can change the world...

What's your plan for growing your community, increasing engagement, and onboarding new users?

Statistically 99% of crypto projects fail. Many projects were doomed from the start, because they lacked a strong community. 

Your message can be strong, but if the right people don't hear it, then it doesn't matter.

Community management requires analytics. Who are your most active contributors? Who tweets most about your project? How can you make these contributors feel appreciated?`;

const RoleImage = "/assets/characters/tavernkeeper.svg";

const SalesContent = `We have community managers who have been in this industry since its early days. We're members of the biggest, most engaged communities in this space. 

Our managers have studied Web3 projects and know which communities stand out. We've helped build communities which survived crypto winter. We can help you build a community that advocates for your project as if it was their first born child.

We have experience using bleeding-edge DAO tools, Discord and Telegram bots, tracking mechanisms, automation and crypto-native engagement techniques.`;

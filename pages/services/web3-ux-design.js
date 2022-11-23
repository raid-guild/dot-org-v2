import ServicePageTemplate from "../../components/page-templates/ServicePageTemplate";
import { Box } from "@chakra-ui/react";
import supabase from "../../shared/Supabase";
import ProjectCard from "../../components/page-components/ProjectCard";

export default function Page({ data }) {

  return (
    <>
      <ServicePageTemplate
        pageTitle={"Web3 UX Design"}
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
    .in('relevant_services', [{tag: "UX Design"}])
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

const PageDescription = `“People ignore design that ignores people.”

Next time you're using your favorite app, think about its ease of use. If you're confused about how the app works, you probably wouldn't call it your favorite.

Your app can be engineered to perfection, but if the UX sucks, your would-be users will leave. 

Even worse, they'll also tell their friends about your app's poor UX

Small details like easy navigation and tracking tools make a huge difference. If your app is easy to use, people will feel comfortable using it.`;

const RoleImage = "/assets/characters/ranger.svg";

const SalesContent = `Our UX designers own design agencies, are artists, and Web3 product consumers.

Raid Guild uses a data-driven approach to UX. We've tested various placements of  toolbars and call-to-action buttons. We understand what drives higher user engagement.

We at Raid Guild love a good adventure. Our approach to your users' journeys puts that ethic front and center. From scoping the project and properly framing your goals, to exploring the edge cases of use. We fully articulate your imagination to create the best user experience possible.

Your app needs to be easy for people to use. So easy that a 75 year olds can figure out how to use it.

“If you think good design is expensive, you should look at the cost of bad design.”

Schedule an appointment now for a UX consultation.`;

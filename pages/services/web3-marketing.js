import ServicePageTemplate from "../../components/page-templates/ServicePageTemplate";
import { Box } from "@chakra-ui/react";
import supabase from "../../shared/Supabase";
import ProjectCard from "../../components/page-components/ProjectCard";


export default function Page({ data }) {
  return (
    <>
      <ServicePageTemplate
        pageTitle={"Web3 Marketing"}
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
    .in("relevant_services", [{ tag: "Marketing" }])
    .range(0, 2);

  if (response.data == null) {
    response = await supabase.from("PortfolioContent").select("*").range(0, 2);
  }

  return {
    props: { data: response.data },
  };
}

const PageDescription = `Imagine working 14 hours a day for the past 2 years. Your engineers built your product perfectly. It works without bugs, the UX is great, and the design is eye-catching.

But you don't have any users...

If nobody knows about your project, your hard work was in vain. It'll end up as a dead product, along with others. 

Having a good marketing strategy is what separates popular products from the obscure.

Marketing doesn't need to be manipulative, aggressive and annoying. 

In fact, people love good marketing?

If you saw an ad for a product or service that could make your family's life easier, would you use it?

Of course you would! (At least if it was within your financial means).`;

const RoleImage = "/assets/characters/archer.svg";

const SalesContent = `Marketing is both a science and art. If your marketing is put in front of the correct people, it taps into human psychology.

If your product works and can improve somebody's life, wouldn't you *want* as many people to see it as humanly possible?

You'd be doing a service to people by giving them awareness about your product and pushing them to use it.

The problem with marketing, especially in Web3, is that most people don't know where to begin. 

You need to market on the right channels, as well as catching your future users in the correct stage of the "marketing lifecycle."

Marketing isn't a one-size solution for everyone. Somebody on the brink of signing up for your product or purchasing an NFT, needs a different message than somebody who has never heard of your product before.

At the end of the day, product market fit is everything. If there's no demand for your service, and your project doesn't reach the right people, it's doomed to fail.

On the other hand, a great product is easy to sell if put in front of the right audience.

Do you know how to put your product in front of the right audience? Raid Guild does.

If you're a builder, focus on what you're best at (building great products). Hire Raid Guild to handle marketing for you.`;

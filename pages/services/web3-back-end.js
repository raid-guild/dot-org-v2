import ServicePageTemplate from "../../components/page-templates/ServicePageTemplate";
import { Box } from "@chakra-ui/react";
import supabase from "../../shared/Supabase";
import ProjectCard from "../../components/page-components/ProjectCard";


export default function Page({ data }) {
  return (
    <>
      <ServicePageTemplate
        pageTitle={"Web3 Back End"}
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
    .in("relevant_services", [{ tag: "Back End" }])
    .range(0, 2);

  if (response.data == null) {
    response = await supabase.from("PortfolioContent").select("*").range(0, 2);
  }

  return {
    props: { data: response.data },
  };
}

const PageDescription = `Data security is one of the main use cases for Web3. The average Web3 users demands security, and is why they use blockchains in the first place.

But decentralization is a spectrum.

Sometimes centralization is useful. When this is true, your app needs a database.

If your app uses a database, it can have no flaws. A hacker breaking into your database and leaking your users' data is a deal-breaker.

Your database needs to be secure. It also needs to have efficient associations and models.

Backend development is complicated.`;

const RoleImage = "/assets/characters/archer.svg";

const SalesContent = `Whether it's Postgres, Hasura, MongoDB, a more robust solution, we have your back

Our engineers have been managing databases since before Web3 existed. We get the importance of security. We have experience building out the small details that are the difference between your data getting leaked, and a trustworthy app.

Whether it's building a new database, or migrating severs, our engineers can build it for you.

Here's what some of our previous backend clients have said:

> "Raid Guild helped us migrate from Postgres to MongoDB. I was amazed at how seamless the migration went. Would hire them again!"
-Vitalik Buterin

Some of the backends we're most proud of are the following: [App 1](https://), [App 2](https://), [App 3](https://).

Book your appointment with a Raid Guild specialist now.`;

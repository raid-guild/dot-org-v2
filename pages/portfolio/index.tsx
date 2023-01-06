// A page that displays all of the projects in the portfolio
import _ from 'lodash';
import { Box, Heading, HStack, Image, VStack, Text, Link, Button } from '@raidguild/design-system';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ProjectCard from '../../components/page-components/ProjectCard';

// import supabase from '../../shared/Supabase';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';

interface Props {
  projects: any;
}

function PortfolioPage({ projects }: Props) {
  // fetch paginated portfolio content from supabase on page load
  // const [projectData, setProjectData] = useState([]);
  // const [page, setPage] = useState(1);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await supabase
  //       .from('PortfolioContent')
  //       .select('*')
  //       .range(0, 10)
  //       .order('id', { ascending: true });
  //     setProjectData(data);
  //   };
  //   fetchData();
  // }, []);

  // async function fetchNewData() {
  //   const { data, error } = await supabase
  //     .from('PortfolioContent')
  //     .select('*')
  //     .range((page - 1) * 10, (page - 1) * 10 + 10)
  //     .order('id', { ascending: true });
  //   console.log(data);
  //   console.log(error);
  //   setProjectData([...data]);
  // }

  // // call fetchNewData when the page number changes
  // useEffect(() => {
  //   fetchNewData();
  // }, [page]);

  return (
    <Box>
      <CMSPageTemplate>
        <PageTitle title='Portfolio' />
        <VStack sx={{ width: `100%`, alignItems: `center`, gap: `1rem` }}>
          {/* {typeof projectData !== null &&
            projectData.map((project, index) => {
              console.log(project);
              return <PortfolioContent project={project} />;
            })} */}
        </VStack>
      </CMSPageTemplate>
    </Box>
  );
}

// a component for displaying a portfolio project in a list
function PortfolioContent({ project }: { project: any }) {
  return (
    <Box my='2rem'>
      <HStack gap='4rem'>
        <Image src={_.get(project, 'imageUrl')} sx={{ height: `200px`, width: `200px`, marginRight: `1rem` }} />
        <VStack color='white' align='flex-start'>
          <Heading>{_.get(project, 'projectName')}</Heading>
          <Box sx={{ maxWidth: `50ch` }}>
            <Text>{_.get(project, 'description')}</Text>
          </Box>
          <Link href={`/portfolio/${project?.project_name}`}>
            <Button sx={{ color: `black` }}>Read More</Button>
          </Link>
        </VStack>
      </HStack>
    </Box>
  );
}

export default PortfolioPage;

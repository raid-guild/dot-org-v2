import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
import BlogForm from '../../components/forms/BlogForm';

function Publish() {
  return (
    <CMSPageTemplate>
      <PageTitle title='Create Post' />
      <BlogForm />
    </CMSPageTemplate>
  );
}

export default Publish;

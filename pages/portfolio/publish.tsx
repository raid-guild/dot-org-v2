import { useSession } from 'next-auth/react';

const PublishPortfolio = () => {
  const { data: session, status } = useSession();
  if (!session)
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  // other hooks happen here
  //   const { token } = session;
  // token can be passed to react-query mutate hook to authenticate the request

  return <div />;
};

export default PublishPortfolio;

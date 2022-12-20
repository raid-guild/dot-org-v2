import { useSession } from "next-auth/react";

export default function PublishPortfolio(props: any) {
    const { data: session, status } = useSession();
    if (!session) return (
        <div>
            <h1>Not logged in</h1>
        </div>
    );
    // other hooks happen here
    /* @ts-ignore */
    const token = session.token;
    // token can be passed to react-query mutate hook to authenticate the request

    
    return (
        <div>

        </div>
    );
}
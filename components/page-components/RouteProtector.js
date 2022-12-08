import { AppContext } from "../../context/AppContext";

import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import useWallet from "../../hooks/useWallet";

/**
 * RouteProtector component can be imported to pages that need route protection to interact with.
 * Kicks unloggedin users back to home page.
 * @param {*} props
 * @returns Null JSX.
 */
export default function RouteProtector(props) {
  const router = useRouter();
  const context = useContext(AppContext);

  useEffect(() => {
    console.log("RouteProtector useEffect");
    console.log(context?.isMember);
    // not connected :(
    if (context?.isMember == false) {
      props?.setter(false);
    }
    // connected :3
    if (context?.isMember == true) {
      props?.setter(true);
    }
  }, [context]);
  return <></>;
}

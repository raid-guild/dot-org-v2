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
    // not connected :(
    if (context?.signerAddress == null) {
      props?.setter(false);
    }
    // connected :3
    if (context?.signerAddress !== null) {
      props?.setter(true);
    }
  }, [context]);
  return <></>;
}

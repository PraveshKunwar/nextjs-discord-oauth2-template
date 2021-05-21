import {NextPage, GetServerSideProps} from "next";
import {useRouter} from "next/router";
import nookies from "nookies"
import {useState, useEffect} from "react";

interface TokenProps {
  token: { [key: string]: string };
}

const Index: NextPage<TokenProps> = ({token}: TokenProps) => {
  const [user, setUser] = useState<null | any>(null);
  const router = useRouter();
  useEffect(() => {
    (async() => {
      const res = await fetch("https://discord.com/api/users/@me", {
          headers: {
            Authorization: `${token.token_type} ${token.token}`,
          },
        });
        const data = await res.json();
        setUser(data);
    })()
  }, [user])
  return (
    <div className="nextjs-oauth2-discord-template">
      {token.token ? <div>Welcome {user.name}!</div> : <button onClick={() => {
        router.push("/api/auth")
      }}>Login</button>}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const cookies = nookies.get(ctx);
	return {
		props: {
			token: cookies,
		},
	};
};


export default Index;

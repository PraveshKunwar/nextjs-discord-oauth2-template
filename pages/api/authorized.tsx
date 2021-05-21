import {NextApiResponse, NextApiRequest} from "next";
import nookies from "nookies";

const encode = (obj: { [key: string]: unknown }) => {
	let string = '';
	for (const [K, V] of Object.entries(obj)) {
		if (!V) continue;
		string += `&${encodeURIComponent(K)}=${encodeURIComponent(`${V}`)}`;
	}
	return string.substring(1);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code as string;
  const data = {
		client_id: "CLIENT_ID",
		client_secret: "CLIENT_SECRET",
		grant_type: 'authorization_code',
		redirect_uri: 'REDIRECT_URI',
		code,
		scope: 'identify guilds email',
	};
  if(!code){
    res.status(404).send("Error: No code was provided.");
  }
  const token = await fetch("https://discord.com/api/oauth2/token", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: encode(data),
	});
  const token_data = await token.json();
  if(!token_data.access_token){
    res.status(404).send("No access token was provided. Try again later.")
  }
  nookies.set({ res }, 'token', token_data.access_token, {
		expires: new Date(Date.now() + token_data.expires_in * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		path: '/',
	});
	nookies.set({ res }, 'token_type', token_data.token_type, {
		expires: new Date(Date.now() + token_data.expires_in * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		path: '/',
	});
	res.redirect('/');
}

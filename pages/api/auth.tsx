import {NextApiResponse, NextApiRequest} from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const CLIENT_ID = "getClientId";
  const REDIRECT_URI = "http://localhost:3000/authorized"; //replace this with your scope. since its /authorized, I added an author
  const scopes = "identify guilds email"
  res.redirect(
  		`https://discord.com/api/oauth2/authorize?client_id=${
  		   CLIENT_ID
  		}&redirect_uri=${encodeURIComponent(
  			REDIRECT_URI
  		)}&response_type=code&scope=${encodeURIComponent(scopes)}`
  	);
}

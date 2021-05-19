import {NextApiResponse, NextApiRequest} from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(
  		`https://discord.com/api/oauth2/authorize?client_id=${
  		    "CLIENT_ID_GOES_HERE"
  		}&redirect_uri=${encodeURIComponent(
  			'http://localhost:3000/api/authorized'
  		)}&response_type=code&scope=${encodeURIComponent('identify guilds email')}`
  	);
}

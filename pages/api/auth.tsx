import {NextApiResponse, NextApiRequest} from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send("Hello World!");
}

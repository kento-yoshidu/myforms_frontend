import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean,
  errorStatus?: "id" | "pass"
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = req.body

    res.status(200).json({ status: true })
  } catch (e) {
    res.status(500)
  }
}

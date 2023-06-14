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

    setTimeout(() => {
      if (data.id === "id" && data.password === "pass") {
        res.status(200).json({ status: true })
      } else {
        res.status(401).json({ status: false })
      }
    }, 1000)
  } catch (e) {
    res.status(500)
  }
}

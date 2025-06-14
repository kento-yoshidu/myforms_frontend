import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  status: boolean,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = req.body

    setTimeout(() => {
      if (data.id === "user" && data.password === "pass") {
        res.status(200).json({ status: true })
      } else if (data.id !== "user") {
        res.status(401).json({ status: false })
      } else if (data.password !== "pass") {
        res.status(401).json({ status: false })
      }
    }, 1000)
  } catch (e) {
    res.status(500)
  }
}

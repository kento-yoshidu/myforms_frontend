import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  status: boolean,
  errorMessage?: string
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
      } else {
        res.status(401).json({ status: false, errorMessage: "エラー発生" })
      }
    }, 1000)
  } catch (e) {
    res.status(500)
  }
}

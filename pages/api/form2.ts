import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  password: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = req.body

    res.status(200).json({ password: data })
  } catch(e) {
    res.status(500)
  }
}

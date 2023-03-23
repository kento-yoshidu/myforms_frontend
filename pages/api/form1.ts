import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = req.body.toUpperCase()

    res.status(200).json({ name: data })
  } catch(e) {
    res.status(500)
  }
}

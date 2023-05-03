import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  text: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = req.body

    res.status(200).json({ text: data })
  } catch(e) {
    res.status(500)
  }
}

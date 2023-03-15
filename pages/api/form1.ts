import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username } = req.body

    res.status(200).json({ username })
  } catch(e) {
    res.status(500)
  }
}

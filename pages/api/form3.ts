import type { NextApiRequest, NextApiResponse } from 'next'

type UserData = {
  email: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData>
) {
  try {
    res.status(200).json({ email: req.body })
  } catch(e) {
    res.status(500)
  }
}

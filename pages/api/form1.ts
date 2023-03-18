import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res
      .status(200)
      .json({
        username: req.body.username,
        email: req.body.email
      })
  } catch(e) {
    res.status(500)
  }
}

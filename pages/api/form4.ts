import type { NextApiRequest, NextApiResponse } from 'next'

type UserData = {
  username: string
  email: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData>
) {
  try {
    const { username, email } = req.body.formData
    res.status(200).json({ username, email })
  } catch(e) {
    res.status(500)
  }
}

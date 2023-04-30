const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModal = require('../models/user')

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  try {
    const oldUser = await UserModal.findOne({ email })

    if (oldUser) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hashSync(password, 5)

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`
    })

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_KEY
    )

    res.status(201).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })

    console.log(error)
  }
}
exports.signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const oldUser = await UserModal.findOne({ email })

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })

    const isPasswordCorrect = await bcrypt.compareSync(
      password,
      oldUser.password
    )

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.JWT_KEY
    )

    res.status(200).json({ result: oldUser, token })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

// export const logout = async (req, res) => {
//   res
//     .clearCookie('accessToken', {
//       sameSite: 'none',
//       secure: true
//     })
//     .status(200)
//     .send('User has been logged out.')
// }

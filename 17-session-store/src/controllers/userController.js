import User from '../models/User.js';

// create users
export const createUser = async (req, res) => {
  try {
    // create user with password hashed
    const newUser = new User(req.body);

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get users
export const getUsers = async (request, response) => {
  try {
    const users = await User.find();
    response.json(users);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

// get user by Id
export const getUserById = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) return response.status(404).json({ error: 'User does not exist' });
    response.json(user);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

// Update user by Id
export const updateUserById = async (request, response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return response.status(404).json({ error: 'User does not exist' });
    response.json(updatedUser);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

// Delete user by Id
export const deleteUserById = async (request, response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(request.params.id);
    if (!deletedUser) return response.status(404).json({ error: 'User does not exist' });
    response.json({ message: 'Xoá thành công' });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};


export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Sai tài khoản' });

    const isMatch = password === user.password;
    if (!isMatch) return res.status(401).json({ error: 'Sai mật khẩu' });

    // Lưu session
    req.session.userId = user._id;

    res.json({ message: 'Đăng nhập thành công', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserStatus = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(200).json({ loggedIn: false });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(200).json({ loggedIn: false });
    }

    res.status(200).json({
      loggedIn: true,
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
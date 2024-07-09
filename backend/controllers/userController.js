import {User} from "../models/user.model.js";
const completeProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { location, age, work, dob, description } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.location = location;
    user.age = age;
    user.work = work;
    user.dob = dob;
    user.description = description;

    await user.save();

    res.status(200).json({ message: "Profile completed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export { completeProfile };

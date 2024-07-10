import { User } from "../models/user.model.js";
const completeProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { location, age, work, dob, description } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const dateObj = new Date(dob);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    user.location = location;
    user.age = age;
    user.work = work;
    user.dob = `${year}-${month}-${day}`;
    user.description = description;

    await user.save();

    res.status(200).json({ message: "Profile completed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(req.user);
    const { location, age, work, dob, description } = user;
    res
      .status(200)
      .json({
        message: "Profile fetched successfully",
        user: { location, age, work, dob, description },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export { completeProfile, getProfile };

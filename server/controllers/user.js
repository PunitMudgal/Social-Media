import User from "../models/User.js";

/** GET   users/:id*/
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(501).send({ err: "envalid id!" });
    const findUser = await User.findById(id);
    if (findUser) {
      /** remove password from user */
      // mongoose return unnecessary data with object so convert it into json
      const { password, ...rest } = Object.assign({}, findUser.toJSON());
      return res.status(201).send(rest);
    } else {
      return res.status(404).send({ error: "couldn't find the user" });
    }
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

//  GET users/search/:name
export const searchUsers = async (req, res) => {
  try {
    const {name} = req.params
    const users = await User.find({
      "$or": [
        { "firstName": { $regex: name } },
        { "email": { $regex: name } }
      ],
    });
    if (!users) return res.status(404).send({ err: "user not found!" });
    return res.status(201).send(users);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

/** GET  users/:id/friends */
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

/** PATCH    /:id/:friendId */
export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      // REMOVES FRIEND FROM BOTH SIDES
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // ADD FRIEND FROM BOTH SIDES
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

/** UPDATE USER /updateUser */
export async function updateUser(req, res) {
  try {
    const { userId } = req.user;
    // const id = req.query.id;
    if (userId) {
      const body = req.body;

      // update the data
      const updateInfo = await User.updateOne({ _id: userId }, body);
      if (updateInfo)
        return res.status(201).send({ msg: "Record Updated!", updateInfo });
      else {
        return res.status(401).send({ error: "couldn't update the user Info" });
      }
    } else {
      return res.status(401).send({ error: "user not found!" });
    }
  } catch (error) {
    return res.status(501).send({ error });
  }
}

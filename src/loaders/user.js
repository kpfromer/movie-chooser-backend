export const batchUsers = async (keys, models) => {
  const users = await models.User.find({
    _id: {
      $in: keys
    }
  });

  return keys.map(key =>
    users.find(user => {
      // key is a mongoose _id object
      return user.id === key.toString();
    })
  );
};

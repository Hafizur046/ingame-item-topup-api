//Serarch for user
async function findUser(Model, username) {
    return await Model.findOne({ username: username });
}
export default findUser;

const getEmail = ( users , userLogginIn ) => {

    userLogginIn = userLogginIn.email ? userLogginIn.email : userLogginIn  

    return users.filter( userToFilter => userToFilter !== userLogginIn)
}


export default getEmail
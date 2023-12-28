const authorizeRole = (role) => {
    return (req, res, next) => {
        const currentUser = req.user;
        console.log("El usuario actual es:", currentUser)
        console.log("El rol autorizado es:", role)
        if (!currentUser || currentUser.role !== role) {
            return res.status(403).send("Acceso no autorizado");
        }

        next();
    };
}

export default authorizeRole;
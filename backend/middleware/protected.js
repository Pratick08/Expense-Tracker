import jwt from 'jsonwebtoken'
export async function protect(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({
            message: "Token not found"
        })
    }
    // console.log("TOKEN",token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded",decoded)
    req.user = decoded;
    next();
}
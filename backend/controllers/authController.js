import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt';
import sessionModel from '../models/sessionModel.js'
import crypto from 'crypto';
import jwt from 'jsonwebtoken'
export async function register(req, res) {
    const { username, email, password } = req.body;
    const alreadyRegistered = await UserModel.findOne({ email });
    if (alreadyRegistered) {
        return res.status(401).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.create({
        username,
        email,
        password: hashPassword,
    });

    const refreshToken = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const accessToken = jwt.sign(
        {
            id: user._id,
            sessionId: session._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    )

    res.cookie("refreshToken", refreshToken,
        {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
    res.status(201).json({
        message: "User Register Successfully",
        user: { username: user.username, email: user.email },
        accessToken
    })
}
export async function login(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid Email Or Password" });
    }
    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
        return res.status(401).json({ message: "Invalid Email Or Password" });
    }

    const refreshToken = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const accessToken = jwt.sign(
        {
            id: user._id,
            sessionId: session._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    )

    res.cookie("refreshToken", refreshToken,
        {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
    res.status(201).json({
        message: "User Login Successfully",
        user: { username: user.username, email: user.email },
        accessToken
    })
}
export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    // console.log("refreshToken:", refreshToken);
    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found"
        });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id)
    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })
    if (!session) {
        return res.status(401).json({
            message: "Invalid Refresh Token"
        });
    }

    const accessToken = jwt.sign(
        {
            id: decoded.id,
            sessionId: session._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    )
    const newRefreshToken = jwt.sign(
        {
            id: decoded.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
    const newRefreshTokenHash = crypto
        .createHash("sha256")
        .update(newRefreshToken)
        .digest("hex");
    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();

    res.cookie(
        "refreshToken",
        newRefreshToken,
        {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    );

    res.status(200).json({
        message: "Access token generated successfully",
        user: { username: user.username, email: user.email },
        accessToken
    });

}

export async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found"
        });
    }
    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");
    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })
    if (!session) {
        return res.status(401).json({
            message: "Session not found"
        });
    }
    session.revoked = true;
    await session.save();
    res.clearCookie("refreshToken");
    res.status(200).json({
        message: "Logged out successfully"
    });
}



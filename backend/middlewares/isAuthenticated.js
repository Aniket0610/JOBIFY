import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        // Check whether the token exists.
        if (!token) {

            return res.status(401).json({
                message: "Please log in to access this feature.",
                success: false,
            });

        }

        // Verify the JWT token.
        const decode = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        // Check whether the decoded token is valid.
        if (!decode || !decode.userId) {

            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });

        }

        // Store the authenticated user's ID.
        req.id = decode.userId;

        next();

    } catch (error) {

        console.error("Authentication failed:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token. Please log in again.",
            success: false,
        });

    }

};

export default isAuthenticated;
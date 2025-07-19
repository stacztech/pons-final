import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	console.log('Cookies received:', req.cookies);
	console.log('Headers received:', req.headers);
	
	const token = req.cookies.token;
	if (!token) {
		console.log('No token found in cookies');
		return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	}
	
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			console.log('Token verification failed - invalid token');
			return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
		}

		req.userId = decoded.userId;
		console.log('Token verified successfully for user:', decoded.userId);
		next();
	} catch (error) {
		console.log("Error in verifyToken:", error.message);
		return res.status(401).json({ success: false, message: "Unauthorized - token verification failed" });
	}
};

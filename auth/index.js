const jwt = require('jsonwebtoken');

const auth = {
  verifyAuthToken: (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['Authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
        req.decoded = decoded;
        next();
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });  
      }
    } catch(error) {
      console.log("Error", error);
      res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  }
}

module.exports = auth

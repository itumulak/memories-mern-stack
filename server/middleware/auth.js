import jwt from 'jsonwebtoken';

export default async (request, response, next) => {
    let token;

    if ( request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
        token = request.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return response.status(401).json({name: error.name, message: error.message})
            }
            else {
                request.userId = decoded?.id
                next()
            }
        })

    }
    else {
        return response.status(401).json({message: 'Token not available.'})
    }
 
    if ( ! token )  {
        return response.status(401).json({message: 'Access Denied. No token provided.'})
    }
}
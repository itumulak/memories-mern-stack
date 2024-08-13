import jwt from 'jsonwebtoken';

export default async (request, response, next) => {
    const token = request.headers('Authorization').split(" ")[1]
 
    if ( ! token )  {
        return response.status(401).json({message: 'Access Denied. No token provided.'})
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        request.userId = decodedData?.id
        next()
    } catch (error) {
        console.log(error);        
    }
}
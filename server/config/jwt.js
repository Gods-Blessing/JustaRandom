import jwt from 'jsonwebtoken';

export const creatingToken = (id)=>{
    let token = jwt.sign({
        data: id
      }, process.env.BE_JWT_SECRET , { expiresIn: '7d' });
    // console.log(token);

    return token;
}

export const decodeFxn = (req,res,next)=>{
    // console.log(req.headers);
    try {
        let token = req.headers.token
        let decoded = jwt.verify(token, process.env.BE_JWT_SECRET)
        // console.log(decoded.data);
        req.userid = decoded.data;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message:'UnAuthorized'
        })
    }
}
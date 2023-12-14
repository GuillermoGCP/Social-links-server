import {getOwnLinks} from "../../models/links/index.js";
import { selectUserById } from "../../models/users/index.js";



const getProfile = async (req, res,next)=>{
    try {
        const loggedUserId=req.auth.id;
        const user= await selectUserById(loggedUserId);
        let links= await getOwnLinks(loggedUserId)
        if (links.length <= 0) {
            links="No has publicado ningun link"
        }
        res.send({
            status:"ok",
            data: {
                user: user.name,
                email: user.email,
                biography:user.biography,
                profilePicture: user.profilePicture
            },
            ownLinks:{
                links
            }
        })
        
    } catch (error) {
        next(error);
    }
}

export default getProfile
import { selectLinkById} from "../../models/links/index.js";
import {generateError} from "../../utils/index.js";
import { validatedRating } from "../../utils/validation.js";
import {  voteLink, updateRating, selectRatings} from "../../models/ratings/index.js";

const voteLinkController=async(req,res,next)=>{
    try {
        const loggedUserId=req.auth.id;
        const {linkId}=req.params;
        const {rating}=req.body;
        
        //Validar con Joi
        const {error}=validatedRating.validate(rating)
        if (error) {
            error.message=error.details[0].message;
            throw error;
        }
   
        const link = await selectLinkById(linkId);
        
        if (!link) {
            generateError("El link no existe", 404);
        }

        if (loggedUserId===link.ownerId) {
            generateError("No puedes votar tu propio link",403)
        }
          
        
        await voteLink(loggedUserId,linkId,rating);
        res.send({
            status:"ok",
            data:{
                message:`Has votado el link ${linkId} con un ${rating}`
            }
        })
    
        
    } catch (error) {
        next(error);
    }

}

export default voteLinkController;


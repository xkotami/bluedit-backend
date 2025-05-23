import {app,HttpResponseInit,InvocationContext,HttpRequest} from "@azure/functions";
import communityService from "../service/communityService"; 


export async function GetCommunities(request: HttpRequest,context:InvocationContext):Promise<HttpResponseInit>{
    try{
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return {
                status: 401,
                jsonBody: { message: "Missing or invalid Authorization header" }
            };
        }

        const token = authHeader.split(" ")[1];
const communities= await communityService.getAllCommunities(token);
return{
    status: 200,
    jsonBody: communities
};
    }catch(error:any){
        context.log("Error fetching communities",error)
        return{
            status:500,
            jsonBody:{
                message:error.message || "Internal Server Error(community)"
            }
        };
    }
}

app.http('GetCommunities',{
    route:"communities",
    methods:['GET'],
    authLevel:'anonymous',
    handler: GetCommunities
})
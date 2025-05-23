import {app,HttpResponseInit,InvocationContext,HttpRequest} from "@azure/functions";
import communityService from "../service/communityService";
import {CommunityInput} from "../types"
export async function CreateCommunity(request:HttpRequest,context:InvocationContext): Promise<HttpResponseInit>{
    try{

        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return {
                status: 401,
                jsonBody: { message: "Missing or invalid Authorization header" }
            };
        }

        const token = authHeader.split(" ")[1];
        const input =await request.json() as CommunityInput;
        const response= await  communityService.createCommunity(input,token);
        return{
            status:200,
            jsonBody: response
        };
    }catch (error:any){
        context.log("Error fetching comments:",error);
        return{
            status:500,
            jsonBody:{
                message: error.message || "Internal server error(community)"
            }
        };
    }
}

app.http('CreateCommunity',{
    route:"communities",
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: CreateCommunity
});
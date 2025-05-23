import {app,HttpResponseInit,InvocationContext,HttpRequest} from "@azure/functions";
import postService from "../service/postService";
import {PostInput} from "../types"
export async function CreatePost(request:HttpRequest,context:InvocationContext): Promise<HttpResponseInit>{
    try{
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return {
                status: 401,
                jsonBody: { message: "Missing or invalid Authorization header" }
            };
        }

        const token = authHeader.split(" ")[1];

        const input =await request.json() as PostInput;
        const response= await  postService.createPost(input,token);
        return{
            status:200,
            jsonBody: response
        };
    }catch (error:any){
        context.log("Error fetching posts:",error);
        return{
            status:500,
            jsonBody:{
                message: error.message || "Internal server error(post)"
            }
        };
    }
}

app.http('CreatePost',{
    route:"posts",
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: CreatePost
});
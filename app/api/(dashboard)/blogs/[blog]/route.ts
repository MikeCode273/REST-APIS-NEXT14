import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from  "@/lib/models/category";
import Blog from "@/lib/models/blog";
import { NextResponse } from "next/server";
import {Types} from "mongoose";
import { request } from "http";


export const GET = async (request:Request,context:{params:any})=> { 
  const blogId = context.params.blog;
  try{
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get('userId');
    const categoryId = searchParams.get('categoryId');

    if(!userId || !Types.ObjectId.isValid(userId)){
      return new NextResponse(
        JSON.stringify({message: "Invalid or missing useerId"}),
        {
          status: 400,
        }
      )

    };

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({message: "Invalis  or missing categoryId"}),{status: 400}
      );
    }

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(
        JSON.stringify({message: "Invalis  or missing blogId"}),{status: 400}
      );
    }

    await connect()

    const user = await User.findById(userId)
    if(!userId){
      return new NextResponse(
        JSON.stringify({message: "User not found"}),
        {
          status: 404
        }
      )
    };

    const category =await Category.findById(categoryId)

    if (!category){
      return new NextResponse(
        JSON.stringify({message: "Category not found"}),
        {status: 404,}
      );
    }

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
      category: new Types.ObjectId(categoryId),
    });

    if (!blog){
      return new NextResponse(
        JSON.stringify({message:"Blog not found"}),{status:404}
      )
    }

    return new NextResponse(JSON.stringify({blog}),{
      status:200
    });

  } catch(error: any){
    return new NextResponse("Error in deleting user"+ error.message,{
      status:500,
    });
  }
};
import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from  "@/lib/models/category";
import { NextResponse } from "next/server";
import {Types} from "mongoose";

export const PATCH = async (request: Request, context: {params: any} ) =>{
    const categoryId = context.params.category;

  try{
    const body = await request.json();
    const {title} = body;

    const {searchParams} = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({message: "Invalid or missing userId"}),{status: 400}
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({message: "Invalis  or missing categoryyID"}),{status: 400}
      );
    }

    await connect();

    const user = await User.findById(userId)

    if(!user){
      return new NextResponse(
        JSON.stringify({message: "user not found"}),{status: 404}
      );
    }

    const category = await Category.findOne({_id: categoryId, user: userId})

    if (!category){
      return new NextResponse(
        JSON.stringify({message: "Category not found"}),{status: 404}
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {title},
      {new: true},
    )
  } catch(error: any){
    return new NextResponse("Error in deleting user"+ error.message,{
      status:500,
    });
  } 
}
import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from  "@/lib/models/category";
import { NextResponse } from "next/server";
import {Types} from "mongoose";

export const GET = async (request: Request) => {
  try{
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get('userId');

    if(!userId || !Types.ObjectId.isValid(userId)){
      return new NextResponse(
        JSON.stringify({message: "Invalid or missing useerId"}),
        {
          status: 400,
        }
      )

    };

    await connect();

    const user = await User.findById(userId)
    if(!userId){
      return new NextResponse(
        JSON.stringify({message: "User not found in the database"}),
        {
          status: 400
        }
      )
    };

    const categories = await Category.find({
      user: new Types.ObjectId(userId),
    });

    return new NextResponse(JSON.stringify(categories),
    {
      status: 200,
    });
  } catch(error: any){
    return new NextResponse("Error in deleting user"+ error.message,{
      status:500,
    });
  }
}
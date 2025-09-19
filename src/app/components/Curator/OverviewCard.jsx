"use client";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Calendar as CalendarIcon, Info } from "lucide-react";

export default function OverviewCard({
  duration = "12 Days",
  price = "5,850",
  suggestedAges = "Any",
  maxGroupSize = "Any",
}) {
  return (
    <Card className="p-0 mb-6 border border-card-border border-gray-100 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4 pb-0 text-2xl font-semibold text-gray-800">
        Tour Overview
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4 grid grid-cols-2 gap-y-4">
        {/* Duration */}
        <div className="flex flex-col space-y-1">
          <span className="  text-sm text-gray-500">Duration: </span>
          <div className="flex items-center  ">
            <CalendarIcon className="mr-2 h-5 w-5 text-orange-500" />
            <span className="text-gray-600 font-semibold">{duration}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col space-y-1">
          <span className="  text-sm text-gray-500">Price per person: </span>
          <div className="flex items-center ">
            <Info className="mr-2 h-5 w-5 text-orange-500" />
            <span className="text-gray-600 font-semibold">
              <span className="text-orange-500">₹{price}</span>{" "}
              <span className="text-[13px] text-gray-500">onwards</span>
            </span>
          </div>
        </div>

        {/* Suggested Ages */}
        <div className="flex flex-col space-y-1">
          <span className="  text-sm text-gray-500">Suggested Ages: </span>
          <div className="flex items-center ">
            <Info className="mr-2 h-5 w-5 text-orange-500" />
            <span className="text-gray-600 font-semibold">{suggestedAges}</span>
          </div>
        </div>

        {/* Maximum Group Size */}
        <div className="flex flex-col space-y-1">
          <span className="  text-sm text-gray-500">Maximum Group Size: </span>
          <div className="flex items-center  ">
            <Info className="mr-2 h-5 w-5 text-orange-500" />
            <span className="text-gray-600 font-semibold">{maxGroupSize}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

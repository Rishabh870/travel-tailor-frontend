"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/ui/popover";
import { Calendar as CalendarIcon, Users, Plus, Minus } from "lucide-react";
import { format, addDays } from "date-fns";

export default function EnquireNow({
  basePrice,
  currency,
  tourDuration = 3,
  tagMonths = [],
  tourType = "fixed_date", // Pass tourType prop
  getDateRange, // getDateRange is expected to be an object containing { startDate, endDate }
}) {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedTab, setSelectedTab] = useState("fixed_date");

  // Utility function to check if a date is valid
  const isValidDate = (date) => date instanceof Date && !isNaN(date);

  // Set date range from getDateRange if tourType is fixed_date
  useEffect(() => {
    if (tourType === "fixed_date" && getDateRange) {
      const { startDate, endDate } = getDateRange;

      // Check if the dates are valid Date objects
      const validStartDate = isValidDate(startDate) ? startDate : null;
      const validEndDate = isValidDate(endDate) ? endDate : null;

      setDateRange({
        startDate: validStartDate,
        endDate: validEndDate,
      });
    }
  }, [tourType, getDateRange]);

  // Auto adjust range based on duration (used only for selectable_date)
  const handleSelect = (day) => {
    if (!day) return;
    const end = addDays(day, tourDuration - 1);
    setDateRange({ startDate: day, endDate: end });
  };

  const increment = (type) => setGuests((g) => ({ ...g, [type]: g[type] + 1 }));
  const decrement = (type) =>
    setGuests((g) => ({ ...g, [type]: Math.max(0, g[type] - 1) }));

  const totalGuests = guests.adults + guests.children;

  // Handle tab switch
  const handleTabChange = (type) => {
    setSelectedTab(type);
    if (type === "fixed_date") {
      // Reset date range for fixed date
      setDateRange({ startDate: null, endDate: null });
    }
  };

  const handleSendEnquiry = () => {
    // Handle sending enquiry logic here
    const date = selectedTab === "fixed_date" ? getDateRange : dateRange;
    console.log("Enquiry sent:", date, guests);
  };

  return (
    <Card className="p-0 border border-card-border shadow-md hover:shadow-lg transition-shadow duration-300 border-gray-100  bg-white">
      <CardHeader className="p-4 pb-0 text-2xl font-semibold ">
        Enquire Now
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        {/* Show tabs only if the tourType is 'both' */}
        {tourType === "both" && (
          <div className="mb-4 flex gap-3">
            <div className="w-full">
              <Button
                onClick={() => handleTabChange("fixed_date")}
                className={`w-full ${
                  selectedTab === "fixed_date"
                    ? "bg-orange-500 text-white"
                    : "  bg-white text-gray-700 hover:bg-orange-500 hover:text-white"
                }`}
              >
                Fixed Date
              </Button>
            </div>
            <div className="w-full">
              <Button
                onClick={() => handleTabChange("selectable_date")}
                className={`w-full ${
                  selectedTab === "selectable_date"
                    ? "bg-orange-500 text-white"
                    : "  bg-white text-gray-700 hover:bg-orange-500 hover:text-white"
                }`}
              >
                Selectable Date
              </Button>
            </div>
          </div>
        )}

        {/* Date Picker - Fixed Date */}
        {tourType === "fixed_date" || selectedTab === "fixed_date" ? (
          <div className="mb-4">
            <label className="block mb-3 font-medium text-gray-700">
              Select Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-orange-200"
                  disabled
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-orange-500" />
                  {getDateRange?.startDate ? (
                    getDateRange?.endDate ? (
                      <>
                        {format(getDateRange.startDate, "MMM d, yyyy")} -{" "}
                        {format(getDateRange.endDate, "MMM d, yyyy")}
                      </>
                    ) : (
                      format(getDateRange.startDate, "MMM d, yyyy")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  className="bg-orange-500"
                  mode="single"
                  classNames={{
                    day_selected:
                      "bg-orange-500 text-white hover:bg-orange-500 focus:bg-orange-500",
                    day_today: "border border-orange-300", // today highlight
                    day: "hover:bg-orange-100 ", // every cell light border
                  }}
                  selected={getDateRange?.startDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        ) : null}

        {/* Date Picker - Selectable Date */}
        {tourType === "selectable_date" || selectedTab === "selectable_date" ? (
          <div className=" mb-4">
            <label className="block mb-3 font-medium text-gray-700">
              Select Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-orange-200"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-orange-500" />
                  {dateRange?.startDate ? (
                    dateRange.endDate ? (
                      <>
                        {format(dateRange.startDate, "MMM d, yyyy")} -{" "}
                        {format(dateRange.endDate, "MMM d, yyyy")}
                      </>
                    ) : (
                      format(dateRange.startDate, "MMM d, yyyy")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  className="bg-orange-500"
                  mode="single"
                  classNames={{
                    day_selected:
                      "bg-orange-500 text-white hover:bg-orange-500 focus:bg-orange-500",
                    day_today: "border border-orange-300", // today highlight
                    day: "hover:bg-orange-100 ", // every cell light border
                  }}
                  selected={dateRange?.startDate}
                  onSelect={handleSelect}
                  disabled={(date) => {
                    // Disable past dates
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Remove time part, set to midnight for comparison
                    return date < today;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        ) : null}

        {/* Guests */}
        <div className="mb-4">
          <label className="block mb-3 font-medium text-gray-700">Guests</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start border-orange-200"
              >
                <Users className="mr-2 h-4 w-4 text-orange-500" />
                {totalGuests > 0 ? `${totalGuests} Guests` : "Add Guests"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-4 flex flex-col gap-4 border border-gray-100 space-y-3">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <span>Adults</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 border-gray-200"
                    onClick={() => decrement("adults")}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span>{guests.adults}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 border-gray-200"
                    onClick={() => increment("adults")}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <span>Children</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 border-gray-200"
                    onClick={() => decrement("children")}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span>{guests.children}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 border-gray-200"
                    onClick={() => increment("children")}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <Button
            onClick={handleSendEnquiry}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Send Enquiry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

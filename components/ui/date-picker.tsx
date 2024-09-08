"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CostumCalendar } from "../CostumCalendar";

interface DatePickerProps {
  label: string;
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  selectedDate,
  onDateChange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CostumCalendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selectedDate}
          onSelect={onDateChange}
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
};

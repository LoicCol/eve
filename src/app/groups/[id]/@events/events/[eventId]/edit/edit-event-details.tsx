"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EditEventDetailsProps {
  event: {
    eventId: string;
    eventName: string;
    location: string;
    eventDate: Date;
    description: string | null;
  };
  user?: {
    userId: string;
    name: string;
    image: string | null;
  };
}

export default function EditEventDetails({
  event,
  user,
}: EditEventDetailsProps) {
  const [eventName, setEventName] = useState(event.eventName);
  const [location, setLocation] = useState(event.location);
  const [eventDate, setEventDate] = useState(
    new Date(event.eventDate).toISOString().slice(0, 16)
  );
  const [description, setDescription] = useState(event.description || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form");
    /* await updateEvent(event.eventId, {
      eventName,
      location,
      eventDate: new Date(eventDate),
      description,
    }) */
    // Handle successful update (e.g., show a success message or redirect)
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-6"
        >
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">Edit Event</h1>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="eventName"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Event Name
                </label>
                <Input
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="eventDate"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Date and Time
                </label>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="eventDate"
                    type="datetime-local"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Location
                </label>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Created by:</span>
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user?.name}</span>
              </div>
              <Button type="submit" className="w-full md:w-auto">
                Save Changes
              </Button>
            </div>
          </div>
          <div className="flex-1 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              className="min-h-[200px]"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

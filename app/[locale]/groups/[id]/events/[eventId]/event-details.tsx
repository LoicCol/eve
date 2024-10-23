"use client";

import { Card, CardContent } from "@/components/ui/card";
import ParticipantsList from "@/components/participant-list";
import { CalendarIcon, MapPinIcon, UserIcon, ClockIcon } from "lucide-react";
import { useI18n } from "@/locales/client";
import { Separator } from "@/components/ui/separator";
import { format, isValid } from "date-fns";
import { ParticipationButton } from "./participation-button";

function formatSafeDate(
  date: Date | null | undefined,
  formatString: string,
): string {
  if (date && isValid(date)) {
    return format(date, formatString);
  }
  return "No date";
}

function formatSafeTime(
  time: string | null | undefined,
  formatString: string,
): string {
  if (time) return format(new Date(time), formatString);
  return "No time";
}

interface EventDetailsProps {
  event: {
    eventId: string;
    eventName: string;
    location: string;
    startDate: Date;
    endDate: Date | null;
    startTime: string | null;
    endTime: string | null;
    description: string | null;
    groupId: string | null;
    sectionId: string | null;
  };
  creator?: {
    userId: string;
    name: string;
    image: string | null;
  };
  user?: {
    userId: string;
    name: string;
    image: string | null;
  };
  participants: {
    userId?: string;
    name?: string;
    image?: string | null;
    status: "participate" | "maybe";
  }[];
}

export default function EventDetails({
  event,
  user,
  creator,
  participants,
}: EventDetailsProps) {
  const t = useI18n();
  // const queryClient = useQueryClient();

  // const { mutate, isPending, variables } = useMutation({
  //   mutationFn: (data: Partial<CreateEventFormFields>) =>
  //     editEvent(event.eventId, {
  //       name: data.name || event.eventName,
  //       location: data.location || event.location,
  //       startDate: data.startDate || event.startDate.toISOString(),
  //       startTime: data.startTime || event.startTime || null,
  //       endDate: data.endDate || event.endDate?.toISOString() || null,
  //       endTime: data.endTime || event.endTime || null,
  //       group: data.group || event.groupId || "",
  //       description:
  //         data.description === ""
  //           ? ""
  //           : data.description || event.description || "",
  //       sectionId: event.sectionId || null,
  //       date: "",
  //     }),
  //   onSettled: async () => {
  //     return await queryClient.invalidateQueries({
  //       queryKey: ["event", encode(event.eventId)],
  //     });
  //   },
  // });

  const currentUserParticipation = participants.find(
    (participant) => participant.userId === user?.userId,
  );

  return (
    <Card className="flex-1 overflow-hidden border-none shadow-none md:m-2">
      <CardContent className="flex h-full flex-col gap-4 p-4 md:flex-row">
        <div className="flex-1">
          <div className="flex justify-between gap-2 pb-4">
            <h1 className="text-xl font-bold">{event.eventName}</h1>
            <ParticipationButton
              eventId={event.eventId}
              currentUserParticipation={currentUserParticipation}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-muted-foreground">
              <CalendarIcon className="mr-2 size-5" />
              <span>{formatSafeDate(event.startDate, "PPP")}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <ClockIcon className="mr-2 size-5" />
              <span>{formatSafeTime(event.startTime, "HH:mm")}</span>
              {" - "}
              <span>{formatSafeTime(event.endTime, "HH:mm")}</span>
            </div>
            {event.endDate && (
              <div className="flex items-center text-muted-foreground">
                <CalendarIcon className="mr-2 size-5" />
                <span>{formatSafeDate(event.endDate, "PPP")}</span>
              </div>
            )}
            <div className="flex items-center text-muted-foreground">
              <MapPinIcon className="mr-2 size-5" />

              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <UserIcon className="mr-2 size-5 text-muted-foreground" />
              <span className="mr-2 text-muted-foreground">
                {t("eventDetails.createdBy")}:
              </span>
              <span>{creator?.name}</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">
                {t("eventDetails.participants")}
              </h2>
              <ParticipantsList participants={participants} />
            </div>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="ml-2 hidden bg-gradient-to-b dark:from-card dark:via-zinc-700/30 dark:to-card md:block"
        />
        <h2 className="text-xl font-semibold">Description</h2>
        <p>{event.description || ""}</p>
      </CardContent>
    </Card>
  );
}

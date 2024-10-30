"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useJoinGroup } from "../hooks/use-join-group";
import { Loader } from "lucide-react";
import { useI18n } from "@/locales/client";

export default function JoinModal({
  hasJoined,
  groupId,
}: {
  hasJoined: boolean;
  groupId: string;
}) {
  const t = useI18n();
  const { handleJoin, isPending } = useJoinGroup({ hasJoined, groupId });

  return (
    <AlertDialog defaultOpen={!hasJoined}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("joinButton.joinGroupTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("joinButton.joinGroupDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("joinButton.no")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleJoin}>
            {isPending ? <Loader className="mr-2 size-4 animate-spin" /> : null}
            {t("joinButton.yes")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

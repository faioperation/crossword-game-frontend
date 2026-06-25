import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText } from "lucide-react";

export function Rules() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScrollText className="h-5 w-5 text-primary" />
          Giveaway Rules
        </CardTitle>
        <CardDescription>Please read the rules before entering.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
          <li>
            <strong>Eligibility:</strong> Open to all legal residents who are 18 years of age or older at the time of entry.
          </li>
          <li>
            <strong>Entry Limit:</strong> STRICTLY ONE ENTRY PER PERSON PER DAY. You may enter by solving the daily crossword puzzle or by using the alternate entry method.
          </li>
          <li>
            <strong>Prize:</strong> The prize for each day is displayed in the Prize Information section. Prizes are non-transferable and no cash equivalent is offered.
          </li>
          <li>
            <strong>Winner Selection:</strong> Winners are selected randomly from all eligible entries received that day.
          </li>
          <li>
            <strong>Notification:</strong> Winners will be notified via the email address provided during entry.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

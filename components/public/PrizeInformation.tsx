import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift } from "lucide-react";
import type { Prize } from "@/types";

export function PrizeInformation({ prize }: { prize?: Prize }) {
  if (!prize) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Today's Prize
        </CardTitle>
        <CardDescription>Solve the puzzle to enter the giveaway!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6 items-center">
        {prize.imageUrl ? (
          <div className="w-full md:w-1/3 aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            {/* Using a placeholder since we don't have next/image setup with a domain yet */}
            <img src={prize.imageUrl} alt={prize.name} className="object-cover w-full h-full" />
          </div>
        ) : (
          <div className="w-full md:w-1/3 aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold">{prize.name}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {prize.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Seite nicht gefunden - Schreinerei Krickl Esslingen";
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold">Seite nicht gefunden</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground mb-6">
            Die gewünschte Seite konnte leider nicht gefunden werden. Vielleicht finden Sie auf unserer Startseite, was Sie suchen.
          </p>

          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Zur Startseite
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

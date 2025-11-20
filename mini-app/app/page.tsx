
import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import MoodPalCanvas from "@/components/MoodPalCanvas";

export { generateMetadata };

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 gap-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <MoodPalCanvas />
    </main>
  );
}

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function OptionItem({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <Label className="text-muted-foreground block">{title}</Label>

      {children}
    </div>
  );
}

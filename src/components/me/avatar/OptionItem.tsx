import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function OptionItem({
  children,
  title,
  className,
  labelClassName,
  labelFor,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
  labelClassName?: string;
  labelFor?: string; // Optional: For accessibility purposes
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <Label
        htmlFor={labelFor}
        className={cn("text-muted-foreground block", labelClassName)}
      >
        {title}
      </Label>

      {children}
    </div>
  );
}

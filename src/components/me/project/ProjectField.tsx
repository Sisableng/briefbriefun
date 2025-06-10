import { memo } from "react";

// Memoized ProjectField component
const ProjectField = memo(
  ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
      <div>
        <p className="text-muted-foreground text-sm">{title}</p>
        {children}
      </div>
    );
  },
);

ProjectField.displayName = "ProjectField";

export default ProjectField;

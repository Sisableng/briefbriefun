import {
  industryOptions,
  typeOptions,
} from "@/components/forms/projects/options";

// Pre-compute lookup tables once when module is loaded
const typeNameLookup = new Map<string, string>();
const industryNameLookup = new Map<string, string>();

// Initialize type lookup table
typeOptions
  .flatMap((x) => x.options)
  .forEach((option) => {
    typeNameLookup.set(option.value, option.name);
  });

// Initialize industry lookup table
industryOptions.forEach((option) => {
  industryNameLookup.set(option.value, option.name);
});

export const getTypeName = (type: string): string => {
  return typeNameLookup.get(type) || type;
};

export const getIndustryName = (type: string): string => {
  return industryNameLookup.get(type) || type;
};

// Optional: Functions to rebuild lookup tables if options change
export const rebuildTypeLookup = () => {
  typeNameLookup.clear();
  typeOptions
    .flatMap((x) => x.options)
    .forEach((option) => {
      typeNameLookup.set(option.value, option.name);
    });
};

export const rebuildIndustryLookup = () => {
  industryNameLookup.clear();
  industryOptions.forEach((option) => {
    industryNameLookup.set(option.value, option.name);
  });
};

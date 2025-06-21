import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
  Children,
  isValidElement,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { CheckIcon, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Scroller } from "./scroller";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { useDebounceValue } from "@/hooks/useDebounce";

// Types
export interface AutocompleteContextType {
  isOpen: boolean;
  inputValue: string;
  highlightedIndex: number;
  filteredItems: AutocompleteItemData[];
  allItems: AutocompleteItemData[];
  onItemSelect: (item: AutocompleteItemData) => void;
  setHighlightedIndex: (index: number) => void;
  noOptionsMessage?: string;
}

export interface AutocompleteItemData {
  value: string;
  label: string;
  group?: string;
}

// Ref types for external control
export interface AutocompleteRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
  focus: () => void;
  blur: () => void;
  clear: () => void;
  setValue: (value: string) => void;
  getValue: () => string;
  getFilteredItems: () => AutocompleteItemData[];
  isOpen: () => boolean;
}

export interface AutocompleteContentRef {
  scrollToTop: () => void;
  scrollToBottom: () => void;
  getElement: () => HTMLDivElement | null;
}

export interface AutocompleteGroupRef {
  getElement: () => HTMLDivElement | null;
  isVisible: () => boolean;
}

export interface AutocompleteItemRef {
  getElement: () => HTMLDivElement | null;
  select: () => void;
  getValue: () => string;
}

// Type guards for checking component types
const isAutocompleteItem = (
  child: any,
): child is React.ReactElement<AutocompleteItemProps> => {
  return isValidElement(child) && child.type === AutocompleteItem;
};

const isAutocompleteGroup = (
  child: any,
): child is React.ReactElement<AutocompleteGroupProps> => {
  return isValidElement(child) && child.type === AutocompleteGroup;
};

const isAutocompleteContent = (
  child: any,
): child is React.ReactElement<AutocompleteContentProps> => {
  return isValidElement(child) && child.type === AutocompleteContent;
};

// Context
const AutocompleteContext = createContext<AutocompleteContextType | null>(null);

const useAutocomplete = () => {
  const context = useContext(AutocompleteContext);
  if (!context) {
    throw new Error(
      "Autocomplete components must be used within an Autocomplete",
    );
  }
  return context;
};

// Main Autocomplete Component
export interface AutocompleteProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSelect?: (item: AutocompleteItemData | null) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  disabled?: boolean;
  clearable?: boolean;
  noOptionsMessage?: string;
  isDark?: boolean;
  children: ReactNode;
}

export const Autocomplete = forwardRef<AutocompleteRef, AutocompleteProps>(
  (
    {
      value = "",
      placeholder = "Type to search...",
      onChange,
      onSelect,
      onOpen,
      onClose,
      onBlur,
      onFocus,
      className = "",
      disabled = false,
      clearable = true,
      noOptionsMessage = "No options found",
      isDark,
      children,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Extract items from children
    const extractItems = useCallback(
      (children: ReactNode): AutocompleteItemData[] => {
        const items: AutocompleteItemData[] = [];

        const processChildren = (children: ReactNode, groupLabel?: string) => {
          Children.forEach(children, (child) => {
            if (isAutocompleteItem(child)) {
              items.push({
                value: child.props.value,
                label:
                  typeof child.props.children === "string"
                    ? child.props.children
                    : child.props.value,
                group: groupLabel,
              });
            } else if (isAutocompleteGroup(child)) {
              processChildren(child.props.children, child.props.label);
            } else if (isAutocompleteContent(child)) {
              processChildren(child.props.children);
            }
          });
        };

        processChildren(children);
        return items;
      },
      [],
    );

    const allItems = extractItems(children);

    const debouncedInputValue = useDebounceValue(inputValue, 100);

    // Filter items based on input value
    const filteredItems = allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(debouncedInputValue.toLowerCase()) ||
        item.value.toLowerCase().includes(debouncedInputValue.toLowerCase()),
    );

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
        onOpen?.();
      },
      close: () => {
        setIsOpen(false);
        setHighlightedIndex(-1);
        onClose?.();
      },
      toggle: () => {
        if (isOpen) {
          setIsOpen(false);
          setHighlightedIndex(-1);
          onClose?.();
        } else {
          setIsOpen(true);
          onOpen?.();
        }
      },
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
      clear: () => {
        setInputValue("");
        setIsOpen(false);
        setHighlightedIndex(-1);
        onChange?.("");
        onSelect?.(null);
      },
      setValue: (newValue: string) => {
        setInputValue(newValue);
        onChange?.(newValue);
      },
      getValue: () => inputValue,
      getFilteredItems: () => filteredItems,
      isOpen: () => isOpen,
    }));

    // Update input value when value prop changes
    useEffect(() => {
      setInputValue(value);
    }, [value]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              onOpen?.();
            } else {
              setHighlightedIndex((prev) =>
                prev < allItems.length - 1 ? prev + 1 : 0,
              );
            }
            break;

          case "ArrowUp":
            e.preventDefault();
            if (isOpen) {
              setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : allItems.length - 1,
              );
            }
            break;

          case "Enter":
            e.preventDefault();
            if (isOpen && highlightedIndex >= 0) {
              handleItemSelect(allItems[highlightedIndex]);
            }
            break;

          case "Escape":
            setIsOpen(false);
            setHighlightedIndex(-1);
            inputRef.current?.blur();
            onClose?.();
            break;

          case "Tab":
            setIsOpen(false);
            setHighlightedIndex(-1);
            onClose?.();
            break;
        }
      },
      [isOpen, highlightedIndex, filteredItems, disabled, onOpen, onClose],
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      if (!isOpen) {
        setIsOpen(true);
        onOpen?.();
      }

      setHighlightedIndex(-1);
      onChange?.(newValue);
    };

    const handleInputClick = () => {
      if (disabled) return;
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      if (newIsOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
    };

    const handleItemSelect = (item: AutocompleteItemData) => {
      setInputValue(item.label);
      setIsOpen(false);
      setHighlightedIndex(-1);
      onChange?.(item.label);
      onSelect?.(item);
      onClose?.();
    };

    const handleClear = () => {
      setInputValue("");
      setIsOpen(false);
      setHighlightedIndex(-1);
      onChange?.("");
      onSelect?.(null);
      inputRef.current?.focus();
      onClose?.();
    };

    const handleChevronClick = () => {
      if (disabled) return;
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      inputRef.current?.focus();
      if (newIsOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
    };

    const contextValue: AutocompleteContextType = {
      isOpen,
      inputValue: debouncedInputValue,
      highlightedIndex,
      filteredItems,
      allItems,
      onItemSelect: handleItemSelect,
      setHighlightedIndex,
      noOptionsMessage,
    };

    return (
      <AutocompleteContext.Provider value={contextValue}>
        <div ref={containerRef} className={cn(`relative w-full`)}>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onClick={handleInputClick}
                  onKeyDown={handleKeyDown}
                  onBlur={onFocus}
                  onFocus={onBlur}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={cn(
                    `peer bg-secondary dark:border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 text-foreground flex min-h-10 w-fit items-center justify-between gap-2 rounded-full px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-10 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
                    className,
                  )}
                />

                <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
                  {clearable && inputValue && !disabled && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="text-muted-foreground hover:bg-accent bg-secondary cursor-pointer rounded-sm p-1"
                    >
                      <X size={14} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleChevronClick}
                    disabled={
                      disabled ||
                      (value.length > 0 && filteredItems.length === 0)
                    }
                    className={cn(
                      `text-muted-foreground cursor-pointer rounded-sm p-1 opacity-50 transition-transform duration-200 disabled:pointer-events-none disabled:cursor-not-allowed`,
                      isOpen && filteredItems.length > 0
                        ? "rotate-180 transform"
                        : "",
                    )}
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="center"
              className={cn("border-0 p-1.5", isDark && "dark")}
              style={{
                maxWidth: inputRef.current?.offsetWidth,
              }}
            >
              {children}
            </PopoverContent>
          </Popover>
        </div>
      </AutocompleteContext.Provider>
    );
  },
);

Autocomplete.displayName = "Autocomplete";

// AutocompleteContent Component
export interface AutocompleteContentProps {
  children: ReactNode;
  className?: string;
}

export const AutocompleteContent = forwardRef<
  AutocompleteContentRef,
  AutocompleteContentProps
>(({ children, className = "" }, ref) => {
  const { isOpen, filteredItems, inputValue } = useAutocomplete();
  const contentRef = useRef<HTMLDivElement>(null);
  const itemIndexRef = useRef(0);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    },
    scrollToBottom: () => {
      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: contentRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    },
    getElement: () => contentRef.current,
  }));

  const indexContextValue = {
    getNextIndex: () => {
      const current = itemIndexRef.current;
      itemIndexRef.current += 1;
      return current;
    },
    resetIndex: () => {
      itemIndexRef.current = 0;
    },
  };

  // Reset index when content re-renders
  useEffect(() => {
    itemIndexRef.current = 0;
  }, []);

  if (!isOpen || (inputValue.length > 0 && filteredItems.length === 0))
    return null;

  // Reset index before rendering children
  itemIndexRef.current = 0;

  return (
    <div
      ref={contentRef}
      className={cn(`mt-1 flex max-h-80 flex-col`, className)}
    >
      <Scroller className="bg-transparent shadow-none">
        {filteredItems.length > 0 && (
          <ItemIndexContext.Provider value={indexContextValue}>
            {children}
          </ItemIndexContext.Provider>
        )}
      </Scroller>
    </div>
  );
});

AutocompleteContent.displayName = "AutocompleteContent";

// AutocompleteGroup Component
export interface AutocompleteGroupProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const AutocompleteGroup = forwardRef<
  AutocompleteGroupRef,
  AutocompleteGroupProps
>(({ label, children, className = "" }, ref) => {
  const { filteredItems } = useAutocomplete();
  const groupRef = useRef<HTMLDivElement>(null);

  // Check if any items in this group match the filter
  const hasVisibleItems = Children.toArray(children).some((child) => {
    if (isAutocompleteItem(child)) {
      return filteredItems.some(
        (item) => item.value === child.props.value && item.group === label,
      );
    }
    return false;
  });

  useImperativeHandle(ref, () => ({
    getElement: () => groupRef.current,
    isVisible: () => hasVisibleItems,
  }));

  if (!hasVisibleItems) return null;

  return (
    <div ref={groupRef} className={cn("not-last:mb-4", className)}>
      <span className="text-muted-foreground px-3 text-xs font-semibold">
        {label}
      </span>

      {children}
    </div>
  );
});

AutocompleteGroup.displayName = "AutocompleteGroup";

// Context for tracking item index
const ItemIndexContext = createContext<{
  getNextIndex: () => number;
  resetIndex: () => void;
}>({
  getNextIndex: () => 0,
  resetIndex: () => {},
});

// AutocompleteItem Component
export interface AutocompleteItemProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  selected?: boolean;
}

export const AutocompleteItem = forwardRef<
  AutocompleteItemRef,
  AutocompleteItemProps
>(({ value, children, className = "", disabled = false, selected }, ref) => {
  const { filteredItems, highlightedIndex, onItemSelect, setHighlightedIndex } =
    useAutocomplete();
  const itemRef = useRef<HTMLDivElement>(null);

  const matchedItem = filteredItems.find((item) => item.value === value);
  const index = matchedItem ? filteredItems.indexOf(matchedItem) : -1;

  const isVisible = !!matchedItem;

  useImperativeHandle(ref, () => ({
    getElement: () => itemRef.current,
    select: () => {
      if (!disabled && matchedItem) {
        onItemSelect(matchedItem);
      }
    },
    getValue: () => value,
  }));

  if (!isVisible) return null;

  const isHighlighted = index === highlightedIndex;

  const handleClick = () => {
    if (!disabled && matchedItem) {
      onItemSelect(matchedItem);
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setHighlightedIndex(index);
    }
  };

  return (
    <div
      ref={itemRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={cn(
        `flex items-center justify-between gap-2 rounded-sm px-3 py-2 text-sm`,
        disabled ? "pointer-events-none opacity-50" : `cursor-pointer`,
        isHighlighted ? "bg-accent" : "hover:bg-accent",
        className,
      )}
    >
      {children}

      {selected && <CheckIcon />}
    </div>
  );
});

AutocompleteItem.displayName = "AutocompleteItem";

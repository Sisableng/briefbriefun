import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import clsx from "clsx";
import { Scroller } from "./scroller";

interface SuggestionInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suggestions: string[];
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSuggestionSelect?: (suggestion: string) => void;
  className?: string;
  anchorClassName?: string;
  selectedSuggestions?: string[];
}

export const SuggestionInput = forwardRef<
  HTMLInputElement,
  SuggestionInputProps
>(
  (
    {
      suggestions,
      placeholder,
      defaultValue = "",
      onValueChange,
      onSuggestionSelect,
      className,
      anchorClassName,
      selectedSuggestions = [],
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(defaultValue);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
      [],
    );
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

    const innerRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    // const containerRef = useRef<HTMLDivElement>(null);

    // Combine the forwarded ref with our internal ref
    // const inputRef = (ref as React.RefObject<HTMLInputElement>) || innerRef;

    const [inputRect, setInputRect] = useState<DOMRect | null>(null);

    // useOnClickOutside(suggestionsRef as any, () => setIsFocused(false));

    // Capture the input's size and position
    useEffect(() => {
      if (innerRef.current) {
        const updateRect = () => {
          const rect = innerRef.current!.getBoundingClientRect();
          setInputRect(rect);
        };
        updateRect();
        window.addEventListener("resize", updateRect);
        window.addEventListener("scroll", updateRect, true);
        return () => {
          window.removeEventListener("resize", updateRect);
          window.removeEventListener("scroll", updateRect, true);
        };
      }
    }, [isFocused]); // Update position when focused state changes

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.value = defaultValue;
      }
      setInputValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
      updateSuggestions(inputValue);
    }, [inputValue, selectedSuggestions, suggestions]);

    const updateSuggestions = (value: string) => {
      const availableSuggestions = suggestions.filter(
        (suggestion) => !selectedSuggestions.includes(suggestion),
      );

      if (value.length > 0) {
        const filtered = availableSuggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredSuggestions(filtered);
      } else {
        setFilteredSuggestions(availableSuggestions);
      }
      setSelectedSuggestionIndex(0);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onValueChange?.(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (filteredSuggestions.length > 0) {
        if (!isFocused) {
          setIsFocused(true);
        }

        if (e.key === "Tab" || e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedSuggestionIndex((prevIndex) =>
            prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0,
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedSuggestionIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1,
          );
        } else if (e.key === "Enter") {
          e.preventDefault();
          applySuggestion(filteredSuggestions[selectedSuggestionIndex]);
        }
      }
    };

    const applySuggestion = (suggestion: string) => {
      if (innerRef.current) {
        setInputValue(suggestion);
        innerRef.current.value = suggestion;
        onValueChange?.(suggestion);
        onSuggestionSelect?.(suggestion);
        setIsFocused(false);
      }
    };

    const handleFocus = () => {
      setIsFocused(!isFocused);
      updateSuggestions(inputValue);

      // Force recalculation of input position
      if (innerRef.current) {
        const rect = innerRef.current.getBoundingClientRect();
        setInputRect(rect);
      }
    };

    const handleBlur = (e: React.FocusEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.relatedTarget as Node)
      ) {
        setTimeout(() => setIsFocused(false), 200);
      }
    };

    return (
      <Popover
        modal
        open={filteredSuggestions.length > 0 && isFocused}
        onOpenChange={setIsFocused}
      >
        <PopoverAnchor className={anchorClassName}>
          <Input
            ref={innerRef}
            value={inputValue}
            placeholder={placeholder}
            className={cn(
              "peer w-full focus-visible:ring-0 dark:border-transparent",
              className,
            )}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            // onClick={handleFocus}
            onFocus={handleFocus}
            autoComplete="off"
            {...props}
          />
        </PopoverAnchor>

        {/* {filteredSuggestions.length > 0 && isFocused && inputRect && (
        )} */}
        <PopoverContent
          className="overflow-hidden p-0"
          style={{
            width: `${inputRect?.width}px`,
          }}
        >
          <Scroller>
            <ul className="max-h-40 py-1 text-sm">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    className={clsx(
                      `hover:bg-secondary cursor-pointer px-4 py-2`,
                      // index === selectedSuggestionIndex ? "bg-secondary" : ""
                    )}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      applySuggestion(suggestion);
                    }}
                  >
                    {suggestion}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2">
                  <p className="text-muted-foreground text-sm">
                    No suggestions found
                  </p>
                </li>
              )}
            </ul>
          </Scroller>
        </PopoverContent>
      </Popover>
    );
  },
);

SuggestionInput.displayName = "SuggestionInput";

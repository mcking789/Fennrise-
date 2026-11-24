"use client";

import Chevron from "../components/Chevron";
import { useId } from "react";
import * as Select from "@radix-ui/react-select";
import c from "./albums.module.css";

type Option = { value: string; label: string };
type Props = {
  name: string;
  value: string;
  options: readonly (string | Option)[];
  onChange: (value: string) => void;
  disabled?: boolean;
  hideLabel?: boolean;
};

export default function AlbumSelect({ name, value, options, onChange, disabled, hideLabel }: Props) {
  const id = useId();
  const items = options.map(item => typeof item === "string" ? { value: item, label: item } : item);
  const current = items.find(item => item.value === value);
  return (
    <div className={c.selectField}>
      {!hideLabel && <label htmlFor={id}>{name}</label>}
      <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
        <Select.Trigger id={id} className={c.selectTrigger} aria-label={name}>
          <Select.Value>{current?.label}</Select.Value>
          <span className={c.selectMark} aria-hidden="true"><Chevron direction="down" /></span>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={c.selectMenu} position="popper" align="start" sideOffset={6} collisionPadding={10} aria-label={name}>
            <Select.Viewport className={c.selectList}>
              {items.map(item => (
                <Select.Item key={item.value} value={item.value} className={c.selectItem}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator className={c.selectedDot} />
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

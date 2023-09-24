import { ReactNode } from 'react';

interface ISelector<T extends string | number> {
  value?: T;
  options?: {
    label: ReactNode;
    value: T;
  }[];
  onSelect?: (value: T) => void;
  label?: ReactNode;
}

const defFunc = () => {};

const Selector = <T extends string | number>({
  label,
  options,
  value,
  onSelect = defFunc,
}: ISelector<T>) => {
  return (
    <div className="flex flex-col">
      {label}
      <select
        value={value}
        onChange={(v) => {
          // @ts-ignore
          onSelect(v.target.value);
        }}
        // onSelect={(v) => {
        //   // @ts-ignore
        //   onSelect(v.target.value);
        //   setHidden(true);
        // }}
      >
        {options?.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selector;

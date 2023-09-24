import { Dispatch, ReactNode, SetStateAction } from 'react';

interface ISelector<T extends string | number> {
  hidden?: boolean;
  setHidden?: Dispatch<SetStateAction<boolean>>;
  value?: string;
  options?: {
    label: ReactNode;
    value: T;
  }[];
  onSelect?: (value: T) => void;
}

const defFunc = () => {};

const Selector = <T extends string | number>({
  hidden,
  setHidden = defFunc,
  options,
  value,
  onSelect = defFunc,
}: ISelector<T>) => {
  if (hidden) {
    return null;
  }
  return (
    <select
      value={value}
      onSelect={(v) => {
        // @ts-ignore
        onSelect(v.target.value);
        setHidden(true);
      }}
    >
      {options?.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Selector;

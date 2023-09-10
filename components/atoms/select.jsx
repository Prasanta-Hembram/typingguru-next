import RSelect from 'react-select';
import classNames from 'classnames';
import { useState } from 'react';
import tailwindConfig from '../../tailwind.config';

export const Select = ({
  className = '',
  error = '',
  label = '',
  onBlur = () => {},
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const theme = (_theme) => {
    return {
      ..._theme,
      borderWidth: 1,
      outline: 'none',
      colors: {
        ..._theme.colors,
        primary: tailwindConfig.theme.extend.colors.primary['400'],
        primary75: tailwindConfig.theme.extend.colors.primary['200'],
        primary50: tailwindConfig.theme.extend.colors.primary['100'],
        primary25: tailwindConfig.theme.extend.colors.primary['50'],
      },
      spacing: {
        baseUnit: 5,
      },
    };
  };
  return (
    <div
      className={classNames('flex flex-col gap-1 z-10', className, {
        'opacity-50 cursor-not-allowed': props.disabled,
        'cursor-text': !props.disabled,
      })}
    >
      <span
        className={classNames('font-medium', {
          'text-primary-500': focused,
          'text-secondary': !focused,
          ' text-red-700': error,
        })}
      >
        {error || label}
      </span>
      <RSelect
        {...props}
        theme={theme}
        onBlur={() => {
          onBlur();
          setFocused(false);
        }}
        onFocus={() => {
          setFocused(true);
        }}
        isSearchable
      />
    </div>
  );
};

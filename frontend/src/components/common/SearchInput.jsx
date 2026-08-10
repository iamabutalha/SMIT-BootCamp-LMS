import { Search, X } from 'lucide-react';
import { Input } from '../ui/Input';

export function SearchInput({ value, onChange, placeholder = 'Search...', onClear, ...props }) {
  return (
    <Input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      icon={<Search className="w-4 h-4" />}
      rightIcon={
        value ? (
          <button
            type="button"
            onClick={onClear}
            className="hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        ) : null
      }
      {...props}
    />
  );
}

export default SearchInput;

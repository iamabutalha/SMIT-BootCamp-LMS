function Select({
  label,
  options = [],
  children,
  error,
  helperText,
  required = false,
  placeholder,
  id,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-xs font-semibold text-text"
        >
          {label}

          {required && (
            <span className="ml-1 text-danger">*</span>
          )}
        </label>
      )}

      <select
        id={id}
        className={`
          w-full
          rounded-lg
          border
          bg-surface
          px-3
          py-2.5
          text-sm
          text-text
          outline-none
          transition
          focus:ring-2
          focus:ring-primary/20
          disabled:cursor-not-allowed
          disabled:bg-background
          disabled:opacity-60
          ${
            error
              ? "border-danger focus:border-danger"
              : "border-border focus:border-primary"
          }
          ${className}
        `}
        aria-invalid={Boolean(error)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.length > 0
          ? options.map((option) => (
              <option
                key={typeof option === "object" ? option.value : option}
                value={typeof option === "object" ? option.value : option}
              >
                {typeof option === "object" ? option.label : option}
              </option>
            ))
          : children}
      </select>

      {error ? (
        <p className="mt-1 text-xs text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default Select;
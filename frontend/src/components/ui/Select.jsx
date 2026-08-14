function Select({
  label,
  options = [],
  error,
  helperText,
  required = false,
  placeholder = "Select an option",
  id,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-text"
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
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
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
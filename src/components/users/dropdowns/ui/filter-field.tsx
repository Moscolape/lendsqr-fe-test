interface FilterFieldProps {
  // Visible label for the field (also used for accessibility)
  label: string;

  // Controlled value from parent state
  value: string;

  // Emits updated value to parent component
  onChange: (value: string) => void;

  // Input type for non-select fields
  type?: "text" | "email" | "date" | "tel";

  // Optional select options; presence switches component to <select>
  options?: { label: string; value: string }[];

  // Optional placeholder text for input fields
  placeholder?: string;
}

const FilterField: React.FC<FilterFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  options,
  placeholder,
}) => {
  // Generate a stable, accessible id based on label text
  const inputId = `filter-field-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="field">
      {/* Label is always rendered for accessibility */}
      <label htmlFor={inputId}>{label}</label>

      {/* Render select if options are provided, otherwise fallback to input */}
      {options ? (
        <select
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {/* Default empty option to represent "no filter" */}
          <option value="">Select</option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default FilterField;

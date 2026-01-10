interface FilterFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "date" | "tel";
  options?: { label: string; value: string }[];
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
  const inputId = `filter-field-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="field">
      <label htmlFor={inputId}>{label}</label>

      {options ? (
        <select
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
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

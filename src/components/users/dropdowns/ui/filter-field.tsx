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
  return (
    <div className="field">
      <label>{label}</label>

      {options ? (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
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

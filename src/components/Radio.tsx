export default function Radio({
  label,
  checked,
  value,
  onChange,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange?: (c: boolean) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="radio"
        value={value}
        checked={checked}
        style={{ marginBottom: 0, marginRight: 10 }}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <label style={{ marginBottom: 0 }}>{label}</label>
    </div>
  );
}

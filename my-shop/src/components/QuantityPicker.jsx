import { Button } from "./ui/button";

/**
 * QuantityPicker for choosing product quantity, min 1 max 99.
 */
export default function QuantityPicker({ value, setValue, size = "default" }) {
  const dec = () => setValue((v) => Math.max(1, (typeof v === "number" ? v : Number(v)) - 1));
  const inc = () => setValue((v) => Math.min(99, (typeof v === "number" ? v : Number(v)) + 1));
  return (
    <div className="inline-flex items-center gap-2">
      <Button type="button" variant="outline" size={size} onClick={dec} aria-label="Decrease quantity">-</Button>
      <input
        aria-label="Quantity"
        type="number"
        min={1}
        max={99}
        value={value}
        onChange={(e) => setValue(Math.max(1, Math.min(99, Number(e.target.value))))}
        className="w-16 h-10 rounded-md border border-input bg-transparent px-2 text-center text-sm"
      />
      <Button type="button" variant="outline" size={size} onClick={inc} aria-label="Increase quantity">+</Button>
    </div>
  );
}
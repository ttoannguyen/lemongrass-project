import { Input } from "@/components/ui/input";
import { GenericCombobox } from "./generic-combobox";

type Props = {
  quantity: number;
  unitId: string;
  units: { id: string; name: string }[];
  onChange: (newData: { quantity: number; unitId: string }) => void;
};

const QuantityWithUnit = ({ quantity, unitId, units, onChange }: Props) => {
  return (
    <div className="flex flex-row border-none overflow-hidden w-[170px]">
      <Input
        type="number"
        value={quantity}
        min={0}
        onChange={(e) => onChange({ quantity: Number(e.target.value), unitId })}
        className="rounded-r-none rounded-l border border-r-0 w-20 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <GenericCombobox
        value={unitId}
        options={units}
        onChange={(value) => onChange({ quantity, unitId: value })}
        placeholder="Đơn vị"
        buttonClassName="rounded-l-none rounded-r bg-main!  w-[90px] text-left"
        contentClassName="w-[170px] p-0 bg-white"
      />
    </div>
  );
};

export default QuantityWithUnit;

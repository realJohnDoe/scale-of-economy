import { ORDER_LABELS, type OrderBy } from "./geometry";

type DropdownProps = {
  orderBy: OrderBy;
  setOrderBy: (orderBy: OrderBy) => void;
};

const ORDER_OPTIONS: OrderBy[] = [
  "yearlyTurnOver",
  "numberOfPersons",
  "turnoverPerPerson",
];

function Dropdown({ orderBy, setOrderBy }: DropdownProps) {
  return (
    <label className="flex items-center">
      <span className="mr-2">Visualizing</span>
      <select
        value={orderBy}
        onChange={(e) => setOrderBy(e.target.value as OrderBy)}
        className="bg-gray-700 text-white rounded p-2"
      >
        {ORDER_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {ORDER_LABELS[option]}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Dropdown;

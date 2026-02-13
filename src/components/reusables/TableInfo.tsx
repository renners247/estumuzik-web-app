import { FormatMoney } from "../utils/function";

interface TableInfoProps {
  transactions: number;
  amount: string;
}

const TableInfo = ({ transactions, amount }: TableInfoProps) => {
  return (
    <div className="flex flex-row justify-start items-center gap-2 px-2">
      <span className="text-gray-600 text-sm">{transactions} Transactions</span>
      <span className="w-[6px] h-[6px] rounded-full bg-gray-400 block"></span>
      <span className="text-gray-600 text-sm">
        <FormatMoney value={amount} /> Total amount
      </span>
    </div>
  );
};

export default TableInfo;

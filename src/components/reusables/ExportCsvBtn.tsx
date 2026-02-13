import { FaArrowsSpin } from "react-icons/fa6";
import { BsDownload } from "react-icons/bs";
interface ExportButtonProps {
  text: string;
  isLoading?: boolean;
  onClick: () => void;
  size?: "sm" | "md";
  className?: string;
}
export const ExportCsvButton = ({
  text,
  isLoading = false,
  onClick,

  size = "sm",
  className,
}: ExportButtonProps) => {
  const sizeClasses = {
    sm: "px-2 py-2 text-xs lg:text-sm",
    md: "px-4 py-2 text-sm lg:text-base",
  };
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={` ${sizeClasses[size]} bg-primary-100-100 text-white hover:bg-primary-100-100/80 rounded flex items-center gap-1 lg:gap-2 transition-colors ${className}`}>
      {text}
      {isLoading ? (
        <FaArrowsSpin className="animate-spin" size={size === "sm" ? 14 : 16} />
      ) : (
        <BsDownload size={size === "sm" ? 14 : 16} />
      )}
    </button>
  );
};
// Specific convenience components

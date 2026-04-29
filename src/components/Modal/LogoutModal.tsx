import { BsExclamationLg } from "react-icons/bs";

interface LogoutModalProps {
  onClose: () => void;
  onLogout: () => void;
  isLoading?: boolean;
}

const LogoutModal = ({ onClose, onLogout, isLoading }: LogoutModalProps) => {
  return (
    <div className="p-6 text-center rounded-2xl bg-black-100">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="rounded-full flex items-center justify-center w-16 h-16">
          <BsExclamationLg className="text-primary-500 text-4xl" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-lg font-mono text-white tracking-tight">
        Logging Out?
      </h3>
      <p className="text-sm text-white mt-2">
        Are you sure you want to log out of your account?
      </p>

      {/* Actions */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="py-3 rounded-xl border border-black-100 text-white hover:text-white/50 hover:border-white/20 font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={onLogout}
          disabled={isLoading}
          className="py-3 rounded-xl bg-danger-600 hover:bg-danger-700 text-white font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isLoading ? (
            <>
              <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Logging out...
            </>
          ) : (
            "Log Out"
          )}
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;

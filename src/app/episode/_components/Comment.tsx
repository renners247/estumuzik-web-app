import { formatDateTime } from "../../../components/utils/function";

interface Comment {
  user: User;
  comment: EpisodeComment;
}

const Comment = ({ user, comment }: Comment) => {
  const initials =
    `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();

  // Deterministic background color based on user ID
  const bgColors = [
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-emerald-500",
  ];
  const bgColor = bgColors[user.id % bgColors.length];

  return (
    <div className="flex gap-4 p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-xl hover:bg-zinc-800/40 transition-colors group">
      <div className="flex-shrink-0">
        {user.profile_image_url ? (
          <img
            src={user.profile_image_url}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-10 h-10 rounded-full object-cover border border-zinc-700"
          />
        ) : (
          <div
            className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white text-xs font-bold border border-white/10 shadow-inner`}
          >
            {initials}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="text-sm font-bold text-zinc-100 truncate group-hover:text-indigo-300 transition-colors">
            {user.first_name} {user.last_name}
          </h4>
          <span className="text-[10px] font-medium text-zinc-500 whitespace-nowrap uppercase tracking-wider">
            {formatDateTime(comment.created_at)}
          </span>
        </div>

        <p className="text-sm text-zinc-400 leading-relaxed break-words">
          {comment.body}
        </p>

        <div className="mt-3 flex items-center gap-4 text-[10px] font-bold text-zinc-600">
          {user.company_name && (
            <span className="ml-auto text-zinc-700 italic font-normal truncate">
              {user.company_name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;

"use client";

import { useState, useRef, useEffect } from "react";
import { formatDateTime } from "../../../components/utils/function";
import { MoreVertical, Pencil, Trash2, Check, X } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { APICall } from "@/components/utils/extra";
import { updateComment, deleteComment } from "@/components/utils/endpoints";

interface CommentProps {
  user: User;
  comment: EpisodeComment;
  currentUserId?: number; // pass current user's ID to show edit/delete only on own comments
  episodeId: string | number;
}

const Comment = ({ user, comment, currentUserId, episodeId }: CommentProps) => {
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.body);
  const menuRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isOwner = currentUserId === user.id;

  const initials =
    `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();

  const bgColors = [
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-emerald-500",
  ];
  const bgColor = bgColors[user.id % bgColors.length];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    }
  }, [isEditing]);

  const editMutation = useMutation(
    () =>
      APICall(
        updateComment,
        [comment.id, { body: editValue.trim() }],
        true,
        true,
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["episode-comments", String(episodeId)]);
        setIsEditing(false);
      },
      onError: (err) => console.error("Edit comment error:", err),
    },
  );

  const deleteMutation = useMutation(
    () => APICall(deleteComment, [comment.id], true, true),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["episode-comments", String(episodeId)]);
      },
      onError: (err) => console.error("Delete comment error:", err),
    },
  );

  const handleEditSubmit = () => {
    if (!editValue.trim() || editMutation.isLoading) return;
    editMutation.mutate();
  };

  const handleEditCancel = () => {
    setEditValue(comment.body);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex gap-4 p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-xl hover:bg-zinc-800/40 transition-colors group ${
        deleteMutation.isLoading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Avatar */}
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
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="text-sm font-bold text-zinc-100 truncate group-hover:text-indigo-300 transition-colors">
            {user.first_name} {user.last_name}
          </h4>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-zinc-500 whitespace-nowrap uppercase tracking-wider">
              {formatDateTime(comment.created_at)}
            </span>

            {/* Owner menu */}
            {!isEditing && (
              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-zinc-700 text-zinc-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical size={13} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-7 w-32 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 z-20">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setIsEditing(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      <Pencil size={11} className="text-indigo-400" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        deleteMutation.mutate();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={11} className="text-red-400" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Body — edit mode or plain text */}
        {isEditing ? (
          <div className="mt-1 space-y-2">
            <textarea
              ref={textareaRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleEditSubmit();
                }
                if (e.key === "Escape") handleEditCancel();
              }}
              disabled={editMutation.isLoading}
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-indigo-500 rounded-lg px-3 py-2 text-sm text-zinc-200 resize-none outline-none transition-colors disabled:opacity-50"
            />
            <div className="flex items-center gap-2 justify-end">
              <span className="text-[10px] text-zinc-600 mr-auto">
                Enter to save · Esc to cancel
              </span>
              <button
                onClick={handleEditCancel}
                disabled={editMutation.isLoading}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors disabled:opacity-50"
              >
                <X size={11} /> Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={!editValue.trim() || editMutation.isLoading}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editMutation.isLoading ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Check size={11} /> Save
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-zinc-400 leading-relaxed break-words">
            {comment.body}
          </p>
        )}

        {/* Footer */}
        {!isEditing && (
          <div className="mt-3 flex items-center gap-4 text-[10px] font-bold text-zinc-600">
            {user.company_name && (
              <span className="ml-auto text-zinc-700 italic font-normal truncate">
                {user.company_name}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

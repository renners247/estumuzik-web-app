"use client";

import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalContent } from "@heroui/react";
import { ListMusic, Trash2 } from "lucide-react";

// ─── Create / Edit Modal ───────────────────────────────────────────────────────

interface PlaylistFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  isLoading: boolean;
  mode: "create" | "edit";
  initialName?: string;
}

export const PlaylistFormModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  mode,
  initialName = "",
}: PlaylistFormModalProps) => {
  const [name, setName] = useState(initialName);

  // Sync name when switching playlists in edit mode
  useEffect(() => {
    setName(initialName);
  }, [initialName, isOpen]);

  const handleSubmit = () => {
    if (!name.trim() || isLoading) return;
    onConfirm(name.trim());
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
      <ModalContent>
        {(onClose) => (
          <ModalBody className="py-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
                <ListMusic className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {mode === "create" ? "New Playlist" : "Edit Playlist"}
              </h3>
              <p className="text-sm text-gray-400 mb-5">
                {mode === "create"
                  ? "Give your playlist a name to get started."
                  : "Update the name of your playlist."}
              </p>

              <input
                autoFocus
                type="text"
                placeholder="Playlist name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                disabled={isLoading}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-indigo-400 transition-colors disabled:opacity-50 mb-5"
              />

              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!name.trim() || isLoading}
                  className="px-4 py-2 w-32 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : mode === "create" ? (
                    "Create"
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

// ─── Delete Modal ──────────────────────────────────────────────────────────────

interface PlaylistDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  playlistName: string;
}

export const PlaylistDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  playlistName,
}: PlaylistDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
      <ModalContent>
        {(onClose) => (
          <ModalBody className="py-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Playlist
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-700">
                  "{playlistName}"
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="px-4 py-2 w-32 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

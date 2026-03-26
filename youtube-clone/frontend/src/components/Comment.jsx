import React, { useState } from "react";

const Comment = ({ comment, currentUser, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const handleSave = () => {
    onEdit(comment._id, text);
    setEditing(false);
  };

  return (
    <div className="border-b py-2 flex justify-between items-start">
      <div>
        <p className="font-semibold">{comment.userId?.username || "Unknown"}</p>
        {editing ? (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        ) : (
          <p>{comment.text}</p>
        )}
      </div>

      {/* Edit/Delete buttons */}
      {currentUser && comment.userId?._id === currentUser.id && (
        <div className="flex gap-2">
          {editing ? (
            <button onClick={handleSave} className="text-green-600">Save</button>
          ) : (
            <button onClick={() => setEditing(true)} className="text-blue-600">Edit</button>
          )}
          <button onClick={() => onDelete(comment._id)} className="text-red-600">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
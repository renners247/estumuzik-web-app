"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
// @ts-ignore
import "react-quill-new/dist/quill.snow.css";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  modules: any;
  formats: string[];
}

const TextEditor = ({ value, onChange, modules, formats }: TextEditorProps) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder="Compose your email content..."
      style={{ height: "350px" }}
      className="w-full"
    />
  );
};

export default TextEditor;

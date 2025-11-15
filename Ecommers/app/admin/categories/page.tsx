"use client";
import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import axios from "axios";
import { addToast } from "@heroui/toast";

interface Category {
  _id: string;
  title: string;
  slug: string;
  image?: string;
}

export default function AdminCategoryPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const res = await axios.get("/api/admin/category");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/category/add", { title, slug });
      if (res.status === 201) {
        addToast({ title: "Category added!" });
        setTitle("");
        setSlug("");
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3">All Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat._id} className="border rounded p-3 flex justify-between">
            <span>{cat.title}</span>
            <span className="text-gray-500">{cat.slug}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

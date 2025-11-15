"use client";
import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import axios from "axios";
import { addToast } from "@heroui/toast";
import { Select } from "@heroui/select";
import { SelectItem } from "@heroui/select";

export default function AdminSubCategoryPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/admin/category").then((res) => setCategories(res.data));
    axios
      .get("/api/admin/subcategories")
      .then((res) => setSubCategories(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return alert("Select a category!");
    try {
      const res = await axios.post("/api/admin/subcategories/add", {
        title,
        slug,
        category,
        image,
      });
      if (res.status === 201) {
        addToast({ title: " Subcategory added!" });
        setTitle("");
        setSlug("");
        setImage("");
        setSubCategories((prev) => [res.data, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Subcategory</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
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
        <Input
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Select
          label="Select Category"
          selectedKeys={category ? new Set([category]) : new Set()}
          onSelectionChange={(keys) => {
            if (keys === "all") return;
            const firstKey = keys.values().next().value as string | undefined;
            setCategory(firstKey ?? "");
          }}
        >
          {categories.map((cat) => (
            <SelectItem key={cat._id}>{cat.title}</SelectItem>
          ))}
        </Select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Subcategory
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3">All Subcategories</h2>
      <ul className="space-y-2">
        {subCategories.map((sub) => (
          <li key={sub._id} className="border rounded p-3">
            <p>{sub.title}</p>
            <small className="text-gray-500">
              Parent: {sub.category?.title}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

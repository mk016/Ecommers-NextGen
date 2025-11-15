"use client";
import { FileUpload } from "@/components/ui/file-upload";
import React, { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import Image from "next/image";
import axios from "axios";
import { addToast } from "@heroui/toast";

interface BannerType {
  _id: string;
  image: string;
  link?: string;
  createdAt?: string;
}

export default function AdminHome() {
  const [files, setFiles] = useState<File[]>([]);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState<BannerType[]>([]);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("/api/admin/banner");
      setBanners(res.data);
    } catch (error) {
      console.log("errorr banner nhi aa rha h ", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  // ye function cloudinary me image upload karega
  const uploadImageToClouadinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ecommerce_uploads"); // ye cloudniry me folder banata h

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(
        "Cloudinary Name:",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      );

      const data = await res.json();
      console.log("Cloudinary Response:", data);

      if (!res.ok) {
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }

      if (!data.secure_url) {
        throw new Error("No secure_url returned from Cloudinary");
      }

      // Verify it's a Cloudinary URL
      if (!data.secure_url.includes("res.cloudinary.com")) {
        throw new Error("Invalid Cloudinary URL format");
      }

      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ye form submit karega

    if (!files || files.length === 0) {
      addToast({ title: "Please select an image" });
      return;
    }
    setLoading(true);
    try {
      const imageUrl = await uploadImageToClouadinary(files[0]); // ye image upload karega
      // Verify that we got a Cloudinary URL
      if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) {
        throw new Error("Invalid Cloudinary URL received");
      }

      // Save in MongoDB via API
      const res = await axios.post("/api/admin/banner/add", {
        image: imageUrl,
        link,
      });

      if (res.status === 200 || res.status === 201) {
        addToast({ title: "Banner added successfully" });
        //Reset form after success
        setFiles([]);
        setLink("");
        await fetchBanners();
      } else {
        throw new Error("Failed to save banner");
      }
    } catch (error: any) {
      console.error("Banner Error message", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to upload banner";
      addToast({ title: `Error: ${errorMessage}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 itmes-center justify-center text-center">
        Banner upload Page
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
          <FileUpload key={files.length} onChange={handleFileUpload} />
        </div>
        <div className="mt-8 ">
          <Input
            label="Link"
            labelPlacement="outside"
            name="Link"
            placeholder="Enter banner Link"
            className="font-bold font-2xl"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4  mt-8 py-2 rounded-3xl mt-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Banner"}
        </button>
      </form>

      <div>
        <h1 className="text-xl font-semibold mb-3"> Recent banner</h1>
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Recent Banners</h2>

          {banners.length === 0 ? (
            <p className="text-gray-500">No banners yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <div
                  key={banner._id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <Image
                    src={banner.image}
                    alt="Banner"
                    width={600}
                    height={300}
                    className="w-full object-cover"
                  />
                  {banner.link && (
                    <a
                      href={banner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 text-center py-2 hover:underline"
                    >
                      {banner.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

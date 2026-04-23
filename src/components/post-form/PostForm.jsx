import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // ✅ FIXED SUBMIT FUNCTION
    const submit = async (data) => {
        console.log("Form data:", data);
        console.log("userData:", userData);

        if (!userData) {
            console.log("User not logged in");
            return;
        }

        try {
            // upload file (optional)
            const file = data.image[0]
                ? await service.uploadFile(data.image[0])
                : null;

            const fileId = file ? file.$id : null;

            if (post) {
                // UPDATE POST
                if (file && post.featuredImage) {
                    await service.deleteFile(post.featuredImage);
                }

                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: fileId || post.featuredImage
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // CREATE POST ✅ (NO MORE BLOCKING ON IMAGE)
                const dbPost = await service.createPost({
                    ...data,
                    featuredImage: fileId,
                    userId: userData.$id
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.log("Post submit failed:", error.message);
        }
    };

    // slug generator
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z\d\s-]/g, "")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue(
                    "slug",
                    slugTransform(value.title),
                    { shouldValidate: true }
                );
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap"
        >
            {/* LEFT */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug"
                    placeholder="Enter for Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue(
                            "slug",
                            slugTransform(e.currentTarget.value),
                            { shouldValidate: true }
                        );
                    }}
                />

                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* RIGHT */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4 hover:text-gray-500 cursor-pointer"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: false })}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 text-base"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500 hover:bg-green-300" : undefined}
                    className="w-full text-base cursor-pointer"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
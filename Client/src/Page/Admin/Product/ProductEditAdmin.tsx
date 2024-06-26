import { Link, useParams } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getDataWithAuth, postDataWithFiles } from "../../../Utils/httpRequest";
import useAlertStore from "../../../Utils/alertStore";
import { productFormSchema } from "../../../Utils/formSchema";

type ProductEditFormFields = z.infer<typeof productFormSchema>;

type ProductEditSuccess = {
  success: true;
};
type ProductEditError = {
  success: false;
  errors: ProductEditErrorMessages;
};
type ProductEditErrorMessages = {
  sku?: string;
  name?: string;
  category?: string;
  price?: string;
  quantity?: string;
  productImage?: string;
};

type ProductEditResponse = ProductEditSuccess | ProductEditError;

export default function ProductEditAdmin() {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const { data, isLoading, error } = useQuery<ProductShow>({
    queryKey: ["product_edit", id],
    queryFn: () => getDataWithAuth(`product/${id}`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ProductEditFormFields>({
    resolver: zodResolver(productFormSchema),
  });

  const { showAlert } = useAlertStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => postDataWithFiles(data, "product/edit"),
    onSuccess(result: ProductEditResponse) {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["product"] });
        showAlert("Edit product success", false);
      } else {
        Object.keys(result.errors).forEach((key) => {
          const field = key as keyof ProductEditFormFields | "root";
          const errorMessage =
            result.errors[key as keyof ProductEditErrorMessages];
          setError(field, { message: errorMessage });
        });
      }
    },
    onError() {
      setError("root", { message: "Connection failed." });
    },
  });

  async function onSubmit(data: ProductEditFormFields) {
    const formData = new FormData();

    // Add all properties except productImage (handled separately)
    for (const key in data) {
      if (key !== "productImage") {
        formData.append(
          key,
          data[key as keyof ProductEditFormFields] as string,
        );
      }
    }

    // Handle productImage (multiple files)
    if (data.productImage && data.productImage.length > 0) {
      for (let i = 0; i < data.productImage.length; i++) {
        const file = data.productImage[i];
        formData.append("productImage[]", file, file.name); // Use bracket notation for arrays
      }
    }

    mutate(formData);
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  if (data) {
    return (
      <>
        <Link
          to="/"
          className=" btn btn-circle btn-ghost m-3 w-36 text-gray-500 underline "
        >
          Back to products
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex w-full max-w-[700px] flex-col"
          encType="multipart/form-data"
        >
          <h1 className="mb-3 text-center text-3xl font-bold  text-primary">
            Edit Product
          </h1>
          <div className="mx-5 flex flex-col">
            <label
              htmlFor="SKU"
              className=" input input-bordered flex items-center gap-2"
            >
              <input
                className="grow"
                {...register("sku")}
                type="text"
                value={data.sku}
              />
            </label>
            {errors?.sku ? (
              <p className="ml-1 text-sm text-error">{errors?.sku.message}</p>
            ) : (
              <p className="ml-1 text-sm text-error">&nbsp;</p>
            )}
          </div>
          <div className="mx-5 flex flex-col">
            <label
              htmlFor="Product name"
              className=" input input-bordered flex items-center gap-2"
            >
              <input
                className="grow"
                {...register("name")}
                type="text"
                value={data.name}
              />
            </label>
            {errors?.name ? (
              <p className="ml-1 text-sm text-error">{errors?.name.message}</p>
            ) : (
              <p className="ml-1 text-sm text-error">&nbsp;</p>
            )}
          </div>
          <div className="mx-5 flex flex-col">
            <label
              htmlFor="Description"
              className=" input input-bordered flex items-center gap-2"
            >
              <input
                className="grow"
                {...register("description")}
                type="text"
                value={data.description || "None"}
              />
            </label>
            {errors?.description ? (
              <p className="ml-1 text-sm text-error">
                {errors?.description.message}
              </p>
            ) : (
              <p className="ml-1 text-sm text-error">&nbsp;</p>
            )}
          </div>
          <div className="mx-5 flex flex-col">
            <label
              htmlFor="category"
              className=" input input-bordered flex items-center gap-2"
            >
              <input
                className="grow"
                {...register("category")}
                type="text"
                value={data.category}
              />
            </label>
            {errors?.category ? (
              <p className="ml-1 text-sm text-error">
                {errors?.category.message}
              </p>
            ) : (
              <p className="ml-1 text-sm text-error">&nbsp;</p>
            )}
          </div>
          <div className="mx-5 flex flex-col">
            <label
              htmlFor="Product price"
              className=" input input-bordered flex items-center gap-2"
            >
              <input
                className="grow"
                {...register("price")}
                type="number"
                value={data.price}
              />
            </label>
            {errors?.price ? (
              <p className="ml-1 text-sm text-error">{errors?.price.message}</p>
            ) : (
              <p className="ml-1 text-sm text-error">&nbsp;</p>
            )}
          </div>
          <div className="mx-5 flex flex-col">
            <label
              htmlFor="Product quantity"
              className=" input input-bordered flex items-center gap-2"
            >
              <input
                className="grow"
                {...register("quantity")}
                type="number"
                value={data.quantity}
              />
            </label>
            {errors?.quantity ? (
              <p className="ml-1 text-sm text-error">
                {errors?.quantity.message}
              </p>
            ) : (
              <p className="ml-1 text-sm text-error">&nbsp;</p>
            )}
          </div>
          <div className="mx-5 flex flex-col">
            <h3 className=" mb-1 text-center font-semibold">Product Images</h3>
            <label
              htmlFor="Product Image"
              className=" input input-bordered flex items-center gap-2"
            >
              <input
                className="grow"
                {...register("productImage")}
                type="file"
                accept=" image/jpeg,
              image/jpg,
              image/png,
              image/webp"
                multiple
              />
            </label>
            {errors?.productImage ? (
              <p className="ml-1 text-sm text-error">
                {errors?.productImage.message}
              </p>
            ) : (
              <p className="ml-1 text-sm text-error">&nbsp;</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-square  btn-primary btn-wide mx-auto text-lg"
          >
            {isPending ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              "Edit product"
            )}
          </button>
          {errors?.root ? (
            <p className="ml-1 text-sm text-error">{errors?.root?.message}</p>
          ) : (
            <p className="ml-1 text-sm text-error">&nbsp;</p>
          )}
        </form>
      </>
    );
  }
}

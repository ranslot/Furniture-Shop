import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { postData } from "../../../Utils/httpRequest";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const productStoreSchema = z.object({
  sku: z.string().min(1, { message: "Product SKU is required." }),
  name: z.string().min(1, { message: "Product name is required." }),
  category: z.string(),
  description: z.string().optional(),
  price: z
    .number()
    .positive()
    .int()
    .min(1, { message: "Product price is required." }),
  quantity: z
    .number()
    .positive()
    .int()
    .min(1, { message: "Product quantity is required." }),
  productImage: z
    .any()
    .refine((files) => files?.length == 1, { message: "Image is required." })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: "Only .jpg, .jpeg, .png and .webp files are accepted.",
    }),
});

type ProductStoreFormFields = z.infer<typeof productStoreSchema>;

type ProductStoreSuccess = {
  success: true;
  user: User;
};
type ProductStoreError = {
  success: false;
  errors: ProductStoreErrorMessages;
};
type ProductStoreErrorMessages = {
  email?: string;
  password?: string;
};

type ProductStoreResponse = ProductStoreSuccess | ProductStoreError;

export default function ProductStore() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductStoreFormFields>({
    resolver: zodResolver(productStoreSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProductStoreFormFields) =>
      postData<ProductStoreFormFields>(data),
    onSuccess(result: ProductStoreResponse) {
      if (result.success) {
        setLocation("/");
        queryClient.invalidateQueries({ queryKey: ["product"] });
      }
    },
  });

  async function onSubmit(data: ProductStoreFormFields) {
    mutate(data);
  }

  return (
    <>
      <Link to="/">back to products</Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-full flex-col"
      >
        <h1 className="mb-3 text-center text-3xl font-bold  text-primary">
          Add Product
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
              placeholder="SKU"
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
              placeholder="Product name"
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
              placeholder="Description"
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
              placeholder="category"
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
              type="text"
              placeholder="Product price"
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
              type="text"
              placeholder="Product quantity"
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
          <label
            htmlFor="Product quantity"
            className=" input input-bordered flex items-center gap-2"
          >
            <input
              className="grow"
              {...register("productImage")}
              type="text"
              placeholder="Product quantity"
            />
          </label>
          {errors?.productImage ? (
            <p className="ml-1 text-sm text-error">
              {errors?.productImage.message as string}
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
            "Add product"
          )}
        </button>
      </form>
    </>
  );
}

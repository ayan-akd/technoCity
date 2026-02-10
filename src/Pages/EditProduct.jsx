import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const EditProduct = () => {
  const product = useLoaderData();
  const handleUpdateProduct = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const brand = form.brand.value;
    const category = form.category.value;
    const price = form.price.value;
    const details = form.details.value;
    const rating = form.rating.value;
    const photo = form.photo.value;

    const updatedProduct = {
      name,
      brand,
      category,
      price,
      details,
      rating,
      photo,
    };
    fetch(
      `https://techno-city.vercel.app/products/:brand/${product._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast("Product Updated", {
            icon: "✅",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      });
  };
  return (
    <div className="max-w-screen-xl mx-auto p-10">
      <h1 className="text-center text-4xl italic font-semibold mb-12">
        Update <span className="text-rose">Product</span>
      </h1>
      <form onSubmit={handleUpdateProduct}>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-8">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="input input-bordered w-full"
                required
                defaultValue={product.name}
              />
            </label>
          </div>
          <div className="form-control md:ml-4">
            <label className="label">
              <span className="label-text">Brand Name</span>
            </label>
            <label className="input-group">
              <select
                name="brand"
                className="select select-bordered w-full"
                defaultValue={product.brand}
                required
              >
                <option disabled value="">
                  Select . . .
                </option>
                <option value="apple">Apple</option>
                <option value="samsung">Samsung</option>
                <option value="pixel">Pixel</option>
                <option value="xiaomi">Xiaomi</option>
                <option value="oneplus">OnePlus</option>
                <option value="realme">Realme</option>
              </select>
            </label>
          </div>
        </div>
        <div className="md:flex mb-8">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="input input-bordered w-full"
                required
                defaultValue={product.category}
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 md:ml-4">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="price"
                placeholder="Price"
                className="input input-bordered w-full"
                required
                defaultValue={product.price}
              />
            </label>
          </div>
        </div>
        <div className="md:flex mb-8">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Details</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="details"
                placeholder="Details"
                className="input input-bordered w-full"
                required
                defaultValue={product.details}
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 md:ml-4">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <label className="input-group">
              <select
                name="rating"
                className="select select-bordered w-full"
                defaultValue={product.rating}
                required
              >
                <option disabled value="">
                  Select . . .
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
          </div>
        </div>
        <div className="mb-8">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered w-full"
                required
                defaultValue={product.photo}
              />
            </label>
          </div>
        </div>
        <button className="w-full bg-rose text-white btn">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

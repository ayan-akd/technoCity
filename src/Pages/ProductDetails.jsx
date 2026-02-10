import { useLoaderData } from "react-router-dom";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import toast from "react-hot-toast";

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#F02757",
  inactiveFillColor: "#fecdd3",
};

const ProductDetails = () => {
  //   const { id } = useParams();
  const productDetails = useLoaderData();
  const { name, brand, price, details, rating, photo, category } =
    productDetails;
  const rate = parseInt(rating);
  const handleAddToCart = () => {
    const newItem = {
      name,
      brand,
      category,
      price,
      details,
      rating,
      photo,
    };
    fetch(
      "https://techno-city.vercel.app/cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast("Product Added to cart", {
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
    <div className="max-w-screen-xl mx-auto lg:my-20 p-4">
      <div className="bg-base-200 ">
        <div className="flex flex-col lg:flex-row-reverse lg:justify-between items-center p-4 md:p-20">
          <div>
            <img src={photo} className=" rounded-lg shadow-2xl" />
          </div>
          <div className="text-center lg:text-start">
            <h1 className="text-5xl font-bold my-7">{name}</h1>
            <p className="font-semibold text-rose">{brand.toUpperCase()}</p>
            <p>Category: {category.toUpperCase()}</p>
            <p className="my-2">{details}</p>
            <div className="flex justify-center lg:justify-start mb-2">
              <Rating
                style={{ maxWidth: 150 }}
                value={rate}
                itemStyles={myStyles}
              ></Rating>
            </div>
            <p>Price: ${price.toUpperCase()}</p>

            <div className="flex justify-center lg:justify-start my-3">
              <button
                onClick={handleAddToCart}
                className="btn bg-rose text-white"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

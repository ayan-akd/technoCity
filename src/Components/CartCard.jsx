/* eslint-disable react/prop-types */

import { Rating, RoundedStar } from "@smastrom/react-rating";
import Swal from "sweetalert2";

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#F02757",
  inactiveFillColor: "#fecdd5",
};

const CartCard = ({ product }) => {
  const { _id, name, brand, price, rating, photo, category } = product;
  const rate = parseInt(rating);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803d",
      cancelButtonColor: "#fb7185",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        fetch(
          `https://techno-city.vercel.app/cart/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
      }
    });
  };

  return (
    <div>
      <div className="card lg:card-side bg-base-200 shadow-xl">
        <figure>
          <img
            className="max-w-[160px] max-h-[212px]"
            src={photo}
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className="font-semibold text-rose">{brand.toUpperCase()}</p>
          <p>Category: {category.toUpperCase()}</p>
          <p>Price: ${price.toUpperCase()}</p>
          <Rating
            style={{ maxWidth: 150 }}
            value={rate}
            itemStyles={myStyles}
          ></Rating>
          <div className="card-actions">
            <button
              onClick={handleDelete}
              className="btn bg-rose text-white mt-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

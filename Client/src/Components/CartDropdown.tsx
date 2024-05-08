import useCartStore from "../Utils/cartStore";

export default function CartDropdown() {
  const { products, clearCart } = useCartStore();

  const price = products.reduce(
    (sum, product) => sum + product.price * (product.amount || 1),
    0,
  );

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-ghost w-[90px]"
      >
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {products.length !== 0 && (
            <span className="badge indicator-item badge-sm border-none bg-red-500 text-white">
              {products.length}
            </span>
          )}
        </div>
      </button>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow"
      >
        {products.length !== 0 ? (
          <div className="card-body">
            <span className="text-lg font-bold">{products.length} Items</span>
            <span className="text-info">ราคารวม {price}</span>
            <div className="card-actions">
              <button
                className="btn-danger btn btn-block"
                onClick={() => clearCart()}
              >
                Clear cart
              </button>
            </div>
          </div>
        ) : (
          <div className="card-body">ไม่มีสิ้นค้าในตะกร้า</div>
        )}
      </div>
    </div>
  );
}

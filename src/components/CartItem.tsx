'use client';
import Image from "next/image";
type CartItemProps = {
  item: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
  onUpdate: (id: number, quantity: number) => void;
};

export default function CartItem({ item, onUpdate }: CartItemProps) {
  return (
    <div className="flex gap-4 items-center mb-6">
      <div className="relative w-24 h-24">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain rounded"
          sizes="96px"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <p className="font-bold text-gray-900">${item.price.toFixed(2)}</p>

        {/* Quantity controls */}
        <div className="flex items-center mt-2">
          <button
            className="px-3 py-1 border rounded-l"
            onClick={() => onUpdate(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
          <button
            className="px-3 py-1 border rounded-r"
            onClick={() => onUpdate(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

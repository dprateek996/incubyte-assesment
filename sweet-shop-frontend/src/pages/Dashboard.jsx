import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("piece");

  const token = localStorage.getItem("token");

  const fetchSweets = async () => {
    const res = await fetch("http://localhost:3000/api/sweets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) logout();

    const data = await res.json();
    setSweets(data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const addSweet = async () => {
    // Validation
    if (!name.trim()) {
      alert("Please enter a sweet name");
      return;
    }

    const priceNum = Number(price);
    const quantityNum = Number(quantity);

    if (priceNum <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (quantityNum < 0) {
      alert("Quantity must be 0 or greater");
      return;
    }

    await fetch("http://localhost:3000/api/sweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        quantity: quantityNum,
        price: priceNum,
        unit,
      }),
    });

    setName("");
    setQuantity("");
    setPrice("");
    setUnit("piece");
    fetchSweets();
  };

  const updateQty = async (id, qty) => {
    await fetch(`http://localhost:3000/api/sweets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: Number(qty), // ✅ FIX
      }),
    });

    fetchSweets();
  };

  const deleteSweet = async (id) => {
    await fetch(`http://localhost:3000/api/sweets/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchSweets();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Sweet Shop Dashboard</h1>
        <Button onClick={logout}>Logout</Button>
      </div>

      {/* Add Sweet */}
      <div className="flex gap-2">
        <Input
          placeholder="Sweet name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="piece">Piece</option>
          <option value="gram">Gram</option>
        </select>
        <Button onClick={addSweet}>Add</Button>
      </div>

      {/* Sweet List */}
      <ul className="space-y-3">
        {sweets.map((sweet) => (
          <li
            key={sweet.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{sweet.name}</p>
              <p className="text-sm text-neutral-500">
                Price: ₹{sweet.price} | Quantity: {sweet.quantity} {sweet.unit}{sweet.quantity > 1 && sweet.unit === "piece" ? "s" : ""}
              </p>
              <p className="text-sm font-semibold text-neutral-700">
                Total: ₹{(sweet.price * sweet.quantity).toFixed(2)}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  updateQty(sweet.id, sweet.quantity + 1)
                }
              >
                +
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  updateQty(sweet.id, sweet.quantity - 1)
                }
                disabled={sweet.quantity === 0}
              >
                -
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteSweet(sweet.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
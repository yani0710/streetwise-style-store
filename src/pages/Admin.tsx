import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Lock, Package, User, Calendar, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  post_code: string;
  country: string;
  payment_method: string;
  subtotal: number;
  shipping: number;
  total: number;
  created_at: string;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_name: string;
  product_image: string;
  product_category: string;
  price: number;
  quantity: number;
  size: string | null;
  color: string | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const handleLogin = () => {
    if (username === "Admin" && password === "12345678") {
      setIsAuthenticated(true);
      fetchOrders();
      toast({
        title: "Success",
        description: "Successfully logged in to admin panel",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*');

      if (itemsError) throw itemsError;

      setOrders(ordersData || []);
      setOrderItems(itemsData || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getOrderItems = (orderId: string) => {
    return orderItems.filter(item => item.order_id === orderId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/")} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleLogin} variant="electric" className="flex-1">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate("/")} className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Orders ({orders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No orders found
              </div>
            ) : (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => {
                      const items = getOrderItems(order.id);
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">
                            {order.id.substring(0, 8)}...
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{order.first_name} {order.last_name}</div>
                              <div className="text-sm text-muted-foreground">{order.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {formatDate(order.created_at)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {items.reduce((sum, item) => sum + item.quantity, 0)} items
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            ${order.total.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              {order.payment_method}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                            >
                              {selectedOrder === order.id ? 'Hide' : 'View'} Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                {selectedOrder && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const order = orders.find(o => o.id === selectedOrder);
                        const items = getOrderItems(selectedOrder);
                        
                        if (!order) return null;

                        return (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  Customer Information
                                </h4>
                                <div className="space-y-1 text-sm">
                                  <p><strong>Name:</strong> {order.first_name} {order.last_name}</p>
                                  <p><strong>Email:</strong> {order.email}</p>
                                  <p><strong>Address:</strong> {order.address}</p>
                                  <p><strong>City:</strong> {order.city}, {order.state} {order.post_code}</p>
                                  <p><strong>Country:</strong> {order.country}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-2">Order Summary</h4>
                                <div className="space-y-1 text-sm">
                                  <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}</p>
                                  <p><strong>Shipping:</strong> ${order.shipping.toFixed(2)}</p>
                                  <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                                  <p><strong>Payment Method:</strong> {order.payment_method}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Items Ordered</h4>
                              <div className="space-y-2">
                                {items.map((item) => (
                                  <div key={item.id} className="flex items-center gap-3 border rounded p-3">
                                    <img
                                      src={item.product_image}
                                      alt={item.product_name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                      <h5 className="font-medium">{item.product_name}</h5>
                                      <p className="text-sm text-muted-foreground">
                                        {item.size && `Size: ${item.size}`} {item.color && `• Color: ${item.color}`}
                                      </p>
                                      <p className="text-sm">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                                    </div>
                                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
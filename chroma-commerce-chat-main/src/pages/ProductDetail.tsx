
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Heart, 
  Share, 
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock products for demonstration
const mockProducts = [
  {
    id: "p1",
    name: "Premium Wireless Headphones",
    price: 249.99,
    description: "Immersive sound quality with active noise cancellation, comfortable over-ear design, and 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=500",
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1520170350707-b2da59970118?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=500",
    ],
    colors: ["Black", "White", "Blue"],
    inStock: true
  },
  {
    id: "p2",
    name: "Ergonomic Office Chair",
    price: 189.95,
    description: "Adjustable height and lumbar support with breathable mesh material for all-day comfort during work.",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=500",
    rating: 4.5,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1589384267710-7a170981ca78?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1601412436967-8b2d90944ded?auto=format&fit=crop&q=80&w=500",
    ],
    colors: ["Black", "Gray"],
    inStock: true
  },
  {
    id: "p3",
    name: "Smart Home Assistant",
    price: 149.99,
    description: "Voice-controlled smart speaker with integrated virtual assistant to control your smart home devices.",
    image: "https://images.unsplash.com/photo-1589894404892-7310b92ea7e2?auto=format&fit=crop&q=80&w=500",
    rating: 4.7,
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1589894404892-7310b92ea7e2?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=500",
    ],
    colors: ["Black", "White"],
    inStock: true
  }
];

export default function ProductDetail() {
  const { toast } = useToast();
  const { productId } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // In a real app, fetch product by ID from API
  const product = mockProducts.find(p => p.id === productId) || mockProducts[0];

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Redirecting to checkout",
      description: "Processing your purchase...",
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "Product link copied to clipboard",
    });
  };

  const handleImageChange = (index: number) => {
    setActiveImageIndex(index);
  };

  const handlePreviousImage = () => {
    setActiveImageIndex(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-muted h-[400px] flex items-center justify-center">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name}
                className="h-full w-full object-contain"
              />
              
              <button 
                onClick={handlePreviousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 shadow-md flex items-center justify-center hover:bg-secondary transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button 
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 shadow-md flex items-center justify-center hover:bg-secondary transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={cn(
                    "w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0",
                    activeImageIndex === index ? "border-primary" : "border-transparent"
                  )}
                >
                  <img 
                    src={image} 
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i}
                      size={16} 
                      className={cn(
                        "fill-current",
                        i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                      )}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviews} reviews
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Colors</h3>
              <div className="flex space-x-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-3 py-1 rounded-full border text-sm",
                      selectedColor === color 
                        ? "border-primary bg-secondary text-primary" 
                        : "border-gray-300 hover:border-gray-500"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            <p className="text-base text-muted-foreground">
              {product.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={handleAddToCart}
                variant="outline" 
                className="flex-1"
              >
                <ShoppingCart className="mr-2" size={16} />
                Add to Cart
              </Button>
              
              <Button
                onClick={handleBuyNow}
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>
            
            <div className="flex items-center pt-4 border-t space-x-4">
              <button 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <Heart className="mr-1" size={16} />
                Add to Wishlist
              </button>
              
              <button 
                onClick={handleShare}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <Share className="mr-1" size={16} />
                Share
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockProducts.map(relatedProduct => (
              <Card 
                key={relatedProduct.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-muted">
                  <img 
                    src={relatedProduct.images[0]} 
                    alt={relatedProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm line-clamp-2">{relatedProduct.name}</h3>
                  <p className="text-lg font-bold mt-1">${relatedProduct.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

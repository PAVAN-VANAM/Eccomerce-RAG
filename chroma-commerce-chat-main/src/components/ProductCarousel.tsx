import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const { toast } = useToast();
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Filter out incomplete products
  const validProducts = products.filter(
    (product) => product.name && product.price && product.description && product.image
  );

  const itemsPerPage = 3;
  const totalPages = Math.ceil(validProducts.length / itemsPerPage);

  const canScrollLeft = currentPage > 0;
  const canScrollRight = currentPage < totalPages - 1;

  const handleNext = () => {
    if (canScrollRight) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canScrollLeft) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTo({
        left: currentPage * scrollContainer.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  const handleShare = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(
      `Check out ${product.name} for $${product.price} - ${product.description}`
    );
    toast({
      title: "Link copied",
      description: "Product information copied to clipboard",
    });
  };

  if (validProducts.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex items-center mb-4">
        <button
          onClick={handlePrev}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center bg-background shadow-md transition-all",
            canScrollLeft ? "opacity-100 hover:bg-secondary" : "opacity-40 cursor-not-allowed"
          )}
          disabled={!canScrollLeft}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center bg-background shadow-md transition-all",
            canScrollRight ? "opacity-100 hover:bg-secondary" : "opacity-40 cursor-not-allowed"
          )}
          disabled={!canScrollRight}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {canScrollRight && (
        <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-r from-transparent to-background/60 z-10 pointer-events-none" />
      )}

      <div
        ref={scrollContainer}
        className="flex transition-transform duration-500 ease-in-out overflow-x-hidden snap-x snap-mandatory"
      >
        {validProducts.map((product) => (
          <div
            key={product.id}
            className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 snap-start px-2"
          >
            <Link to={`/product/${product.id}`} className="block h-full">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border">
                <div className="h-36 w-full bg-muted relative overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-base mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-xl font-bold mb-2">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="p-1.5 rounded-full hover:bg-secondary"
                        aria-label="Like product"
                      >
                        <ThumbsUp size={16} />
                      </button>
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="p-1.5 rounded-full hover:bg-secondary"
                        aria-label="Dislike product"
                      >
                        <ThumbsDown size={16} />
                      </button>
                    </div>
                    <button
                      onClick={(e) => handleShare(product, e)}
                      className="p-1.5 rounded-full hover:bg-secondary"
                      aria-label="Share product"
                    >
                      <Share size={16} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center md:hidden">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={cn(
              "w-2 h-2 rounded-full mx-1",
              index === currentPage ? "bg-primary w-4" : "bg-muted"
            )}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
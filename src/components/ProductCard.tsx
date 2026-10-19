import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: number, colorIndex?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColorIdx);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div
      onClick={() => onOpenQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#FAF7F2] rounded-sm overflow-hidden border border-[#E3D7C5] hover:border-[#C5A059] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 sm:aspect-square bg-[#F0E8DC] overflow-hidden">
        
        {/* Main image with secondary switch on hover */}
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.primaryImage}
          alt={product.nameAr}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Badge (e.g. الأكثر طلباً, إصدار فاخر) */}
        {product.badge && (
          <div className="absolute top-3 right-3 bg-[#241611]/90 text-[#F4EFE6] text-[11px] font-medium px-2.5 py-1 rounded-xs border border-[#C5A059]/40 backdrop-blur-xs shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Discount Tag */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 bg-[#8B2635] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs shadow-xs">
            خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}

        {/* Wishlist Heart Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-[#FAF7F2]/90 hover:bg-[#FAF7F2] text-[#241611] flex items-center justify-center transition shadow-md hover:scale-110 cursor-pointer"
          title={isWishlisted ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          aria-label="المفضلة"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#8B2635] text-[#8B2635]' : 'text-[#241611]'
            }`}
          />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-[#241611]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none sm:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="bg-[#FAF7F2]/95 hover:bg-[#FAF7F2] text-[#241611] text-xs font-medium px-4 py-2 rounded-xs shadow-lg flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 border border-[#DFD3BF] cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>عرض التفاصيل</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-right">
        
        <div>
          {/* Leather type / category kicker */}
          <div className="flex items-center justify-between text-xs text-[#8C7565] mb-1.5">
            <span className="truncate font-light">{product.leatherType.split('(')[0]}</span>
            <div className="flex items-center gap-1 text-[#C5A059] shrink-0 font-medium">
              <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
              <span className="text-xs text-[#241611]">{product.rating}</span>
              <span className="text-[10px] text-[#8C7565]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-heading text-lg font-bold text-[#241611] group-hover:text-[#64422D] transition-colors leading-snug line-clamp-1">
            {product.nameAr}
          </h3>

          <p className="text-xs font-brand tracking-wider text-[#A18875] uppercase mt-0.5 mb-2 line-clamp-1">
            {product.nameEn}
          </p>

          {/* Available Colors Swatches */}
          <div className="flex items-center gap-1.5 my-2">
            <span className="text-[11px] text-[#8C7565] ml-1">الألوان:</span>
            {product.colors.map((color, idx) => (
              <button
                key={color.code}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIdx(idx);
                }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColorIdx === idx
                    ? 'ring-2 ring-[#C5A059] scale-110 border-white'
                    : 'border-[#DFD3BF] hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-[#705947] mr-1">
              {product.colors[selectedColorIdx]?.name}
            </span>
          </div>

          {/* Sizes preview pills */}
          <div className="flex items-center gap-1 my-2 flex-wrap">
            <span className="text-[11px] text-[#8C7565] ml-1">المقاس:</span>
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-1.5 py-0.5 text-[11px] font-sans rounded-xs border transition ${
                  selectedSize === size
                    ? 'bg-[#241611] text-[#E8DFC8] border-[#241611] font-bold'
                    : 'bg-[#F3ECE0] text-[#554235] border-[#DFD3BF] hover:border-[#8C7565]'
                }`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 5 && (
              <span className="text-[10px] text-[#8C7565] font-light">+{product.sizes.length - 5}</span>
            )}
          </div>
        </div>

        {/* Price & Quick Add Button Area */}
        <div className="pt-3 mt-3 border-t border-[#EDE4D5] flex items-center justify-between">
          
          {/* Price formatted in EGP */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-brand font-bold text-lg sm:text-xl text-[#241611]">
                {product.price.toLocaleString('ar-EG')}
              </span>
              <span className="text-xs font-heading font-medium text-[#705947]">ج.م</span>
            </div>
            {product.originalPrice && (
              <span className="text-[11px] text-[#A39285] line-through block -mt-1">
                {product.originalPrice.toLocaleString('ar-EG')} ج.م
              </span>
            )}
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xs text-xs font-medium transition cursor-pointer ${
              justAdded
                ? 'bg-emerald-800 text-white'
                : 'bg-[#241611] hover:bg-[#3D2517] text-[#F4EFE6] hover:text-[#C5A059]'
            }`}
            title="إضافة الحذاء للسلة بالمقاس واللون المحددين"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>أُضيف للسلة!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>أضف للسلة</span>
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { ShoeCategory, FilterState } from '../types';

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalProductsCount: number;
  availableSizes: number[];
  availableColors: { name: string; hex: string; code: string }[];
  onResetFilters: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
  totalProductsCount,
  availableSizes,
  availableColors,
  onResetFilters,
}) => {
  const categories: { id: ShoeCategory; label: string }[] = [
    { id: 'all', label: 'جميع الأحذية' },
    { id: 'mens', label: 'أحذية رجالية' },
    { id: 'womens', label: 'أحذية نسائية' },
    { id: 'loafers', label: 'أحذية لوفر' },
    { id: 'leather_luxury', label: 'أحذية جلدية فاخرة' },
    { id: 'offers', label: 'العروض الخاصة' },
  ];

  const handleCategoryChange = (category: ShoeCategory) => {
    onFilterChange({ ...filters, category });
  };

  const handleSizeToggle = (size: number) => {
    const exists = filters.selectedSizes.includes(size);
    const newSizes = exists
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onFilterChange({ ...filters, selectedSizes: newSizes });
  };

  const handleColorToggle = (colorCode: string) => {
    const exists = filters.selectedColors.includes(colorCode);
    const newColors = exists
      ? filters.selectedColors.filter((c) => c !== colorCode)
      : [...filters.selectedColors, colorCode];
    onFilterChange({ ...filters, selectedColors: newColors });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.searchQuery !== '' ||
    filters.selectedSizes.length > 0 ||
    filters.selectedColors.length > 0 ||
    filters.priceRange[1] < 5000;

  return (
    <div className="bg-[#FAF7F2] border border-[#E3D7C5] p-5 sm:p-6 rounded-sm shadow-xs mb-8 text-right">
      
      {/* Top Bar: Category Pills & Sorting */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-[#E8DFC8]">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-xs text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#241611] text-[#E8DFC8] border border-[#241611] shadow-xs font-bold'
                    : 'bg-[#F3ECE0] text-[#5C483B] border border-[#DFD3BF] hover:bg-[#EBE2D4]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sort dropdown & Results count */}
        <div className="flex items-center justify-between lg:justify-end gap-3">
          <span className="text-xs text-[#7A6453]">
            عرض <strong className="text-[#241611]">{totalProductsCount}</strong> حذاء
          </span>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-[#7A6453] shrink-0 font-medium">
              الترتيب:
            </label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  sortBy: e.target.value as FilterState['sortBy'],
                })
              }
              className="bg-[#F3ECE0] border border-[#DFD3BF] text-xs text-[#241611] rounded-xs px-3 py-1.5 focus:outline-none focus:border-[#C5A059] cursor-pointer"
            >
              <option value="featured">المميز والمقترح</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="newest">الأحدث وصولاً</option>
            </select>
          </div>
        </div>

      </div>

      {/* Secondary Filter Controls: Search, Price Slider, Sizes, Colors */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-5 items-center">
        
        {/* Search input (4 cols) */}
        <div className="md:col-span-4">
          <label className="block text-xs font-medium text-[#7A6453] mb-1.5">
            بحث بالاسم أو النوع:
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="مثال: أكسفورد، لوفر، بروغ..."
              value={filters.searchQuery}
              onChange={(e) =>
                onFilterChange({ ...filters, searchQuery: e.target.value })
              }
              className="w-full bg-[#F3ECE0] border border-[#DFD3BF] focus:border-[#C5A059] text-xs text-[#241611] px-3 py-2 pl-8 rounded-xs focus:outline-none placeholder:text-[#8C7A6B]"
            />
            <Search className="w-4 h-4 text-[#8C7A6B] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#8C7A6B] hover:text-[#241611]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Sizes Multi-select (4 cols) */}
        <div className="md:col-span-4">
          <label className="block text-xs font-medium text-[#7A6453] mb-1.5">
            تصفية بالمقاس (EU):
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            {availableSizes.map((size) => {
              const isSelected = filters.selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`w-7 h-7 text-xs rounded-xs border font-sans transition flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#241611] text-[#E8DFC8] border-[#241611] font-bold ring-1 ring-[#C5A059]'
                      : 'bg-[#F3ECE0] text-[#554235] border-[#DFD3BF] hover:border-[#8C7565]'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Colors Multi-select (3 cols) */}
        <div className="md:col-span-3">
          <label className="block text-xs font-medium text-[#7A6453] mb-1.5">
            تصفية بلون الجلد:
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {availableColors.map((color) => {
              const isSelected = filters.selectedColors.includes(color.code);
              return (
                <button
                  key={color.code}
                  onClick={() => handleColorToggle(color.code)}
                  className={`w-6 h-6 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-[#C5A059] scale-110 border-white'
                      : 'border-[#DFD3BF] hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {isSelected && <Check className="w-3 h-3 text-[#FAF7F2] drop-shadow-xs" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reset button (1 col) */}
        <div className="md:col-span-1 flex justify-end md:justify-center items-end">
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-[11px] text-[#8B2635] hover:text-[#5E1A24] font-medium p-1 cursor-pointer"
              title="إعادة تعيين كافة الفلاتر"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إلغاء</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

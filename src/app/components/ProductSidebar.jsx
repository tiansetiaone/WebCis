"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProductSidebar({ onItemChange }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeItem, setActiveItem] = useState("Concrete Roof");
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [expandedItems, setExpandedItems] = useState({
    "Concrete Roof": false,
    "Paving Block": false,
    "Concrete Block": false,
    Utility: false,
  });
  const [expandedSubItems, setExpandedSubItems] = useState({
    "Concrete Roof": {
      "Flat Tile": {
        "Victoria Series": false,
      },
      "Genteng Gelombang": {},
    },
    "Paving Block": {},
    "Concrete Block": {
      "Ventilation Block": {},
    },
    Utility: {},
  });

  // Definisikan productConfig
  const productConfig = {
    mainProducts: [
      { name: "Concrete Roof", url: "/produk?category=Concrete Roof" },
      { name: "Paving Block", url: "/produk/produk-pv?category=Paving Block" },
      { name: "Concrete Block", url: "/produk/produk-pv?category=Concrete Block" },
      { name: "Utility", url: "/produk/produk-pv?category=Utility" },
    ],
    subProducts: {
      "Concrete Roof": [
        { name: "Neo Solar System", url: "/produk/detail?product=Neo Solar System&category=Concrete Roof" },
        {
          name: "Flat Tile",
          url: "#",
          subItems: [
            { name: "Dual Slate", url: "/produk/detail-cr?product=Dual Slate&category=Concrete Roof" },
            { name: "Floral", url: "/produk/detail-cr?product=Floral&category=Concrete Roof" },
            {
              name: "Victoria Series",
              url: "/produk/detail-victoria?product=Victoria Series&category=Concrete Roof",
              subItems: [
                { name: "Onyx", url: "/produk/detail-victoria?product=Onyx&category=Concrete Roof" },
                { name: "Multiline", url: "/produk/detail-victoria?product=Multiline&category=Concrete Roof" },
                { name: "Slate", url: "/produk/detail-victoria?product=Slate&category=Concrete Roof" },
                { name: "Pine", url: "/produk/detail-victoria?product=Pine&category=Concrete Roof" },
                { name: "Classic", url: "/produk/detail-victoria?product=Classic&category=Concrete Roof" },
              ],
            },
          ],
        },
        {
          name: "Genteng Gelombang",
          url: "#",
          subItems: [
            { name: "New Royal", url: "/produk/detail-cr?product=New Royal&category=Concrete Roof" },
            { name: "Oriental", url: "/produk/detail-cr?product=Oriental&category=Concrete Roof" },
            { name: "Majestic", url: "/produk/detail-cr?product=Majestic&category=Concrete Roof" },
          ],
        },
      ],
      "Paving Block": [
        { name: "Square Set", url: "/produk/detail-pb?product=Square Set&category=Paving Block" },
        { name: "Classic Set", url: "/produk/detail-pb?product=Classic Set&category=Paving Block" },
        { name: "Altstadt", url: "/produk/detail-pb?product=Altstadt&category=Paving Block" },
        { name: "Others", url: "/produk/detail-pb?product=Others&category=Paving Block" },
        { name: "Guiding Pave", url: "/produk/detail-pb?product=Guiding Pave&category=Paving Block" },
        { name: "Grass Block", url: "/produk/detail-pb?product=Grass Block&category=Paving Block" },
        { name: "Concrete Tile", url: "/produk/detail-pb2?product=Concrete Tile&category=Paving Block" },
        { name: "Guiding Tiles", url: "/produk/detail-pb?product=Guiding Tiles&category=Paving Block" },
        { name: "Kanstein Wet Process", url: "/produk/detail-pb3?product=Kanstein Wet Process&category=Paving Block" },
        { name: "Kanstein Dry Process", url: "/produk/detail-pb3?product=Kanstein Dry Process&category=Paving Block" },
        { name: "Tali Air", url: "/produk/detail-pb3?product=Tali Air&category=Paving Block" },
      ],
      "Concrete Block": [
        { name: "Concrete Block", url: "/produk/detail-cb?product=Concrete Block&category=Concrete Block" },
        { name: "Ventilation Block", url: "/produk/detail-cb?product=Ventilation Block&category=Concrete Block" },
        { name: "Ventilation Block 3D", url: "/produk/detail-cb?product=Ventilation Block 3D&category=Concrete Block" },
      ],
      Utility: [
        { name: "Concrete Pipe", url: "/produk/detail-ut1?product=Concrete Pipe&category=Utility" },
        { name: "Ciswell", url: "/produk/detail-ut2?product=Ciswell&category=Utility" },
      ],
    },
  };

  // Definisikan semua fungsi helper di awal komponen
  const getMainProducts = useCallback(() => productConfig.mainProducts.map((item) => item.name), []);
  const getMainProductUrl = useCallback((name) => 
    productConfig.mainProducts.find((item) => item.name === name)?.url || "#", []);
  const getSubProducts = useCallback((category) => 
    productConfig.subProducts[category]?.map((item) => item.name) || [], []);
  const getSubProductUrl = useCallback((category, name) => {
    const product = productConfig.subProducts[category]?.find((item) => item.name === name);
    return product?.url || "#";
  }, []);
  const getSubItems = useCallback((category, subProduct) => {
    const product = productConfig.subProducts[category]?.find((item) => item.name === subProduct);
    return product?.subItems || [];
  }, []);

  // Fungsi navigasi dengan FULL PAGE RELOAD
  const navigateTo = useCallback((url) => {
    if (url === "#" || url === window.location.href.split('#')[0]) {
      return;
    }
    
    // Simpan state yang perlu dipertahankan
    sessionStorage.setItem('sidebarState', JSON.stringify({
      activeItem,
      activeSubItem,
      expandedItems,
      expandedSubItems
    }));
    
    // Force full page reload
    window.location.assign(url);
  }, [activeItem, activeSubItem, expandedItems, expandedSubItems]);

  // Sinkronisasi state saat komponen mount
  useEffect(() => {
    const savedState = sessionStorage.getItem('sidebarState');
    if (savedState) {
      const { activeItem, activeSubItem, expandedItems, expandedSubItems } = JSON.parse(savedState);
      setActiveItem(activeItem);
      setActiveSubItem(activeSubItem);
      setExpandedItems(expandedItems);
      setExpandedSubItems(expandedSubItems);
      sessionStorage.removeItem('sidebarState');
    }

    const category = searchParams.get("category");
    const product = searchParams.get("product");

    if (category && getMainProducts().includes(category)) {
      setActiveItem(category);
      setExpandedItems(prev => ({ 
        ...Object.fromEntries(Object.keys(prev).map(key => [key, false])),
        [category]: true 
      }));
      if (onItemChange) onItemChange(category);
    }

    if (product) {
      setActiveSubItem(product);
    }
  }, [searchParams, getMainProducts, onItemChange]);

  const handleMainItemClick = useCallback((item, e) => {
    e.preventDefault();
    const url = getMainProductUrl(item);
    setActiveItem(item);
    setActiveSubItem(null);
    setExpandedItems(prev => ({
      ...Object.fromEntries(Object.keys(prev).map(key => [key, false])),
      [item]: true,
    }));
    navigateTo(url);
  }, [getMainProductUrl, navigateTo]);

  const handleSubItemClick = useCallback((category, subItem, e) => {
    e.preventDefault();
    const url = getSubProductUrl(category, subItem);
    setActiveSubItem(subItem);
    navigateTo(url);
  }, [getSubProductUrl, navigateTo]);

  // Render sub-items
  const renderSubItems = useCallback((items, category, parentName = null) => {
    return items.map((item) => {
      const hasSubItems = item.subItems && item.subItems.length > 0;
      const isExpanded = parentName 
        ? expandedSubItems[category]?.[parentName]?.[item.name] 
        : expandedSubItems[category]?.[item.name];

      return (
        <li key={item.name}>
          {hasSubItems ? (
            <>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  if (parentName) {
                    setExpandedSubItems(prev => ({
                      ...prev,
                      [category]: {
                        ...prev[category],
                        [parentName]: {
                          ...prev[category]?.[parentName],
                          [item.name]: !prev[category]?.[parentName]?.[item.name],
                        },
                      },
                    }));
                  } else {
                    setExpandedSubItems(prev => ({
                      ...prev,
                      [category]: {
                        ...prev[category],
                        [item.name]: !prev[category]?.[item.name],
                      },
                    }));
                  }
                }}
                className={`flex items-center justify-between cursor-pointer ${
                  activeSubItem === item.name ? "text-[#2957A4] font-medium" : "hover:text-[#2957A4]"
                }`}
              >
                <span>{item.name}</span>
                {hasSubItems && <span className="px-2 text-gray-500">{isExpanded ? "−" : "+"}</span>}
              </div>

              {isExpanded && hasSubItems && (
                <ul className="ml-4 mt-1 space-y-2">
                  {renderSubItems(item.subItems, category, item.name)}
                </ul>
              )}
            </>
          ) : (
            <a
              href={item.url}
              onClick={(e) => {
                e.preventDefault();
                setActiveSubItem(item.name);
                navigateTo(item.url);
              }}
              className={`block cursor-pointer ${
                activeSubItem === item.name ? "text-[#2957A4] font-medium" : "hover:text-[#2957A4]"
              }`}
            >
              {item.name}
            </a>
          )}
        </li>
      );
    });
  }, [activeSubItem, expandedSubItems, navigateTo]);

  return (
    <aside className="w-full lg:w-1/6 lg:sticky lg:top-[6.5rem] lg:h-[calc(100vh-6.5rem)] lg:overflow-y-auto pr-5">
      <h1 className="text-lg font-medium mb-4 pb-2">Produk</h1>
      <ul className="space-y-2 text-sm">
        {getMainProducts().map((item) => (
          <li key={item}>
            <div className="flex items-center justify-between">
              <a
                href={getMainProductUrl(item)}
                onClick={(e) => handleMainItemClick(item, e)}
                className={`w-full text-left px-2 cursor-pointer ${
                  activeItem === item 
                    ? "text-[#2957A4] border-l-2 border-[#2957A4] font-semibold" 
                    : "text-gray-700 hover:text-[#3a4557]"
                }`}
              >
                {item}
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setExpandedItems(prev => ({
                    ...prev,
                    [item]: !prev[item],
                  }));
                }}
                className="px-2 text-gray-500 hover:text-gray-700"
              >
                <span style={{ fontSize: "0.6rem" }}>{expandedItems[item] ? "▼" : "▶"}</span>
              </button>
            </div>

            {expandedItems[item] && (
              <ul className="ml-4 mt-2 space-y-3 text-gray-600 text-xs border-l border-gray-300 pl-2 mb-4">
                {renderSubItems(productConfig.subProducts[item], item)}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
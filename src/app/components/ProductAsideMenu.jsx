"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function ProductSidebar({ onItemChange }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Simplify state management
  const [activeStates, setActiveStates] = useState({
    mainItem: "Concrete Roof",
    subItem: null,
    expanded: {
      "Concrete Roof": true,
      "Paving Block": false,
      "Concrete Block": false,
      "Utility": false
    },
    expandedSub: {}
  });

const productConfig = {
  mainProducts: [
    { 
      name: "Concrete Roof", 
      url: "/produk/concrete-roof",
      detailComponent: "detail-cr"
    },
    { 
      name: "Paving Block", 
      url: "/produk/paving-block",
      detailComponent: "detail-pb" 
    },
    { 
      name: "Concrete Block", 
      url: "/produk/concrete-block",
      detailComponent: "detail-cb" 
    },
    { 
      name: "Utility", 
      url: "/produk/utility",
      detailComponent: "detail-ut" 
    },
  ],
  subProducts: {
    "Concrete Roof": [
      { 
        name: "Neo Solar System", 
        url: "/produk/concrete-roof/neo-solar-system",
        detailComponent: "detail-cr"
      },
      {
        name: "Flat Tile",
        url: "#",
        subItems: [
          { 
            name: "Dual Slate", 
            url: "/produk/concrete-roof/flat-tile/dual-slate",
            detailComponent: "detail-cr"
          },
          { 
            name: "Floral", 
            url: "/produk/concrete-roof/flat-tile/floral",
            detailComponent: "detail-cr"
          },
          {
            name: "Victoria Series",
            url: "/produk/concrete-roof/flat-tile/victoria-series",
            detailComponent: "detail-victoria",
            subItems: [
              { 
                name: "Onyx", 
                url: "/produk/concrete-roof/flat-tile/victoria-series/onyx",
                detailComponent: "detail-victoria"
              },
              { 
                name: "Multiline", 
                url: "/produk/concrete-roof/flat-tile/victoria-series/multiline",
                detailComponent: "detail-victoria"
              },
              { 
                name: "Slate", 
                url: "/produk/concrete-roof/flat-tile/victoria-series/slate",
                detailComponent: "detail-victoria"
              },
              { 
                name: "Pine", 
                url: "/produk/concrete-roof/flat-tile/victoria-series/pine",
                detailComponent: "detail-victoria"
              },
              { 
                name: "Classic", 
                url: "/produk/concrete-roof/flat-tile/victoria-series/classic",
                detailComponent: "detail-victoria"
              },
            ],
          },
        ],
      },
      {
        name: "Genteng Gelombang",
        url: "#",
        subItems: [
          { 
            name: "New Royal", 
            url: "/produk/concrete-roof/genteng-gelombang/new-royal",
            detailComponent: "detail-cr"
          },
          { 
            name: "Oriental", 
            url: "/produk/concrete-roof/genteng-gelombang/oriental",
            detailComponent: "detail-cr"
          },
          { 
            name: "Majestic", 
            url: "/produk/concrete-roof/genteng-gelombang/majestic",
            detailComponent: "detail-cr"
          },
        ],
      },
    ],
    "Paving Block": [
      { 
        name: "Square Set", 
        url: "/produk/paving-block/square-set",
        detailComponent: "detail-pb"
      },
      { 
        name: "Classic Set", 
        url: "/produk/paving-block/classic-set",
        detailComponent: "detail-pb"
      },
      { 
        name: "Altstadt", 
        url: "/produk/paving-block/altstadt",
        detailComponent: "detail-pb"
      },
      { 
        name: "Others", 
        url: "/produk/paving-block/others",
        detailComponent: "detail-pb"
      },
      { 
        name: "Guiding Pave", 
        url: "/produk/paving-block/guiding-pave",
        detailComponent: "detail-pb"
      },
      { 
        name: "Grass Block", 
        url: "/produk/paving-block/grass-block",
        detailComponent: "detail-pb"
      },
      { 
        name: "Concrete Tile", 
        url: "/produk/paving-block/concrete-tile",
        detailComponent: "detail-pb2"
      },
      { 
        name: "Guiding Tiles", 
        url: "/produk/paving-block/guiding-tiles",
        detailComponent: "detail-pb"
      },
      { 
        name: "Kanstein Wet Process", 
        url: "/produk/paving-block/kanstein-wet-process",
        detailComponent: "detail-pb3"
      },
      { 
        name: "Kanstein Dry Process", 
        url: "/produk/paving-block/kanstein-dry-process",
        detailComponent: "detail-pb3"
      },
      { 
        name: "Tali Air", 
        url: "/produk/paving-block/tali-air",
        detailComponent: "detail-pb3"
      },
    ],
    "Concrete Block": [
      { 
        name: "Concrete Block", 
        url: "/produk/concrete-block/concrete-block",
        detailComponent: "detail-cb"
      },
      { 
        name: "Ventilation Block", 
        url: "/produk/concrete-block/ventilation-block",
        detailComponent: "detail-cb"
      },
      { 
        name: "Ventilation Block 3D", 
        url: "/produk/concrete-block/ventilation-block-3d",
        detailComponent: "detail-cb"
      },
    ],
    "Utility": [
      { 
        name: "Concrete Pipe", 
        url: "/produk/utility/concrete-pipe",
        detailComponent: "detail-ut1"
      },
      { 
        name: "Ciswell", 
        url: "/produk/utility/ciswell",
        detailComponent: "detail-ut2"
      },
    ],
  },
};

  const getMainProducts = () => productConfig.mainProducts.map((item) => item.name);
  const getMainProductUrl = (name) => productConfig.mainProducts.find((item) => item.name === name)?.url || "#";
  const getSubProducts = (category) => productConfig.subProducts[category]?.map((item) => item.name) || [];
  const getSubProductUrl = (category, name) => {
    const product = productConfig.subProducts[category]?.find((item) => item.name === name);
    return product?.url || "#";
  };
  const getSubItems = (category, subProduct) => {
    const product = productConfig.subProducts[category]?.find((item) => item.name === subProduct);
    return product?.subItems || [];
  };

   const handleMainItemClick = (item, e) => {
    e.preventDefault();
    const mainProduct = productConfig.mainProducts.find(p => p.name === item);
    
    setActiveStates(prev => ({
      ...prev,
      mainItem: item,
      subItem: null,
      expanded: {
        ...Object.fromEntries(productConfig.mainProducts.map(p => [p.name, false])),
        [item]: true
      }
    }));
    
    router.push(mainProduct.url);
  };

  const handleSubItemClick = (item, e) => {
    e.preventDefault();
    
    setActiveStates(prev => ({
      ...prev,
      subItem: item.name
    }));
    
    // Gunakan URL langsung dari config
    router.push(item.url);
  };

  // Render yang disederhanakan
  const renderSubItems = (items) => {
    return items.map(item => (
      <li key={item.name}>
        {item.subItems ? (
          <>
            <button 
              onClick={() => toggleExpand(item)}
              className={`flex justify-between w-full ${activeStates.subItem === item.name ? 'active-class' : ''}`}
            >
              <span>{item.name}</span>
              <span>{isExpanded(item) ? '−' : '+'}</span>
            </button>
            {isExpanded(item) && (
              <ul className="ml-4">
                {renderSubItems(item.subItems)}
              </ul>
            )}
          </>
        ) : (
          <Link
            href={item.url}
            onClick={(e) => handleSubItemClick(item, e)}
            className={`block ${activeStates.subItem === item.name ? 'active-class' : ''}`}
          >
            {item.name}
          </Link>
        )}
      </li>
    ));
  };

  return (
    <aside className="sidebar-styles">
      <h1 className="title-style">Produk</h1>
      <ul className="main-list">
        {productConfig.mainProducts.map(item => (
          <li key={item.name}>
            <div className="flex justify-between">
              <Link
                href={item.url}
                onClick={(e) => handleMainItemClick(item.name, e)}
                className={`link-style ${activeStates.mainItem === item.name ? 'active-main' : ''}`}
              >
                {item.name}
              </Link>
              <button 
                onClick={() => toggleMainExpand(item.name)}
                className="expand-button"
              >
                {activeStates.expanded[item.name] ? '▼' : '▶'}
              </button>
            </div>
            
            {activeStates.expanded[item.name] && (
              <ul className="sub-list">
                {renderSubItems(productConfig.subProducts[item.name] || [])}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
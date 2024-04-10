import React from "react";

export default function CardCategoryComponent(props) {
    const { categorys, onClick } = props;
  return (
    <div className="py-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  grid place-content-center grid-flow-row gap-7">
    {categorys.map((category) => (
        // eslint-disable-next-line react/jsx-key
        <div className=" border border-gradient duration-300 hover:shadow-lg rounded-lg"  onClick={() => onClick(category.id)}>
          <div className="flex text-left p-5 space-x-4 border-b-2 ">
            <div className="shrink-0">
              <img
                src={category.image}
                alt={category.title}
                width="30"
                className="animate-pulse-5s"
              />
            </div>
            <div className="min-w-0">
              <p className="text-base font-medium text-[#292D77] dark:text-[#292D77] line-clamp-1">
                {category.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 h-10 line-clamp-2">
                {category.description}
              </p>
            </div>
          </div>
          <div className="min-w-0 p-5 space-x-4">
            <p className="text-base font-medium text-[#292D77] dark:text-[#292D77] line-clamp-1">
              {category.qty} Books
            </p>
          </div>
         
        </div>
    ))}
  </div>
  );
}
